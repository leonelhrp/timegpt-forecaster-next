import React, { useState, useId } from "react";
import { useRouter } from 'next/router';
import * as Icon from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { Select, SelectItem, MultiSelect, MultiSelectItem } from "@tremor/react";
import { COUNTRIES } from "@/utils/consts";

function Step4({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  }): React.JSX.Element {
  const router = useRouter();

  const [defaultCalendarVar, setDefaultCalendarVar] = useState<string>('True');
  const [countryHolidays, setCountryHolidays] = useState<Array<string>>([]);

  const runForecast = () => {
    router.push('/forecast-result');
  };

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
        Calendar variables
      </h2>
      <p className="text-[14px] leading-[20px] text-[#1a2b3b] font-normal my-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt voluptatibus nobis incidunt! Iure fugiat libero maiores commodi adipisci placeat omnis ab quisquam quasi architecto officia, quibusdam, totam beatae expedita. Obcaecati.
      </p>
      <div className="mt-8">
        <div className="flex flex-col gap-y-4">

          <div className="flex gap-x-4">
            <div className="flex flex-col gap-y-2 w-1/2">
              <label className="block text-sm leading-5 font-medium text-gray-700">
                Add default calendar variables
              </label>
              <Select value={defaultCalendarVar} onValueChange={setDefaultCalendarVar}>
                <SelectItem key={'True'} value={'True'}>
                  True
                </SelectItem>
                <SelectItem key={'False'} value={'False'}>
                  False
                </SelectItem>
              </Select>
            </div>

            <div className="flex flex-col gap-y-2 w-1/2">
              <label className="block text-sm leading-5 font-medium text-gray-700">
                Add default calendar variables
              </label>
              <MultiSelect value={countryHolidays} onValueChange={setCountryHolidays}>
                {COUNTRIES.map(country => (
                  <MultiSelectItem key={useId()} value={country.code}>
                    {country.name}
                  </MultiSelectItem>
                ))}
              </MultiSelect>
            </div>
          </div>
        </div>

      </div>
      <div className="flex gap-[15px] justify-end mt-8">
        <div>
          <button
            onClick={() => setStep(2)}
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
            onClick={runForecast}
            className="group rounded-full px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#1E2B3A] text-white hover:[linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #0D2247] no-underline flex gap-x-2  active:scale-95 scale-100 duration-75"
            style={{
              boxShadow:
                "0px 1px 4px rgba(13, 34, 71, 0.17), inset 0px 0px 0px 1px #061530, inset 0px 0px 0px 2px rgba(255, 255, 255, 0.1)",
            }}
          >
            <span> Run Forecast </span>
            <Icon.PersonSimpleRun size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default Step4