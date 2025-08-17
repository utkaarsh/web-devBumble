import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Progressbar from "./Progressbar";
import { FiUsers } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { IoCodeSlashSharp } from "react-icons/io5";
import { HiOutlineSparkles } from "react-icons/hi";

export default function SignupMultisteps() {
  const totalSteps = 4;
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const progress = (currentStep / totalSteps) * 100;

  const stepsContent = [
    <div key="1">Step 1: Personal Info</div>,
    <div key="2">Step 2: Contact Info</div>,
    <div key="3">Step 3: Password Setup</div>,
    <div key="4">Step 4: Confirmation</div>,
  ];

  const stepIcons = [
    { icon: FiUsers, color: "text-blue-500" },
    { icon: FaRegHeart, color: "text-rose-500" },
    { icon: IoCodeSlashSharp, color: "text-purple-500" },
    { icon: HiOutlineSparkles, color: "text-green-500" },
  ];

  return (
    <div className="bg-base-200 w-full md:w-8/12 self-center p-3 rounded-lg shadow-lg">
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
                          : "bg-muted"
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

      <div className="relative border border-red-500 h-72 overflow-hidden mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute w-full"
          >
            {stepsContent[currentStep - 1]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          disabled={currentStep === totalSteps}
          className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
