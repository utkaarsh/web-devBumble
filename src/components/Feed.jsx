import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { getFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
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
      console.error("Error bhai sahab feed me ", error);
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
      <div className="flex justify-center items-center">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
