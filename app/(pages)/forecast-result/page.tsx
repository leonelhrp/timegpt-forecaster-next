"use client";

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react';
import { useForecastStore } from '@/store/useForecastStore';
import { Select, SelectItem } from "@tremor/react";

const mockData = [
  { unique_id: "id1", ds: "2022-01-01", y: 112 },
  { unique_id: "id1", ds: "2022-01-02", y: 113 },
  { unique_id: "id1", ds: "2022-01-03", y: 115 },
  { unique_id: "id1", ds: "2022-01-04", y: 119 },
  { unique_id: "id1", ds: "2022-01-05", y: 120 },
  { unique_id: "id2", ds: "2022-01-01", y: 212 },
  { unique_id: "id2", ds: "2022-01-02", y: 213 },
  { unique_id: "id2", ds: "2022-01-03", y: 215 },
  { unique_id: "id2", ds: "2022-01-04", y: 219 },
  { unique_id: "id2", ds: "2022-01-05", y: 220 },
];

const mockForecastResults = [
  { unique_id: "id1", ds: "2022-01-06", TimeGPT: 121, "TimeGPT-lo-95": 115, "TimeGPT-hi-95": 125 },
  { unique_id: "id1", ds: "2022-01-07", TimeGPT: 123, "TimeGPT-lo-95": 117, "TimeGPT-hi-95": 127 },
  { unique_id: "id1", ds: "2022-01-08", TimeGPT: 124, "TimeGPT-lo-95": 118, "TimeGPT-hi-95": 128 },
  { unique_id: "id1", ds: "2022-01-09", TimeGPT: 125, "TimeGPT-lo-95": 119, "TimeGPT-hi-95": 129 },
  { unique_id: "id2", ds: "2022-01-06", TimeGPT: 221, "TimeGPT-lo-95": 215, "TimeGPT-hi-95": 225 },
  { unique_id: "id2", ds: "2022-01-07", TimeGPT: 223, "TimeGPT-lo-95": 217, "TimeGPT-hi-95": 227 },
  { unique_id: "id2", ds: "2022-01-08", TimeGPT: 224, "TimeGPT-lo-95": 218, "TimeGPT-hi-95": 228 },
  { unique_id: "id2", ds: "2022-01-09", TimeGPT: 225, "TimeGPT-lo-95": 219, "TimeGPT-hi-95": 229 },
];

const mockHorizon = 7;
const mockLevel = 95;

const TimeSeriesPlot = dynamic(() => import("@/components/TimeSeriesPlot"), {
  loading: () => <p>Loading...</p>,
  ssr: false
})

export default function ForecastResultPage() {
  const { result } = useForecastStore()
  const [selectedUid, setSelectedUid] = useState<string | null>(null);
  const uids = Array.from(new Set(mockData.map(d => d.unique_id)));

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
            data={mockData}
            forecastResults={mockForecastResults}
            horizon={mockHorizon}
            level={mockLevel}
          />
        </div>
      </div>
    </div>
  );
}
