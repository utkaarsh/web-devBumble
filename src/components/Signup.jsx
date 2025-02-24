import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        emailId: "",
        password: "",
      }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        lastName: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
        emailId: Yup.string()
          .email("Invalid email address")
          .required("Required"),
        password: Yup.string().email("Password too weak").required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        console.log("Data being sent ", {
          firstName: values.firstName,
          lastName: values.lastName,
          emailId: values.emailId,
          password: values.password,
        });

        try {
          const res = await axios.post(`${BASE_URL}/signup`, {
            firstName: values.firstName,
            lastName: values.lastName,
            emailId: values.emailId,
            password: values.password,
          });
          navigate("/profile");
          dispatch(addUser(res?.data.data));
        } catch (error) {
          console.error("Error login " + error);
        }
      }}
    >
      <Form className="flex flex-col items-center justify-center space-y-2 border rounded-lg bg-base-200 w-full md:w-6/12 self-center mx-auto my-2 p-2 ">
        <div className="flex flex-col items-start space-y-2 p-2 w-8/12 ">
          <label htmlFor="firstName">First Name</label>
          <Field name="firstName" type="text" className="w-full px-3" />
          <ErrorMessage name="firstName" />
        </div>

        <div className="flex flex-col items-start space-y-2 p-2 w-8/12 ">
          <label htmlFor="lastName">Last Name</label>
          <Field name="lastName" type="text" className="w-full px-3" />
          <ErrorMessage name="lastName" />
        </div>

        <div className="flex flex-col items-start space-y-2 p-2 w-8/12 ">
          <label htmlFor="emailId">Email Address</label>
          <Field name="emailId" type="email" className="w-full px-3 " />
          <ErrorMessage name="emailId" />
        </div>
        <div className="flex flex-col items-start space-y-2 p-2 w-8/12 ">
          <label htmlFor="password">Set Password</label>
          <Field name="password" type="password" className="w-full px-3" />
          <ErrorMessage name="password" />
        </div>

        <button
          type="submit"
          className="w-64 p-2 m-2 bg-gray-700 text-white text-lg rounded-lg  "
        >
          Signup
        </button>
      </Form>
    </Formik>
  );
};
export default SignupForm;
