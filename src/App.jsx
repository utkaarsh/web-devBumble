import "./App.css";
import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Authentication from "./pages/Authentication";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
const Feed = React.lazy(() => import("./components/Feed"));
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Chat from "./components/Chat";
import SignupMultisteps from "./components/SignupMultiStep";
import { decodeToken, getToken } from "./auth/authTokenStorage";
import AuthContext from "./auth/context";

function App() {
  const [user, setUser] = useState(null);
  const refreshToken = async () => {
    const token = await getToken();
    const validToken = decodeToken(token);
    if (!validToken) {
      console.log("No token found ");
      setUser(null);
      return;
    }

    setUser(validToken?.user);
  };

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route
                path="/"
                element={
                  user ? (
                    <Suspense fallback={<div>Loading UserCard...</div>}>
                      <Feed />
                    </Suspense>
                  ) : (
                    <Authentication />
                  )
                }
              />
              <Route path="/login" element={<Authentication />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/chat/:otherUserId" element={<Chat />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </AuthContext.Provider>
  );
}

export default App;
