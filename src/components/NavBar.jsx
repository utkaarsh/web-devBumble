import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL, main_logo } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import { deleteToken } from "../auth/authTokenStorage";
import AuthContext from "../auth/context";

const NavBar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogOut = async () => {
    setDropdownOpen(false);
    try {
      const res = await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );

      if (res.data) {
        dispatch(removeUser());
        deleteToken();
        authContext.setUser(null);
      }
    } catch (error) {
      console.error("Logout error ", error.message);
    }
  };

  const handleRouting = (route) => {
    setDropdownOpen(false);
    navigate(`/${route}`);
  };

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar flex w-full items-center justify-between bg-base-300 top-0 px-3 font-geist">
      {/* Right side profile + dropdown */}
      <div
        className={`flex-none cursor-pointer relative ${!user && "hidden"}`}
        ref={dropdownRef}
      >
        <div className="chat-image avatar">
          <div
            className="w-10 rounded-full border shadow-md"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img
              alt="Tailwind CSS chat bubble component"
              src={
                user?.photoUrl ||
                "https://plus.unsplash.com/premium_photo-1754728140366-a4a8c8cfb266?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            />
          </div>
        </div>

        {dropdownOpen && (
          <div className="absolute left-0 top-12 w-48 bg-base-300  shadow-lg rounded-lg py-2 z-50">
            <button
              onClick={() => handleRouting("profile")}
              className="block w-full text-left px-4 py-2 hover:bg-base-100"
            >
              Profile
            </button>
            <button
              onClick={() => handleRouting("connections")}
              className="block w-full text-left px-4 py-2 hover:bg-base-100"
            >
              Connections
            </button>
            <button
              onClick={() => handleRouting("requests")}
              className="block w-full text-left px-4 py-2 hover:bg-base-100"
            >
              Requests
            </button>
            <button
              onClick={handleLogOut}
              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-base-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      <div className="self-end right-0">
        <Link to="/" className=" text-4xl font-bold uppercase">
          <div className="flex items-center space-x-4">
            <p>Dev's Bumble</p>

            <img
              src={main_logo}
              alt="devBumble-logo"
              className="h-8 w-9 shadow-lg"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
