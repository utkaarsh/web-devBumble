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
  const { _id, firstName, lastName, photoUrl, age, about } = user;
  console.log("USER ID ", _id);
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
        <div className="w-full min-h-[25rem] relative">
          <div className="absolute   inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <img
            src={
              photoUrl ||
              "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            }
            alt="Profile Photo"
            className="w-full bg-cover"
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
            <FaBriefcase className="w-4 h-4" /> <p>Software Engineer at Meta</p>
          </div>
        </div>
      </div>

      {/* Second Half Right Side */}

      <div className="w-6/12 relative overflow-y-scroll  p-2 py-4 h-[32rem]">
        <div className="flex flex-col w-full space-y-10 flex-1 pl-3 items-start min-h-[35rem]">
          {/* About  */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-3">
              <span className="text-yellow-500">
                <LuStar className="w-4 h-4  stroke-current" />
              </span>
              <p className="">About</p>
            </div>
            <h1 className="text-start  ">
              {about +
                "Full-stack developer passionate about React and Node.js. Love building scalable web apps and contributing to open source. Coffee enthusiast and weekend hiker! 🚀" +
                "Backend architect who loves solving complex problems with elegant solutions. Microservices enthusiast and DevOps advocate. Guitar player in my free time!"}
            </h1>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-3">
              <span className="text-yellow-500">
                <FaCode className="w-4 h-4  stroke-current" />
              </span>
              <p className="">Tech Stack</p>
            </div>
            <div className="w-9/12 flex flex-wrap">
              <ChipsSelect
                options={[
                  "Java",
                  "Python",
                  "JavaScript",
                  "C++",
                  "SQL",
                  "React",
                  "Node.js",
                ]}
                multiple
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-3">
              <span className="text-yellow-500">
                <FaRegStar className="w-4 h-4" />
              </span>{" "}
              <p>Interest</p>
            </div>
            <div className="w-9/12 flex flex-wrap">
              <ChipsSelect
                options={[
                  "Java",
                  "Python",
                  "JavaScript",
                  "C++",
                  "SQL",
                  "React",
                  "Node.js",
                  "REST API",
                  "System Design",
                  "Next Js",
                ]}
                multiple
              />
            </div>
          </div>
          <div className=" flex justify-around overflow-hidden z-40 w-full bottom-1 border-t border-gray-50 pt-4  space-x-2">
            <button
              onClick={() => handleSendRequest(_id, "interested")}
              className="rounded-md px-2 py-1 text-center bg-[#E94141] text-white"
            >
              Interested
            </button>
            <button
              onClick={() => handleSendRequest(_id, "ignored")}
              className="rounded-md px-2 py-1 text-center bg-[#7c7c7c] text-white"
            >
              Ignore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
