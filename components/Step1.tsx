import React, { useState } from "react";
import * as Icon from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { UploadCSV } from '@/components/UploadCSV';
import {
  TIME_SERIES_UPLOAD_TITLE,
  TIME_SERIES_UPLOAD_SUBTITLE,
  TIME_SERIES_UPLOAD_EXAMPLE_LINK,
} from "@/utils/consts";
import { useForecastStore } from "@/store/useForecastStore";
import { csvFileToYRequestBody } from "@/utils/functions";

function Step1({
  setStep
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}): React.JSX.Element {
  const { form, setPropertyForm } = useForecastStore();
  const [error, setError] = useState<string | null>(null);

  const onDoneTimeSeriesFile = async (file: File) => {
    try {
      const transformedData = await csvFileToYRequestBody(file);
      setPropertyForm({ key: 'timeSeriesData', value: transformedData });
      setError(null);
    } catch (error) {
      setPropertyForm({ key: 'timeSeriesData', value: { columns: [], data: [] } });

      if (typeof error === 'string') {
        setError(error);
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };


  const UploadCSVTimeSeriesProps = {
    onDone: onDoneTimeSeriesFile,
    title: TIME_SERIES_UPLOAD_TITLE,
    subtitle: TIME_SERIES_UPLOAD_SUBTITLE,
    exampleLink: TIME_SERIES_UPLOAD_EXAMPLE_LINK
  }

  const disabledButton = !form.timeSeriesData.columns.length || !form.timeSeriesData.data.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      key="step-1"
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
        Welcome to the data upload assistant. To get started, provide your time series. This information will feed into the forecasting process, enabling you to achieve more accurate results. If you need examples of format or content, download our provided sample files.
      </p>
      <div>
        <div className="mb-8">
          <UploadCSV {...UploadCSVTimeSeriesProps} />
          {error && (
            <div className="mt-1 text-red-600">
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-[15px] justify-end mt-8">
        <div>
          <button
            onClick={() => setStep(0)}
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
              setStep(2);
            }}
            className={`group rounded-full px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center ${!disabledButton ? 'bg-[#1E2B3A] text-white hover:[linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #0D2247]' : 'bg-gray-400 text-white cursor-not-allowed'} no-underline flex gap-x-2  active:scale-95 scale-100 duration-75`}
            style={{
              boxShadow: !disabledButton
                ? "0px 1px 4px rgba(13, 34, 71, 0.17), inset 0px 0px 0px 1px #061530, inset 0px 0px 0px 2px rgba(255, 255, 255, 0.1)"
                : "none",
            }}
            disabled={disabledButton}
          >
            <span> Continue </span>
            <Icon.ArrowRight size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default Step1