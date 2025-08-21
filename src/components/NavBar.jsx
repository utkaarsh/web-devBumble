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
        // navigate("/login");
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
    <div className="navbar bg-base-300 top-0 px-3 font-geist">
      <div className="flex-1">
        <Link to="/" className=" text-xl font-bold uppercase">
          <div className="flex items-center space-x-2">
            <img src={main_logo} alt="devBumble-logo" className="h-10 w-10" />
            <p>Dev Bumble</p>
          </div>
        </Link>
      </div>

      {/* Right side profile + dropdown */}
      <div
        className={`flex-none cursor-pointer relative ${!user && "hidden"}`}
        ref={dropdownRef}
      >
        <div className="chat-image avatar">
          <div
            className="w-10 rounded-full"
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
          <div className="absolute right-0 top-12 w-48 bg-base-300  shadow-lg rounded-lg py-2 z-50">
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
    </div>
  );
};

export default NavBar;
