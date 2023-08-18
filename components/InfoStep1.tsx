import React from "react";

function InfoStep1(): React.JSX.Element {
  return (
    <div className="flex flex-col gap-y-2">
      <h1 className="text-[#1E2B3A] text-[20px] font-bold">
        Understanding Time Series & Exogenous Data
      </h1>
      <p className="text-[#1E2B3A] text-[12px] font-xs">
        <strong>Time Series Data:</strong> A time series is a sequence of numerical data points taken at successive equally spaced points in time. In financial contexts, time series tracks the movement of the chosen data points, such as a stock price, over a specified period of time with data points recorded at regular intervals. Understanding time series allows for better forecasting, planning, and analysis.
      </p>
      <p className="text-[#1E2B3A] text-[12px] font-xs">
        <strong>Exogenous Data:</strong> Exogenous variables, often referred to as external or independent variables, are inputs that are not influenced by other variables within the model but can influence other variables. In the context of time series forecasting, exogenous data can include any external factors that might influence the variable you are trying to forecast. For example, in predicting electricity demand, weather conditions such as temperature can be an exogenous variable, as temperature might affect electricity usage but is not affected by it.
      </p>
    </div>
  );
}

export default InfoStep1
