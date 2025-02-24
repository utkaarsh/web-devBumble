import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        }
      );
      console.log("Response logout", res);

      if (res.data) {
        dispatch(removeUser());
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout error ", error.messagae);
    }
  };

  return (
    <div className="navbar bg-base-300 top-0  px-3">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl font-bold uppercase">
          Dev Bumble
        </Link>
      </div>
      <div className="flex-none gap-2">
        {user && (
          <h1 className="font-bold text-lg">Welcome {user.firstName}</h1>
        )}

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            {user && (
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user?.photoUrl} />
              </div>
            )}
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/connections" className="justify-between">
                My connections
              </Link>
            </li>
            <li>
              <Link to="/requests" className="justify-between">
                Requests
              </Link>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li onClick={handleLogOut}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
