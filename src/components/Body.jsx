import React, { useContext, useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import AuthContext from "../auth/context";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userContext = useContext(AuthContext);
  const user = userContext?.user;

  const fetchUSer = async () => {
    try {
      if (!user) return;
      dispatch(addUser(user));
      navigate("/");
    } catch (error) {
      if (error.status === 401) {
        return navigate("/");
      }
      console.error("Error on Homepage: ", error);
    }
  };

  useEffect(() => {
    fetchUSer();
  }, [user]);

  return (
    <div className="flex-1 absolute top-0 left-0 w-full h-screen overflow-y-auto no-scrollbar">
      <NavBar />
      <div className="min-h-screen overflow-hidden">
        <Outlet />
      </div>
      {!user && (
        <div className=" sticky ">
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Body;
