import LineChartResult from "@/components/LineChartResult";
import LineChartResultTabs from "@/components/LineChartResultTabs";

export default function ForecastResultPage() {
  return (
    <div className="flex flex-col items-center justify-start bg-[#FCFCFC] px-4 py-8 md:overflow-auto">
      <div className="flex flex-col w-full max-w-screen-xl space-y-8 mb-8">
        <LineChartResult />
        <LineChartResultTabs />
      </div>
    </div>
  );
}
