import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { motion, AnimatePresence } from "framer-motion";
import Progressbar from "./Progressbar";
import { FiUsers } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { IoCodeSlashSharp } from "react-icons/io5";
import { HiOutlineSparkles } from "react-icons/hi";
import { div } from "motion/react-client";
import ChipsSelect from "./ChipsSelect";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const totalSteps = 4;
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const progress = (currentStep / totalSteps) * 100;
  const stepIcons = [
    { icon: FiUsers, color: "text-blue-500" },
    { icon: FaRegHeart, color: "text-rose-500" },
    { icon: IoCodeSlashSharp, color: "text-purple-500" },
    { icon: HiOutlineSparkles, color: "text-green-500" },
  ];

  const programmingLanguages = [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C++",
    "C#",
    "Go",
    "Rust",
    "Swift",
    "Kotlin",
    "PHP",
    "Ruby",
    "Scala",
    "R",
    "MATLAB",
  ];

  const interests = [
    "Web Development",
    "Mobile Development",
    "AI/ML",
    "Data Science",
    "DevOps",
    "Cybersecurity",
    "Game Development",
    "Blockchain",
    "Open Source",
    "Startups",
  ];

  const togglePassword = () => setShowPassword((prev) => !prev);

  //Inline component
  const ChipsInput = ({ field, form, ...props }) => {
    return (
      <ChipsSelect
        options={props.options}
        multiple
        value={field.value || []} // controlled
        onChange={(v) => form.setFieldValue(field.name, v)}
      />
    );
  };

  const stepsContent = [
    <div key="1">
      <div className="flex flex-col items-center justify-center space-y-2 border border-base-300 rounded-lg  my-2 p-2 ">
        <div className="flex space-x-2 w-full">
          <div className="flex flex-col items-start space-y-2 p-2 w-6/12 ">
            <label htmlFor="firstName">First Name</label>
            <Field
              name="firstName"
              type="text"
              className="w-full rounded-lg p-2 border border-base-200 focus:outline-none"
              placeholder="John "
            />
            <ErrorMessage name="firstName" />
          </div>

          <div className="flex flex-col items-start space-y-2 p-2 w-6/12 ">
            <label htmlFor="lastName">Last Name</label>
            <Field
              name="lastName"
              type="text"
              placeholder="Doe"
              className="w-full rounded-lg p-2 border border-base-200 focus:outline-none"
            />
            <ErrorMessage name="lastName" />
          </div>
        </div>
        <div className="flex flex-col items-start space-y-2 w-full p-2 ">
          <label htmlFor="emailId">Email Address</label>
          <Field
            name="emailId"
            type="email"
            placeholder="johndoe@gmail.com"
            className="w-full rounded-lg p-2 border border-base-200 focus:outline-none"
          />
          <ErrorMessage name="emailId" />
        </div>
        <div className="flex flex-col items-start space-y-2 w-full p-2 ">
          <label htmlFor="password">Set Password</label>
          <div className="relative w-full">
            <Field
              name="password"
              placeholder="Password"
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
          <ErrorMessage name="password" />
        </div>
      </div>
    </div>,
    <div key="2">
      {" "}
      <div className="flex flex-col items-center justify-center space-y-2 border border-base-300 rounded-lg  w-full my-2 p-2 ">
        <div className="flex space-x-2 w-full items-center">
          <div className="flex flex-col items-start space-y-2 p-2 w-6/12 ">
            <label htmlFor="firstName">Age</label>
            <Field
              name="age"
              type="number"
              className="w-11/12 rounded-lg p-2 border border-base-200 focus:outline-none"
              placeholder="32 "
            />
            <ErrorMessage name="age" />
          </div>
          <div className="flex flex-col items-start space-y-2 p-2 w-6/12 ">
            <label htmlFor="gender">Gender</label>
            <Field
              as="select"
              name="gender"
              className="w-11/12 rounded-lg p-2 border border-base-200"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Field>
            <ErrorMessage
              name="gender"
              component="div"
              style={{ color: "red" }}
            />
          </div>
        </div>
        <div className="flex flex-col items-start space-y-2 p-2 self-start w-full ">
          <label htmlFor="about">Bio</label>
          <Field
            as="textarea"
            name="about"
            type="number"
            className="w-full rounded-lg p-2 border border-base-200 min-h-32 focus:outline-none"
            placeholder="Write in a small brief about yourself!!"
          />
          <ErrorMessage name="about" />
        </div>
      </div>
    </div>,
    <div key="3">
      <div className="flex flex-col items-center justify-center space-y-2 border border-base-300 rounded-lg  w-full my-2 p-2 ">
        <div className="flex flex-col items-start space-y-2 p-2 w-11/12 ">
          <label htmlFor="about" className="font-geist font-normal">
            Programming languages
          </label>
          <p className="font-geist italic font-light text-gray-400">
            Select your favourite programming languages
          </p>
          <Field
            name="languages"
            component={ChipsInput}
            options={programmingLanguages}
          />

          <ErrorMessage name="languages" />
        </div>
        <div className="flex flex-col items-start space-y-2 p-2 w-11/12 ">
          <label htmlFor="about">Experience</label>
          <Field
            as="select"
            name="experience"
            className="w-11/12 rounded-lg p-2 border border-base-200 focus:outline-none"
          >
            <option value="">Select your experience level</option>
            <option value="junior">Junior (0-2)</option>
            <option value="mid-level">Mid-Level (2-5)</option>
            <option value="senior">Senior (5-10)</option>
            <option value="lead">Lead/Principal (10+)</option>
            <option value="beginner">Student/Learning</option>
          </Field>
          <ErrorMessage name="experience" />
        </div>
        <div className="flex flex-col items-start space-y-2 p-2 w-11/12 ">
          <label htmlFor="about" className="font-geist font-normal">
            Interests
          </label>
          <p className="font-geist italic font-light text-gray-400">
            What areas of tech excite you?
          </p>
          <Field name="interests" component={ChipsInput} options={interests} />

          <ErrorMessage name="interests" />
        </div>
      </div>
    </div>,
    <div key="4">
      <div className="space-y-6 border border-base-300 rounded-lg p-3">
        <div className="text-center mb-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg border border-green-200 dark:border-green-800">
          <HiOutlineSparkles className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <h3 className="text-green-600 dark:text-green-400">
            Almost done! ✨
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            You're just one step away from joining the hive
          </p>
        </div>

        <div className="space-y-4">
          {/* Checkbox for Terms */}
          <div className="flex items-center space-x-2">
            <Field
              type="checkbox"
              name="termsAccepted"
              id="terms"
              className="w-4 h-4 border rounded"
            />
            <label htmlFor="terms" className="text-sm">
              I agree to the Terms of Service and Privacy Policy
            </label>
          </div>
          <ErrorMessage
            name="termsAccepted"
            component="div"
            className="text-red-500 text-sm"
          />

          {/* Info Box */}
          <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 dark:from-amber-950/20 dark:via-yellow-950/20 dark:to-orange-950/20 p-6 rounded-lg border border-amber-200 dark:border-amber-800">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">🐝</div>
              <div>
                <h4 className="text-amber-800 dark:text-amber-200 mb-2">
                  Welcome to the BeeMatch Community!
                </h4>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  By creating an account, you'll be able to connect with
                  developers who share your interests, participate in coding
                  challenges together, and maybe find your perfect coding
                  partner! Let's build something amazing together. 🍯
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
  ];

  return (
    <div className=" h-5/6  w-full md:w-10/12 self-center p-3 rounded-lg shadow-lg overflow-y-scroll no-scrollbar">
      <div className="flex items-center justify-center mx-auto">
        {stepIcons?.map((step, index) => {
          const StepIcon = step.icon;
          const isActive = index + 1 === currentStep;
          const isCompleted = index + 1 < currentStep;

          return (
            <div key={index} className="flex items-center ">
              <div
                className={`
                    w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                    ${
                      isActive
                        ? "bg-gradient-to-r from-amber-400 to-orange-400 text-white scale-110 shadow-lg"
                        : isCompleted
                        ? "bg-gradient-to-r from-green-400 to-emerald-400 text-white"
                        : "bg-muted text-muted-foreground"
                    }
                  `}
              >
                <StepIcon className="w-5 h-5" />
              </div>

              {index < stepIcons.length - 1 && (
                <div
                  className={`
                      w-8 h-1 mx-2 rounded-full transition-colors duration-300
                      ${
                        index + 1 < currentStep
                          ? "bg-gradient-to-r from-green-400 to-emerald-400"
                          : "bg-gray-100"
                      }
                    `}
                />
              )}
            </div>
          );
        })}
      </div>
      {/* Progress Bar */}
      <Progressbar progress={progress} />

      {/* Step Content with Slide Animation */}

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          emailId: "",
          password: "",
          age: "",
          gender: "",
          about: "",
          languages: [],
          experience: "",
          interests: [],
          termsAccepted: false,
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().max(15).required(),
          lastName: Yup.string().max(20).required(),
          emailId: Yup.string().email().required(),
          password: Yup.string().min(6, "Password too weak").required(),
          termsAccepted: Yup.boolean().oneOf(
            [true],
            "You must accept the terms and privacy policy"
          ),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          console.log("Hell yeah", values);
          try {
            const res = await axios.post(`${BASE_URL}/signup`, {
              firstName: values.firstName,
              lastName: values.lastName,
              emailId: values.emailId,
              password: values.password,
              age: values.age,
              gender: values.gender,
              skills: values.languages,
              interests: values.interests,
              about: values.about,
              experience: values.experience,
            });
            navigate("/profile");
            dispatch(addUser(res?.data.data));
          } catch (error) {
            console.error("Error login " + error);
          }
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div key={currentStep}>
                {stepsContent[currentStep - 1]}
              </motion.div>
            </AnimatePresence>
            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
              >
                Back
              </button>
              {currentStep === 4 ? (
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 text-white rounded-lg"
                >
                  Sign Up
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  disabled={currentStep === totalSteps}
                  className="px-4 py-2 bg-amber-500 text-white rounded disabled:opacity-50"
                >
                  Next
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default SignupForm;
