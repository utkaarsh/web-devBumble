import React, { useEffect, useState } from "react";
import SignupForm from "../components/Signup";
import Login from "../components/Login";
import { ImageCarousel } from "../components/ImageCarousel";

const Authentication = () => {
  const [isLoginPage, setIsLoginPage] = useState(false);

  const handleLoginPage = () => {
    setIsLoginPage(!isLoginPage);
  };

  const [count, setCount] = useState(5);
  useEffect(() => {
    setTimeout(() => {
      setCount(65);
    }, 200);
  }, []);

  return (
    <div className="flex bg-base-100 w-full  h-screen items-center">
      <div className="w-6/12 h-full ">
        <ImageCarousel />
      </div>
      <div className="w-6/12 h-full  flex flex-col space-y-5 justify-center">
        <div className="flex justify-center space-x-2 px-1">
          <p>
            {isLoginPage ? "Don't have a account?" : "Already have a account?"}
          </p>
          <p
            className="underline text-blue-800 cursor-pointer"
            onClick={handleLoginPage}
          >
            Click here to {isLoginPage ? "Signup" : "Login"}
          </p>
        </div>

        {isLoginPage ? <Login /> : <SignupForm />}
      </div>

      {/* <div className="card bg-base-200 self-center w-96 shadow-xl">
    <div className="card-body flex-1">
    
    </div>
  </div> */}
    </div>
  );
};

export default Authentication;
