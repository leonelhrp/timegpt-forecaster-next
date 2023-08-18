import React from "react";

function InfoStep3(): React.JSX.Element {
  return (
    <div className="flex flex-col gap-y-2">
      <h1 className="text-[#1E2B3A] text-[20px] font-bold">
        Information on Calendar Variables
      </h1>
      <p className="text-[#1E2B3A] text-[12px] font-xs">
      Calendar variables, such as holidays and weekdays, can significantly impact certain forecasts. Incorporate these variables to refine your prediction's accuracy based on calendar-related events.
      </p>
    </div>
  );
}

export default InfoStep3