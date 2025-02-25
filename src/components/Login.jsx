import SignupForm from "./Signup";
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        emailId: "utkarsh@gmail.com",
        password: "Passw0rd@123",
      }}
      validationSchema={Yup.object({
        emailId: Yup.string()
          .email("Invalid email address")
          .required("Required"),
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

          navigate("/");
          console.log("Response ", res);
          dispatch(addUser(res?.data.data));
        } catch (error) {
          console.error("Error login " + error);
        }
      }}
    >
      <Form className="flex flex-col items-center justify-center space-y-2 border-1  border-black rounded-lg bg-base-200 w-full md:w-6/12 self-center mx-auto my-2 p-2">
        <div className="flex flex-col items-start space-y-2 p-2 w-8/12 ">
          <label htmlFor="emailId">Email Address</label>
          <Field
            name="emailId"
            type="email"
            className="w-full rounded-lg p-2 border"
          />
          <ErrorMessage name="emailId" className="text-red-700" />
        </div>
        <div className="flex flex-col items-start space-y-2 p-2 w-8/12 ">
          <label htmlFor="password">Password</label>
          <Field
            name="password"
            type="password"
            className="w-full rounded-lg p-2 border"
          />
          <ErrorMessage name="password" className="text-red-700" />
        </div>

        <button
          type="submit"
          className="w-48 p-2 m-2 bg-gray-700 text-white text-lg rounded-lg  "
        >
          Login
        </button>
      </Form>
    </Formik>
  );
};

export default Login;
