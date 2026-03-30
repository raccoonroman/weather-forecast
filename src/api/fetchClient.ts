export async function fetchClient<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(url, options);

  if (!res.ok) {
    const errorText = await res.text().catch(() => null);

    throw new Error(errorText || `HTTP error! status: ${res.status}`);
  }

  return res.json();
}
