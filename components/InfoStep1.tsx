import React from "react";
import * as Icon from "@phosphor-icons/react";

function InfoStep1(): React.JSX.Element {
  return (
    <>
      <div className="flex flex-col gap-y-2 items-center">
        <h1 className="text-[#1E2B3A] text-[20px] font-bold">
          Understanding Time Series
        </h1>
        <p className="text-[#1E2B3A] text-[12px] font-xs max-w-xs">
          A time series represents data points recorded at regular intervals over time. It's crucial for forecasting in financial and other sectors.
        </p>
        <div className="flex m-1 mt-2">
          <Icon.Info size={20} />
          <p className="text-[#1E2B3A] text-[12px] font-xs font-bold">
            Below is an example of the CSV format to upload:
          </p>
        </div>
        <img className="max-w-xs" src="/images/dataframe-multiple-time-series.png" alt="CSV format for time series" />
      </div>
      <div className="flex flex-col gap-y-2 items-center">
        <h1 className="text-[#1E2B3A] text-[20px] font-bold">
          Understanding Exogenous Data
        </h1>
        <p className="text-[#1E2B3A] text-[12px] font-xs max-w-xs">
          Exogenous variables are external inputs in a model, influencing the forecasted variable without being affected by it.
        </p>
        <div className="flex m-1 mt-2">
          <Icon.Info size={20} />
          <p className="text-[#1E2B3A] text-[12px] font-xs font-bold">
            Below is an example of the CSV format to upload:
          </p>
        </div>
        <img className="max-w-lg" src="/images/dataframe-multiple-exogenous.png" alt="CSV format for time series" />
      </div>
    </>
  );
}

export default InfoStep1
