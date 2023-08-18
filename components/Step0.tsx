import React, { useState, useEffect } from "react";
import * as Icon from "@phosphor-icons/react";
import { motion } from "framer-motion";
import Link from "next/link";
import useLocalStorage from "@/hooks/useLocalStorage";

function Step0({
  setStep
}: {
    setStep: React.Dispatch<React.SetStateAction<number>>;
  }): React.JSX.Element {
  // Nixtla API key
  const [storedApiKey, setStoredApiKey] = useLocalStorage<string>('apiKey', '');
  const [apiKey, setApiKey] = useState<string>(storedApiKey ?? '');

  const [editing, setEditing] = useState<boolean>(!storedApiKey);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateApiKey = () => {
    if (apiKey?.length <= 20) {
      setErrorMessage("The API key should be more than 20 characters.");
      return false;
    }
    setErrorMessage(null);
    return true;
  };

  const handleContinue = () => {
    if (!validateApiKey()) {
      return;
    }
    setStoredApiKey(apiKey);
    setStep(1);
  };

  const handleEdit = () => {
    setEditing(true);
    setApiKey('');
  }

  const maskApiKey = (key: string) => {
    if (!key) return "";
    return key.substring(0, 8) + "*".repeat(key.length - 8);
  };

  useEffect(() => {
    setApiKey(storedApiKey || '');
    setEditing(!storedApiKey);
  }, [storedApiKey]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      key="step-2"
      transition={{
        duration: 0.95,
        ease: [0.165, 0.84, 0.44, 1],
      }}
      className="max-w-lg mx-auto px-4 lg:px-0"
    >
      <h2 className="text-4xl font-bold text-[#1E2B3A]">
        Nixtla API KEY
      </h2>
      <p className="text-[14px] leading-[20px] text-[#1a2b3b] font-normal my-4">
        Please enter the Nixtla API KEY to continue.
      </p>
      <div className="relative">
        <input
          type="text"
          value={editing ? apiKey : maskApiKey(storedApiKey ?? '')}
          onChange={(e) => setApiKey(e.target.value)}
          onBlur={validateApiKey}
          placeholder="API KEY"
          className="w-full p-2 mt-4 border rounded-md"
          required
          disabled={!editing}
        />
        {!editing &&
          <Icon.Pencil onClick={handleEdit}
            className="absolute right-0 top-3 cursor-pointer hover:opacity-100"
          />
        }
        <p className="text-red-500 mt-2 absolute left-0 bottom-[-50px]">{errorMessage}</p>
      </div>
      <div className="flex gap-[15px] justify-end mt-20">
        <div>
          <Link
            href="/"
            className="group rounded-full px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#f5f7f9] text-[#1E2B3A] no-underline active:scale-95 scale-100 duration-75"
            style={{
              boxShadow: "0 1px 1px #0c192714, 0 1px 3px #0c192724",
            }}
          >
            Back to home
          </Link>
        </div>
        <div>
          <button
            onClick={handleContinue}
            disabled={apiKey?.length <= 20}
            className={`group rounded-full px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center ${apiKey?.length >= 20 ? 'bg-[#1E2B3A] text-white hover:[linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #0D2247]' : 'bg-gray-400 text-white cursor-not-allowed'} no-underline flex gap-x-2  active:scale-95 scale-100 duration-75`}
            style={{
              boxShadow: apiKey?.length >= 20
                ? "0px 1px 4px rgba(13, 34, 71, 0.17), inset 0px 0px 0px 1px #061530, inset 0px 0px 0px 2px rgba(255, 255, 255, 0.1)"
                : "none",
            }}
          >
            <span> Continue </span>
            <Icon.ArrowRight size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default Step0