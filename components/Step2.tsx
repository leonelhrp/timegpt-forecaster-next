import React, { useId } from "react";
import * as Icon from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { NumberInput, Select, SelectItem } from "@tremor/react";
import { FRECUENCIES } from "@/utils/consts";

function Step2({
  setStep,
  frecuency,
  setFrecuency,
  horizon,
  setHorizon,
  finetuneSteps,
  setFinetuneSteps,
  predictionIntervals,
  setPredictionIntervals
}: {
    setStep: React.Dispatch<React.SetStateAction<number>>;
    frecuency: string;
    setFrecuency: React.Dispatch<React.SetStateAction<string>>;
    horizon: number;
    setHorizon: React.Dispatch<React.SetStateAction<number>>;
    finetuneSteps: number;
    setFinetuneSteps: React.Dispatch<React.SetStateAction<number>>;
    predictionIntervals: number;
    setPredictionIntervals: React.Dispatch<React.SetStateAction<number>>;
  }): React.JSX.Element {
  const itemId = useId();

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
        Forecasting parameters
      </h2>
      <p className="text-[14px] leading-[20px] text-[#1a2b3b] font-normal my-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt voluptatibus nobis incidunt! Iure fugiat libero maiores commodi adipisci placeat omnis ab quisquam quasi architecto officia, quibusdam, totam beatae expedita. Obcaecati.
      </p>
      <div className="mt-8">
        <div className="flex flex-col gap-y-4">

          <div className="flex gap-x-4">
            <div className="flex flex-col gap-y-2 w-1/2">
              <label className="block text-sm leading-5 font-medium text-gray-700">
                Define the frequency of your data (see&nbsp;
                <a
                  className="text-blue-500 hover:underline"
                  href="https://pandas.pydata.org/pandas-docs/stable/user_guide/timeseries.html#offset-aliases"
                  target="_blank" rel="noopener noreferrer">
                  pandas&apos; available frequencies
                </a>)
              </label>
              <Select value={frecuency} onValueChange={setFrecuency}>
                {FRECUENCIES.map(frecuency => (
                  <SelectItem key={itemId} value={frecuency.key}>
                    {frecuency.key} - {frecuency.value}
                  </SelectItem>
                ))}
              </Select>
            </div>

            {/* Horizon Input */}
            <div className="flex flex-col gap-y-2 w-1/2">
              <label className="block text-sm leading-5 font-medium text-gray-700">
                Define forecast horizon (in number of timestamps you want to predict)
              </label>
              <NumberInput value={horizon} onValueChange={setHorizon} />
            </div>
          </div>

          <div className="flex gap-x-4">
            {/* FinetuneSteps Input */}
            <div className="flex flex-col gap-y-2 w-1/2">
              <label className="block text-sm leading-5 font-medium text-gray-700">
                Define finetune steps (use zero for zero-shot inference, which is faster)
              </label>
              <NumberInput value={finetuneSteps} onValueChange={setFinetuneSteps} />
            </div>

            {/* PredictionIntervals Input */}
            <div className="flex flex-col gap-y-2 w-1/2">
              <label className="block text-sm leading-5 font-medium text-gray-700">
                Define level for prediction intervals (uncertainty estimation)
              </label>
              <NumberInput value={predictionIntervals} onValueChange={setPredictionIntervals} />
            </div>
          </div>

        </div>

      </div>
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
            <Icon.ArrowRight size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default Step2