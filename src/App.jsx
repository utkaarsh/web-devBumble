import "./App.css";

import React, { Suspense, useEffect, useState } from "react";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Provider } from "react-redux";

import axios from "axios";

import Body from "./components/Body";
import Authentication from "./pages/Authentication";
import JobList from "./components/jobs/JobList";

import appStore from "./utils/appStore";

import { decodeToken, getToken } from "./auth/authTokenStorage";

import AuthContext from "./auth/context";

import { BASE_URL } from "./utils/constants";

import { setLocationIfNeeded } from "./utils/geolocation";

// Lazy routes

const Feed = React.lazy(() => import("./components/Feed"));

const Profile = React.lazy(() => import("./components/Profile"));

const Connections = React.lazy(() => import("./components/Connections"));

const Requests = React.lazy(() => import("./components/Requests"));

const Chat = React.lazy(() => import("./components/Chat"));

// ============================================================
// PRIVATE ROUTE
// ============================================================

function PrivateRoute({ children, user, authLoading }) {
  if (authLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

// ============================================================
// APP
// ============================================================

function App() {
  const [user, setUser] = useState(null);

  const [authLoading, setAuthLoading] = useState(true);

  // ==========================================================
  // CHECK AUTH
  // ==========================================================

  const refreshToken = async () => {
    try {
      const token = getToken();

      if (!token) {
        setUser(null);
        return;
      }

      const validToken = decodeToken(token);

      if (!validToken) {
        setUser(null);
        return;
      }

      const now = Math.floor(Date.now() / 1000);

      if (validToken.exp > now) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setUser(validToken.user);
      } else {
        setUser(null);

        delete axios.defaults.headers.common.Authorization;
      }
    } catch (error) {
      console.error("Authentication error:", error);

      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  // ==========================================================
  // SERVER CHECK
  // ==========================================================

  const revokeServer = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/hello`, {
        withCredentials: true,
      });

      console.log("Hello world:", response.data);
    } catch (error) {
      console.log("Hello world error");
    }
  };

  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {
    refreshToken();

    setLocationIfNeeded();
  }, []);

  useEffect(() => {
    revokeServer();
  }, []);

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Suspense fallback={<div className="p-4">Loading...</div>}>
            <Routes>
              {/* =================================================
                  BODY / MAIN LAYOUT
              ================================================= */}

              <Route path="/" element={<Body />}>
                {/* HOME */}
                <Route index element={user ? <Feed /> : <Authentication />} />

                {/* PROFILE */}
                <Route
                  path="profile"
                  element={
                    <PrivateRoute user={user} authLoading={authLoading}>
                      <Profile />
                    </PrivateRoute>
                  }
                />

                {/* JOB LIST */}
                <Route
                  path="joblists"
                  element={
                    <PrivateRoute user={user} authLoading={authLoading}>
                      <JobList />
                    </PrivateRoute>
                  }
                />

                {/* CONNECTIONS */}
                <Route
                  path="connections"
                  element={
                    <PrivateRoute user={user} authLoading={authLoading}>
                      <Connections />
                    </PrivateRoute>
                  }
                />

                {/* REQUESTS */}
                <Route
                  path="requests"
                  element={
                    <PrivateRoute user={user} authLoading={authLoading}>
                      <Requests />
                    </PrivateRoute>
                  }
                />

                {/* CHAT */}
                <Route
                  path="chat/:otherUserId"
                  element={
                    <PrivateRoute user={user} authLoading={authLoading}>
                      <Chat />
                    </PrivateRoute>
                  }
                />
              </Route>

              {/* LOGIN */}
              <Route path="/login" element={<Authentication />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </Provider>
    </AuthContext.Provider>
  );
}

export default App;
