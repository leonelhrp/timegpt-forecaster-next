import React, { useId } from "react";
import { useRouter } from 'next/navigation'
import * as Icon from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { Select, SelectItem, MultiSelect, MultiSelectItem, Subtitle } from "@tremor/react";
import { COUNTRIES } from "@/utils/consts";
import { useForecastStore } from "@/store/useForecastStore";

function Step3({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  }): React.JSX.Element {
  const router = useRouter()
  const itemId = useId();
  const { form, setPropertyForm, sendTimeGPTMultiSeriesForm } = useForecastStore()

  const handleRunForecast = async () => {
    await sendTimeGPTMultiSeriesForm()
    router.push('/forecast-result');
  };

  const handleDefaultCalendarVarChange = (value: string) => {
    setPropertyForm({ key: 'defaultCalendarVar', value: value === 'true' });
  }

  const handleCountryHolidaysChange = (value: string[]) => {
    setPropertyForm({ key: 'countryHolidays', value })
  }

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
      Select the appropriate calendar variables to consider for your forecast. This can include default variables and specific country holidays.
      </p>
      <div className="mt-8">
        <div className="flex flex-col gap-y-4">

          <div className="flex gap-x-4">
            <div className="flex flex-col gap-y-2 w-1/2">
              <label className="block text-sm leading-5 font-medium text-gray-700">
                Add default calendar variables
              </label>
              <Select value={String(form.defaultCalendarVar)} onValueChange={handleDefaultCalendarVarChange}>
                <SelectItem key={`${itemId}-${true}`} value={String(true)}>
                  True
                </SelectItem>
                <SelectItem key={`${itemId}-${false}`} value={String(false)}>
                  False
                </SelectItem>
              </Select>
            </div>

            <div className="flex flex-col gap-y-2 w-1/2">
              <label className="block text-sm leading-5 font-medium text-gray-700">
                Add country holidays
              </label>
              <MultiSelect value={form.countryHolidays} onValueChange={handleCountryHolidaysChange}>
                {COUNTRIES.map(country => (
                  <MultiSelectItem key={`${itemId}-${country.name}`} value={country.name}>
                    {country.name}
                  </MultiSelectItem>
                ))}
              </MultiSelect>
              {form.countryHolidays.length > 0 && (
                <div className="flex flex-col">
                  {form.countryHolidays.map(country => (
                    <Subtitle className="text-xs" key={`${itemId}-${country}-country`}>{country}</Subtitle>
                  ))}
                </div>
              )}
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
            onClick={handleRunForecast}
            disabled={false}
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

export default Step3