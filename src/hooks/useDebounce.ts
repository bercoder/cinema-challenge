import { useState, useEffect } from 'react';

export const useDebounce = (value: string, ms:number = 700) => {
  const [debouncedValue, setDebounced] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value);
    }, ms)
  
    return () => clearTimeout(timer);
  }, [value, ms])
  

  return debouncedValue;
}