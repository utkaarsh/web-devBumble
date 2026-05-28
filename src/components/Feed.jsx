import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { getFeed, removeUserFromFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import { GrDislike, GrLike } from "react-icons/gr";
import { setLocationIfNeeded } from "../utils/geolocation";
let DEFAULT_PAGE = 1;
let DEFAULT_LIMIT = 10;

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const getUserFeed = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(
        BASE_URL + `/user/feed/?page=${DEFAULT_PAGE}&limit=${DEFAULT_LIMIT}`,
        { withCredentials: true }
      );
      dispatch(getFeed(res?.data.data));
    } catch (error) {
      console.error("Error bhai sahab feed me ", error.message);
      
      // Check if the error is due to location not being set
      if (error?.response?.data?.message?.includes("Location not set")) {
        setError("Location required. Please allow location access.");
      } else {
        setError(error?.response?.data?.message || "Failed to load feed");
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleRetryWithLocation = async () => {
    try {
      await setLocationIfNeeded();
      // Retry fetching feed after location is set
      await getUserFeed();
    } catch (err) {
      console.error("Failed to set location:", err);
      setError("Unable to access your location. Please enable location permissions.");
    }
  };
  
  const handleSendRequest = async (id, status) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(id));
      return 1;
    } catch (error) {
      console.error("Send Request Error ", error.message);
    }
    return;
  };

  useEffect(() => {
    getUserFeed();
  }, []);
  
  // Show error state if location is not set
  if (error) {
    return (
      <div className="flex justify-center items-center mt-48">
        <div className="text-center">
          <h1 className="font-bold text-xl uppercase mb-4">{error}</h1>
          <button
            onClick={handleRetryWithLocation}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Setting location..." : "Enable Location & Retry"}
          </button>
        </div>
      </div>
    );
  }
  
  if (feed?.length < 1)
    return (
      <div className="flex justify-center items-center mt-48">
        <h1 className="font-bold text-xl uppercase">No new users found</h1>
      </div>
    );

  return (
    feed && (
      <div className="flex overflow-y-auto flex-col justify-between  items-center relative h-full px-2">
        <div className=" w-full flex justify-center  relative">
          <UserCard user={feed[0]} />
        </div>
        <div className="flex items-center  justify-around  bg-base-300  w-4/12 h-16  bottom-0 absolute  rounded-lg">
          <div
            className="tooltip tooltip-top flex items-center justify-center space-x-4 w-6/12   "
            data-tip="Nope"
          >
            <span
              onClick={() => handleSendRequest(feed[0]?._id, "interested")}
              className="bg-base-100 cursor-pointer shadow-lg transition duration-200 hover:scale-110 hover:border-2 hover:border-red-700 hover:text-red-700 p-3 rounded-full "
            >
              <GrDislike className="h-4 w-4" />{" "}
            </span>
          </div>
          <div
            className="  p-2  flex items-center justify-center space-x-4 w-6/12   tooltip tooltip-top"
            data-tip="Yep"
          >
            <span
              onClick={() => handleSendRequest(feed[0]?._id, "ignored")}
              className=" bg-base-100 cursor-pointer shadow-lg transition duration-200 hover:scale-110 hover:border-2 hover:border-green-500 hover:text-green-500 p-3  rounded-full"
            >
              <GrLike className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    )
  );
};

export default Feed;
