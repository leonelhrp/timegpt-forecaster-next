"use client";

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react';
import { useForecastStore } from '@/store/useForecastStore';
import { Select, SelectItem } from "@tremor/react";

const TimeSeriesPlot = dynamic(() => import("@/components/TimeSeriesPlot"), {
  loading: () => <p>Loading...</p>,
  ssr: false
})

export default function ForecastResultPage() {
  const { form, result } = useForecastStore()
  const [selectedUid, setSelectedUid] = useState<string | null>(null);
  const uids = Array.from(new Set(result.bodyData.map(d => d.unique_id)));

  useEffect(() => {
    if (uids.length > 0) {
      setSelectedUid(uids[0])
    }
  }, [])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FCFCFC] p-4">
      <div className="flex flex-col w-full md:w-2/3 lg:w-3/4 bg-white p-8 rounded-xl shadow-lg space-y-6">
        <h1 className="text-2xl font-bold text-center mb-4">Forecast Result</h1>

        <div className="flex justify-center mb-4">
          <div className="w-2/3">
            <label className="block text-sm font-bold mb-2">Select a unique_id to view</label>
            <Select value={selectedUid || ''} onValueChange={setSelectedUid}>
              {uids.map((uid, index) => (
                <SelectItem key={index} value={uid}>{uid}</SelectItem>
              ))}
            </Select>
          </div>
        </div>

        <div className="min-h-[400px]">
          <TimeSeriesPlot
            selectedUid={selectedUid}
            data={result.bodyData}
            forecastResults={result.resultData}
            horizon={form.horizon}
            level={form.finetuneSteps}
          />
        </div>
      </div>
    </div>
  );
}
