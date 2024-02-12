"use client";

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { useForecastStore } from '@/store/useForecastStore';
import { Select, SelectItem } from "@tremor/react";
import * as Icon from "@phosphor-icons/react";
import { MOCK_INPUT_SIZE, MOCK_WEIGHTS_DATA, MOCK_X_DF } from '@/utils/mock';
import { downloadCSV } from '@/utils/functions';

const TimeSeriesPlot = dynamic(() => import("@/components/TimeSeriesPlot"), {
  loading: () => <p>Loading Time Series Plot...</p>,
  ssr: false
})

const ImportanceExogenousVariables = dynamic(() => import("@/components/ImportanceExogenousVariables"), {
  loading: () => <p>Loading Importance Exogenous Plot...</p>,
  ssr: false
})

const PlotExogenousVariables = dynamic(() => import("@/components/PlotExogenousVariables"), {
  loading: () => <p>Loading Exogenous Sub Plots...</p>,
  ssr: false
})

export default function ForecastResultPage() {
  const router = useRouter()
  const { form, result } = useForecastStore()
  const [selectedUid, setSelectedUid] = useState<string | null>(null);
  const uids = Array.from(new Set(result.bodyData.map(d => String(d.unique_id))));

  const handleTryAgain = () => {
    router.push('/run-forecast');
  }

  useEffect(() => {
    if (!result || !result.bodyData || result.bodyData.length === 0) {
      handleTryAgain()
      return;
    }

    if (uids.length > 0) {
      setSelectedUid(uids[0])
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FCFCFC] p-4">
      <div className="flex flex-col w-full md:w-2/3 lg:w-3/4 bg-white p-8 rounded-xl shadow-lg space-y-6">
        <h1 className="text-2xl font-bold text-center mb-4">Forecast Result</h1>

        <div className="flex justify-center mb-4 items-center space-x-4">
          <div className="flex flex-col w-2/3 items-start">
            <label className="block text-sm font-bold mb-2">Select a unique_id to view</label>
            <Select value={selectedUid || ''} onValueChange={setSelectedUid}>
              {uids.map((uid, index) => (
                <SelectItem key={index} value={String(uid)}>{String(uid)}</SelectItem>
              ))}
            </Select>
          </div>
          <button
            onClick={() => downloadCSV(result)}
            className="group rounded-full px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#f5f7f9] text-[#1E2B3A] no-underline active:scale-95 scale-100 duration-75 gap-x-2 mt-7"
            style={{
              boxShadow: "0 1px 1px #0c192714, 0 1px 3px #0c192724",
            }}
          >
            <span> Download your forecasts </span>
            <Icon.FileCsv size={20} />
          </button>
        </div>

        <div className="min-h-[400px]">
          <TimeSeriesPlot
            selectedUid={selectedUid}
            data={result.bodyData}
            forecastResults={result.resultData}
            horizon={form.horizon}
            level={form.predictionIntervals}
          />
        </div>
        <div className="min-h-[400px]">
          <ImportanceExogenousVariables weightsData={MOCK_WEIGHTS_DATA} />
        </div>
        <div className="min-h-[400px]">
          <PlotExogenousVariables
            df={result.bodyData}
            xDf={MOCK_X_DF}
            inputSize={MOCK_INPUT_SIZE}
            selectedUid={selectedUid || ''}
          />
        </div>
        <div>
          <button
            onClick={handleTryAgain}
            className="group rounded-full px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#f5f7f9] text-[#1E2B3A] no-underline active:scale-95 scale-100 duration-75 gap-x-2"
            style={{
              boxShadow: "0 1px 1px #0c192714, 0 1px 3px #0c192724",
            }}
          >
            <span> Try again </span>
            <Icon.PersonSimpleRun size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

