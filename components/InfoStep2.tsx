import React from "react";

function InfoStep2(): React.JSX.Element {
  return (
    <div className="flex flex-col gap-y-2">
      <h1 className="text-[#1E2B3A] text-[20px] font-bold">
      Understanding Forecasting Parameters
      </h1>
      <p className="text-[#1E2B3A] text-[12px] font-xs">
      Setting the right parameters is crucial for accurate predictions. Frequency refers to how regularly your data is collected, horizon is how far into the future you want to predict, and fine-tune steps and prediction intervals pertain to how your model is adjusted and how its uncertainty is estimated.
      </p>
    </div>
  );
}

export default InfoStep2