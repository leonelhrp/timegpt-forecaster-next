"use client";

import dynamic from 'next/dynamic'
import { useEffect } from 'react';
import { useForecastStore } from '@/store/useForecastStore';

const ForecastPlot = dynamic(() => import("@/components/ForecastPlot"), {
  loading: () => <p>Loading...</p>,
  ssr: false
})

export default function ForecastResultPage() {
  const { result } = useForecastStore()

  useEffect(() => {
    if (result) {
      console.log(result)
    }
  }, [result])
  return (
    <div className="flex flex-col items-center justify-start bg-[#FCFCFC] px-4 py-8 md:overflow-auto mt-16 mb-16">
      <div className="flex flex-col w-full max-w-screen-xl space-y-8 mb-8 items-center">
        <ForecastPlot data={[]} forecastResults={[]} selected_uid={""} />
      </div>
    </div>
  );
}