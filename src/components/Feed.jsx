import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { getFeed, removeUserFromFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import { GrDislike, GrLike } from "react-icons/gr";
let DEFAULT_PAGE = 1;
let DEFAULT_LIMIT = 10;

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);
  const getUserFeed = async () => {
    try {
      const res = await axios.get(
        BASE_URL + `/user/feed/?page=${DEFAULT_PAGE}&limit=${DEFAULT_LIMIT}`,
        { withCredentials: true }
      );
      dispatch(getFeed(res?.data.data));
    } catch (error) {
      console.error("Error bhai sahab feed me ", error.message);
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
      console.log("response = ", res.data.data);
      return 1;
    } catch (error) {
      console.error("Send Request Error ", error.message);
    }
    return;
  };

  useEffect(() => {
    getUserFeed();
    console.log("Feed data : ", feed);
  }, []);
  if (feed?.length < 1)
    return (
      <div className="flex justify-center items-center mt-48">
        <h1 className="font-bold text-xl uppercase">No new users found</h1>
      </div>
    );

  return (
    feed && (
      <div className="flex flex-col justify-between items-center relative min-h-screen">
        <UserCard user={feed[0]} />
        <div className="flex items-center pt-1 justify-around w-full bg-base-300 bottom-0 pb-16 absolute h-36">
          <div
            onClick={() => handleSendRequest(feed[0]?._id, "interested")}
            className="cursor-pointer shadow-lg transition duration-200 hover:scale-110 hover:border-2 hover:border-red-700 hover:text-red-700 flex items-center justify-center space-x-4 w-14 rounded-full h-14 bg-base-100"
          >
            <span className="">
              <GrDislike className="h-6 w-6" />{" "}
            </span>
          </div>
          <div
            onClick={() => handleSendRequest(feed[0]?._id, "ignored")}
            className="cursor-pointer shadow-lg transition duration-200 hover:scale-110 hover:border-2 hover:border-green-500 hover:text-green-500 flex items-center justify-center space-x-4 w-14 rounded-full h-14 bg-base-100"
          >
            <span className="">
              <GrLike className="h-6 w-6" />
            </span>
          </div>
        </div>
      </div>
    )
  );
};

export default Feed;
