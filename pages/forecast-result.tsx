import LineChartResult from "@/components/LineChartResult";
import { AnimatePresence, motion } from "framer-motion";

export default function ForecastResultPage() {
  return (
    <AnimatePresence>
      (
      <div className="flex flex-col md:flex-row w-full md:overflow-hidden">
        <div className="w-full md:h-screen flex flex-col px-4 bg-[#FCFCFC] justify-center">
          <div className="h-full w-full items-center justify-center flex flex-col">
            <LineChartResult />
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
