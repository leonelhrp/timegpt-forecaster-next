import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ExogenousQuestionType } from "@/types/generate";
import Step0 from "@/components/Step0";
import Step1 from "@/components/Step1";
import Step2 from "@/components/Step2";
import Step3 from "@/components/Step3";
import Step4 from "@/components/Step4";
import InfoStep0 from "@/components/InfoStep0";
import InfoStep1 from "@/components/InfoStep1";
import InfoStep2 from "@/components/InfoStep2";
import InfoStep3 from "@/components/InfoStep3";
import InfoStep4 from "@/components/InfoStep4";

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
  const [step, setStep] = useState<number>(0);
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
            {step === 0 && (
              <Step0
                setStep={setStep}
              />
            )}
            {step === 1 && (
              <Step1
                setStep={setStep}
                selected={selected}
                setSelected={setSelected}
                exogenousQuestions={exogenousQuestions}
              />
            )}
            {step === 2 && (
              <Step2
                setStep={setStep}
              />
            )}
            {step === 3 && (
              <Step3
                setStep={setStep}
              />
            )}
            {step === 4 && (
              <Step4
                setStep={setStep}
              />
            )}
          </div>
        </div>
        <div className="w-full h-[40vh] md:w-1/2 md:h-screen bg-[#F1F2F4] relative overflow-hidden">
          <div className="absolute z-[2] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="flex flex-col gap-y-4">
              {step === 0 && (
                <InfoStep0 />
              )}
              {step === 1 && (
                <InfoStep1 />
              )}
              {step === 2 && (
                <InfoStep2 />
              )}
              {step === 3 && (
                <InfoStep3 />
              )}
              {step === 4 && (
                <InfoStep4 />
              )}
            </div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
