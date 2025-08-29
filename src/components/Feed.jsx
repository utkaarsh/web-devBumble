import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { getFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import {
  FaMinus,
  FaPlus,
  FaRegThumbsDown,
  FaRegThumbsUp,
} from "react-icons/fa";
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
        <div className="flex items-start pt-1 justify-around w-full bg-base-300 bottom-0 absolute h-36">
          <div className="cursor-pointer flex items-center justify-center space-x-4 w-14 rounded-full h-14 border border-black bg-base-100">
            <span className="">
              <FaRegThumbsDown />{" "}
            </span>
          </div>
          <div className="cursor-pointer flex items-center justify-center space-x-4 w-14 rounded-full h-14 border border-black bg-base-100">
            <span className="">
              <FaRegThumbsUp />
            </span>
          </div>
        </div>
      </div>
    )
  );
};

export default Feed;
