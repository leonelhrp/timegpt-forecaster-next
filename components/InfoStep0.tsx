import React from "react";

function InfoStep0(): React.JSX.Element {
  return (
    <div className="flex flex-col gap-y-2">
      <h1 className="text-[#1E2B3A] text-[36px] font-bold">
        Nixtla API Key
      </h1>
      <p className="text-[#1E2B3A] text-[16px] font-medium">
        Please enter your Nixtla API Key to access further steps. If you don't have one, you can obtain it from <a href="https://dashboard.nixtla.io/" target="_blank" rel="noopener noreferrer" className="underline">Nixtla Dashboard</a>.
      </p>
    </div>
  );
}

export default InfoStep0;
