import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";

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
    <div className=" bg-base-300 w-96 rounded-lg overflow-hidden  shadow-xl my-10">
      <figure className="">
        <img
          src={
            photoUrl ||
            "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          }
          alt="Shoes"
        />
      </figure>
      <div className="card-body items-start">
        <h2 className="card-title">
          {firstName + " " + lastName}, {age}
        </h2>
        <h1 className="text-start  w-full">{about}</h1>
        <div className="card-actions flex justify-center space-x-2">
          <button
            onClick={() => handleSendRequest(_id, "interested")}
            className="btn btn-secondary"
          >
            Interested
          </button>
          <button
            onClick={() => handleSendRequest(_id, "ignored")}
            className="btn btn-primary"
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
