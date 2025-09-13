import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";
import { BiMapPin } from "react-icons/bi";
import { PiMapPinLineBold } from "react-icons/pi";
import { FaBriefcase, FaCode, FaRegStar } from "react-icons/fa";
import { LuStar } from "react-icons/lu";
import ChipsSelect from "./ChipsSelect";

const UserCard = ({ user }) => {
  const {
    _id,
    firstName,
    lastName,
    photoUrl,
    age,
    about,
    experience,
    interests,
    skills,
  } = user;
  console.log("USER ", user);
  const dispatch = useDispatch();

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

  return (
    <div className=" bg-base-200 w-8/12  rounded-lg overflow-hidden  shadow-xl my-10 flex items-start">
      <div className="w-6/12 bg-gray-500">
        <div className="w-full h-[29rem] relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <img
            src={
              photoUrl ||
              "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            }
            alt="Profile Photo"
            className="w-full  bg-cover"
          />
        </div>

        {/* Name Card (Basic Info)  */}

        <div className=" -mt-36 ml-6 p-2 absolute  text-white flex flex-col items-start space-y-2">
          <h2 className="card-title font-semibold text-2xl ">
            {firstName + " " + lastName}, {age}
          </h2>
          <div className="flex space-x-3 items-center">
            <PiMapPinLineBold className="w-4 h-4" />

            <p>Pune, Maharashtra</p>
          </div>

          <div className="flex items-center space-x-3">
            <FaBriefcase className="w-4 h-4" /> <p>{experience}</p>
          </div>
        </div>
      </div>

      {/* Second Half Right Side */}

      <div className="w-6/12  overflow-y-scroll no-scrollbar  p-2 py-4 h-[29rem]">
        <div className="flex relative flex-col w-full space-y-10 flex-1 pl-3 items-start min-h-[35rem]">
          {/* About  */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-3">
              <span className="text-yellow-500">
                <LuStar className="w-4 h-4  stroke-current" />
              </span>
              <p className="font-medium">About</p>
            </div>
            <h1 className="text-start  ">{about}</h1>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-3">
              <span className="text-yellow-500">
                <FaCode className="w-4 h-4  stroke-current" />
              </span>
              <p className="font-medium">Tech Stack</p>
            </div>
            <div className="w-11/12 flex flex-wrap">
              <ChipsSelect options={skills} multiple />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-3">
              <span className="text-yellow-500">
                <FaRegStar className="w-4 h-4" />
              </span>{" "}
              <p className="font-medium">Interest</p>
            </div>
            <div className="w-11/12 flex flex-wrap">
              <ChipsSelect options={interests} multiple />
            </div>
          </div>
          <div className=" flex justify-between overflow-hidden w-11/12 absolute z-40 bottom-1 border-t border-gray-50 pt-4  space-x-2">
            <button
              onClick={() => handleSendRequest(_id, "interested")}
              className="rounded-md px-2 py-1 text-center bg-[#E94141] text-white"
            >
              Hold on
            </button>
            <button
              onClick={() => handleSendRequest(_id, "ignored")}
              className="rounded-md px-2 py-1 text-center bg-[#7c7c7c] text-white"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
