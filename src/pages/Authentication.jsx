import React, { useState } from "react";
import SignupForm from "../components/Signup";
import Login from "../components/Login";

const Authentication = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);

  const handleLoginPage = () => {
    setIsLoginPage(!isLoginPage);
  };

  return (
    <div className="justify-center items-center p-2 mt-24 ">
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

      {/* <div className="card bg-base-200 self-center w-96 shadow-xl">
    <div className="card-body flex-1">
    
    </div>
  </div> */}
    </div>
  );
};

export default Authentication;
