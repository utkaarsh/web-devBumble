import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const fetchUSer = async () => {
    try {
      if (user?.length > 0) {
        return;
      }
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
      console.log("this condition");

      navigate("/");
    } catch (error) {
      if (error.status === 401) {
        return navigate("/login");
      }
      console.error("Error on Homepage: ", error);
    }
  };

  useEffect(() => {
    fetchUSer();
  }, []);

  return (
    <div className="flex-1 absolute top-0 left-0 w-full">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
