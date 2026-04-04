export function getLocalStorageItem<T>(key: string): T | null;
export function getLocalStorageItem<T>(key: string, fallback: T): T;
export function getLocalStorageItem<T>(key: string, fallback?: T): T | null {
  const raw = localStorage.getItem(key);

  if (raw === null) {
    return fallback ?? null;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    localStorage.removeItem(key);
    return fallback ?? null;
  }
}
