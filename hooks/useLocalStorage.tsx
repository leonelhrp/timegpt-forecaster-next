import { useState, useEffect } from 'react';

/**
 * Custom hook to handle localStorage
 * @param key - Key to access the localStorage
 * @param initialValue - Initial value if the key doesn't exist
 */
function useLocalStorage<T>(key: string, initialValue: T) {
  const [isClientSide, setIsClientSide] = useState<boolean>(false);

  const storedValue = () => {
    if (!isClientSide) {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return initialValue;
    }
  };

  const [value, setValue] = useState<T>(storedValue);

  useEffect(() => {
    setIsClientSide(true);
  }, []);

  useEffect(() => {
    if (isClientSide) {
      setValue(storedValue());
    }
  }, [isClientSide]);

  const setStoredValue = (newValue: T | ((val: T) => T)) => {
    if (!isClientSide) {
      return;
    }

    try {
      const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
      setValue(valueToStore);

      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error setting value in localStorage:', error);
    }
  };

  return [value, setStoredValue] as const;
}

export default useLocalStorage;
