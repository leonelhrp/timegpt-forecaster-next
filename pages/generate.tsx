import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ExogenousQuestionType } from "@/types/generate";
import Step1 from "@/components/Step1";
import Step2 from "@/components/Step2";

const exogenousQuestions = [
  {
    id: 1,
    name: "Yes, I have a exogenous data",
    description: "Lorem ipsum dolor sit amet",
    value: true,
  },
  {
    id: 2,
    name: "No, I don't have a exogenous data",
    description: "Lorem ipsum dolor sit amet",
    value: false,
  },
];

export default function GeneratePage() {
  const [selected, setSelected] = useState<ExogenousQuestionType>(
    exogenousQuestions[0]
  );
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("Processing");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
  }, []);

  return (
    <AnimatePresence>
      (
      <div className="flex flex-col md:flex-row w-full md:overflow-hidden">
        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.25, ease: [0.23, 1, 0.32, 1] }}
          className="absolute w-full md:w-1/2 top-0 h-[60px] flex flex-row justify-between"
        >
        </motion.p>
        <div className="w-full min-h-[60vh] md:w-1/2 md:h-screen flex flex-col px-4 pt-2 pb-8 md:px-0 md:py-2 bg-[#FCFCFC] justify-center">
          <div className="h-full w-full items-center justify-center flex flex-col">
            {step === 1 ? (
              <Step1
                setStep={setStep}
                selected={selected}
                setSelected={setSelected}
                exogenousQuestions={exogenousQuestions}
              />
            ) : step === 2 ? (
              <Step2
                setStep={setStep}
              />
            ) : (
              <p>Step 3</p>
            )}
          </div>
        </div>
        <div className="w-full h-[40vh] md:w-1/2 md:h-screen bg-[#F1F2F4] relative overflow-hidden">
          <div className="absolute z-[2] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-[#1E2B3A] text-[36px] font-bold">
                  Lorem ipsum dolor sit amet.
                </h1>
                <p className="text-[#1E2B3A] text-[16px] font-medium">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
