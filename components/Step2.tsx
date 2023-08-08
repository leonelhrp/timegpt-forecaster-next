import React from "react";
import { motion } from "framer-motion";

function Step2({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}): React.JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      key="step-2"
      transition={{
        duration: 0.95,
        ease: [0.165, 0.84, 0.44, 1],
      }}
      className="max-w-lg mx-auto px-4 lg:px-0"
    >
      <h2 className="text-4xl font-bold text-[#1E2B3A]">
        Upload Data
      </h2>
      <p className="text-[14px] leading-[20px] text-[#1a2b3b] font-normal my-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt voluptatibus nobis incidunt! Iure fugiat libero maiores commodi adipisci placeat omnis ab quisquam quasi architecto officia, quibusdam, totam beatae expedita. Obcaecati.
      </p>
      <div className="flex gap-[15px] justify-end mt-8">
        <div>
          <button
            onClick={() => setStep(1)}
            className="group rounded-full px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#f5f7f9] text-[#1E2B3A] no-underline active:scale-95 scale-100 duration-75"
            style={{
              boxShadow: "0 1px 1px #0c192714, 0 1px 3px #0c192724",
            }}
          >
            Previous step
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              setStep(3);
            }}
            className="group rounded-full px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#1E2B3A] text-white hover:[linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #0D2247] no-underline flex gap-x-2  active:scale-95 scale-100 duration-75"
            style={{
              boxShadow:
                "0px 1px 4px rgba(13, 34, 71, 0.17), inset 0px 0px 0px 1px #061530, inset 0px 0px 0px 2px rgba(255, 255, 255, 0.1)",
            }}
          >
            <span> Continue </span>
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              height="100%"
            >
              <path
                d="M13.75 6.75L19.25 12L13.75 17.25"
                stroke="#FFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 12H4.75"
                stroke="#FFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default Step2