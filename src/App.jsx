import "./App.css";
import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import Body from "./components/Body";
import Authentication from "./pages/Authentication";
import appStore from "./utils/appStore";

import { decodeToken, getToken } from "./auth/authTokenStorage";
import AuthContext from "./auth/context";
import ProtectedRoute from "./custom/ProtectedRoutes";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children, user }) {
  return user ? children : <Navigate to="/" replace />;
}

// Lazy imports for all heavy routes
const Feed = React.lazy(() => import("./components/Feed"));
const Profile = React.lazy(() => import("./components/Profile"));
const Connections = React.lazy(() => import("./components/Connections"));
const Requests = React.lazy(() => import("./components/Requests"));
const Chat = React.lazy(() => import("./components/Chat"));

function App() {
  const [user, setUser] = useState(null);

  const refreshToken = async () => {
    const token = await getToken();
    const validToken = decodeToken(token);
    // current timestamp in seconds
    const now = Math.floor(Date.now() / 1000);
    if (validToken.exp > now) {
      setUser(validToken?.user);
    } else {
      console.log("Session expired");
      setUser(null);
    }
  };

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Suspense fallback={<div className="p-4">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Body />}>
                <Route
                  path="/"
                  element={user ? <Feed /> : <Authentication />}
                />
                <Route element={<ProtectedRoute />}>
                  <Route path="/login" element={<Authentication />} />
                  <Route
                    path="/profile"
                    element={
                      <PrivateRoute user={user}>
                        <Profile />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/connections"
                    element={
                      <PrivateRoute user={user}>
                        <Connections />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/requests"
                    element={
                      <PrivateRoute user={user}>
                        <Requests />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/chat/:otherUserId"
                    element={
                      <PrivateRoute user={user}>
                        <Chat />
                      </PrivateRoute>
                    }
                  />
                </Route>
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </Provider>
    </AuthContext.Provider>
  );
}

export default App;
