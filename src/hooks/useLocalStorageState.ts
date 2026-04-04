import { useEffect, useState } from 'react';
import { getLocalStorageItem } from '@/utils/localStorage';

export function useLocalStorageState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => getLocalStorageItem(key, initialValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState] as const;
}
