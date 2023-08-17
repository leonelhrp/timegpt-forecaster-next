import ForecastPlot from "@/components/ForecastPlot";
import LineChartResult from "@/components/LineChartResult";
import LineChartResultTabs from "@/components/LineChartResultTabs";

export default function ForecastResultPage() {
  return (
    <div className="flex flex-col items-center justify-start bg-[#FCFCFC] px-4 py-8 md:overflow-auto mt-16 mb-16">
      <div className="flex flex-col w-full max-w-screen-xl space-y-8 mb-8 items-center">
        <LineChartResult />
        <LineChartResultTabs />
        <ForecastPlot data={[]} forecastResults={[]} selected_uid={""} />
      </div>
    </div>
  );
}
