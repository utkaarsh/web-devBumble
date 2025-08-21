import SignupForm from "./Signup";
import React, { useContext, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { saveToken } from "../auth/authTokenStorage";
import AuthContext from "../auth/context";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const authContext = useContext(AuthContext);

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <Formik
      initialValues={{
        emailId: "",
        password: "",
      }}
      validationSchema={Yup.object({
        emailId: Yup.string()
          .email("Invalid email address")
          .required("Required"),
        password: Yup.string().required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const res = await axios.post(
            `${BASE_URL}/login`,
            {
              emailId: values.emailId,
              password: values.password,
            },
            {
              withCredentials: true,
            }
          );

          console.log("Response ", res);
          // dispatch(addUser(res?.data.data));
          saveToken(res?.data.token);
          authContext.setUser(res?.data.data);
          navigate("/");
        } catch (error) {
          console.error("Error login " + error);
        }
      }}
    >
      <Form className="flex flex-col items-start justify-center space-y-5 border shadow-lg border-base-200 rounded-lg bg-base-200 w-full md:w-8/12 self-center mx-auto my-2 p-2 py-4">
        <div className="flex flex-col items-start space-y-2 p-2 w-11/12 ">
          <label htmlFor="emailId">Email Address</label>
          <Field
            name="emailId"
            type="email"
            className="w-full rounded-lg p-2 border border-base-200 focus:outline-none"
          />
          <ErrorMessage name="emailId" className="text-red-700" />
        </div>
        <div className="flex flex-col items-start space-y-2 p-2 w-11/12 ">
          <label htmlFor="password">Password</label>
          <div className="relative w-full">
            <Field
              name="password"
              type={showPassword ? "text" : "password"}
              className="w-full rounded-lg p-2 border border-base-200 pr-10 focus:outline-none"
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              tabIndex={-1}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <ErrorMessage name="password" className="text-red-700" />
        </div>

        <button
          type="submit"
          className="w-48 p-2 m-2 bg-gray-700  text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg  border border-base-200 self-start  "
        >
          Login
        </button>
      </Form>
    </Formik>
  );
};

export default Login;
