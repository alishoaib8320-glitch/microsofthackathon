export async function fetchApi<T>(endpoint: string, fallbackData: T): Promise<T> {
  try {
    const res = await fetch(`http://localhost:5000/api${endpoint}`, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      console.warn(`API returned ${res.status} for ${endpoint}, using fallback data.`);
      return fallbackData;
    }
    
    const data = await res.json();
    if (data.success && data.data) {
      return data.data as T;
    }
    return fallbackData;
  } catch (error) {
    console.warn(`Could not connect to backend for ${endpoint}, using fallback data. Error:`, error);
    return fallbackData;
  }
}
