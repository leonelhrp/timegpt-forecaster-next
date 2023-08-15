import React, { useState, useRef, useEffect } from 'react';
import * as Icon from "@phosphor-icons/react";

interface DropdownProps {
  data: { key: string, value: string }[];
  selectedKey: string;
  onValueSelect: (value: string) => void;
  label: React.ReactNode;
  showValue?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ data, selectedKey, onValueSelect, label, showValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const closeDropdown = () => setIsOpen(false);
  const openDropdown = () => setIsOpen(true);
  const isSelected = (itemValue: string) => selectedKey === itemValue;
  const select = (itemValue: string) => {
    setIsOpen(false);
    onValueSelect(itemValue);
  };
  const selectedValue = data.find(item => item.key === selectedKey)?.value;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="space-y-1 relative z-10">
      <label id="listbox-label" className="block text-sm leading-5 font-medium text-gray-700">
        {label}
      </label>

      <div className="relative">
        <span className="inline-block w-full rounded-md shadow-sm">
          <button
            type="button"
            onClick={openDropdown}
            aria-haspopup="listbox"
            aria-expanded="true"
            aria-labelledby="listbox-label"
            className="cursor-pointer relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
          >
            <span className="block truncate">
              {selectedKey}
              {showValue && selectedValue && <span className="text-gray-500 text-xs"> - {selectedValue}</span>}
            </span>

            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <Icon.ArrowDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </button>
        </span>

        {isOpen && (
          <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg">
            <ul style={{ listStyle: 'none', maxHeight: 'calc(2rem * 5)', overflowY: 'auto' }} tabIndex={-1} role="listbox" aria-labelledby="listbox-label" className="rounded-md py-1 text-base leading-6 focus:outline-none sm:text-sm sm:leading-5">
              {data.map((item, index) => (
                <li
                  key={index}
                  tabIndex={0}
                  onClick={() => select(item.key)}
                  id={`listbox-item-${index}`}
                  role="option"
                  className={`text-gray-900 select-none relative py-2 pl-3 pr-9 cursor-pointer hover:text-white hover:bg-indigo-600 focus:outline-none ${isSelected(item.key) ? "text-white bg-indigo-600" : ""}`}
                >
                  <span className={`block truncate ${isSelected(item.key) ? 'font-semibold' : 'font-normal'}`}>
                    {item.key}
                    {showValue && <span className="text-gray-500 text-xs"> - {item.value}</span>}
                  </span>

                  {isSelected(item.key) && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                      <Icon.Check className="h-5 w-5 text-white" aria-hidden="true" />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dropdown;
