/**
 * Robust API client with comprehensive error handling and debugging
 */

export interface ApiError extends Error {
  status?: number;
  statusText?: string;
  response?: any;
}

export class ApiClientError extends Error implements ApiError {
  status?: number;
  statusText?: string;
  response?: any;

  constructor(message: string, status?: number, statusText?: string, response?: any) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.statusText = statusText;
    this.response = response;
  }
}

/**
 * Enhanced fetch function with detailed error reporting
 */
export async function jsonOrThrow(url: string): Promise<any> {
  console.log(`🌐 API Request: ${url}`);
  
  try {
    const res = await fetch(url, { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    console.log(`📡 API Response: ${url} - ${res.status} ${res.statusText}`);
    
    if (!res.ok) {
      let errorText: string;
      try {
        errorText = await res.text();
      } catch {
        errorText = 'Failed to read error response';
      }
      
      const errorMessage = `${res.status} ${res.statusText}: ${errorText}`;
      console.error(`❌ API Error: ${url} - ${errorMessage}`);
      
      throw new ApiClientError(
        errorMessage,
        res.status,
        res.statusText,
        errorText
      );
    }
    
    const data = await res.json();
    console.log(`✅ API Success: ${url}`, data);
    return data;
    
  } catch (error) {
    console.error(`💥 API Exception: ${url}`, error);
    
    if (error instanceof ApiClientError) {
      throw error;
    }
    
    // Network errors, parsing errors, etc.
    throw new ApiClientError(
      `Network or parsing error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      undefined,
      undefined,
      error
    );
  }
}

/**
 * API Client object with standard HTTP methods
 */
export const api = {
  async get<T = any>(endpoint: string, params?: Record<string, string>): Promise<T> {
    let url = endpoint;
    
    // Add query parameters if provided
    if (params && Object.keys(params).length > 0) {
      const searchParams = new URLSearchParams(params);
      url += `?${searchParams.toString()}`;
    }
    
    return await jsonOrThrow(url);
  },

  async post<T = any>(endpoint: string, data?: any): Promise<T> {
    const res = await fetch(endpoint, {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    console.log(`📡 POST Response: ${endpoint} - ${res.status} ${res.statusText}`);
    
    if (!res.ok) {
      let errorText: string;
      try {
        errorText = await res.text();
      } catch {
        errorText = 'Failed to read error response';
      }
      
      const errorMessage = `${res.status} ${res.statusText}: ${errorText}`;
      console.error(`❌ POST Error: ${endpoint} - ${errorMessage}`);
      
      throw new ApiClientError(
        errorMessage,
        res.status,
        res.statusText,
        errorText
      );
    }
    
    const responseData = await res.json();
    console.log(`✅ POST Success: ${endpoint}`, responseData);
    return responseData;
  },

  async put<T = any>(endpoint: string, data?: any): Promise<T> {
    const res = await fetch(endpoint, {
      method: 'PUT',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    console.log(`📡 PUT Response: ${endpoint} - ${res.status} ${res.statusText}`);
    
    if (!res.ok) {
      let errorText: string;
      try {
        errorText = await res.text();
      } catch {
        errorText = 'Failed to read error response';
      }
      
      const errorMessage = `${res.status} ${res.statusText}: ${errorText}`;
      console.error(`❌ PUT Error: ${endpoint} - ${errorMessage}`);
      
      throw new ApiClientError(
        errorMessage,
        res.status,
        res.statusText,
        errorText
      );
    }
    
    const responseData = await res.json();
    console.log(`✅ PUT Success: ${endpoint}`, responseData);
    return responseData;
  },

  async delete<T = any>(endpoint: string): Promise<T> {
    const res = await fetch(endpoint, {
      method: 'DELETE',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(`📡 DELETE Response: ${endpoint} - ${res.status} ${res.statusText}`);
    
    if (!res.ok) {
      let errorText: string;
      try {
        errorText = await res.text();
      } catch {
        errorText = 'Failed to read error response';
      }
      
      const errorMessage = `${res.status} ${res.statusText}: ${errorText}`;
      console.error(`❌ DELETE Error: ${endpoint} - ${errorMessage}`);
      
      throw new ApiClientError(
        errorMessage,
        res.status,
        res.statusText,
        errorText
      );
    }
    
    const responseData = await res.json();
    console.log(`✅ DELETE Success: ${endpoint}`, responseData);
    return responseData;
  },
};

/**
 * Fetch analytics distribution data
 */
export async function fetchAnalyticsDistribution(dimension: 'profile' | 'appetite') {
  const url = `/api/analytics/distribution?dim=${dimension}`;
  const response = await jsonOrThrow(url);
  
  if (!response.data || !Array.isArray(response.data)) {
    throw new ApiClientError(`Invalid distribution data format for ${dimension}`);
  }
  
  return response;
}

/**
 * Fetch analytics KPIs
 */
export async function fetchAnalyticsKpis() {
  const url = '/api/analytics/kpis';
  const kpis = await jsonOrThrow(url);
  
  if (typeof kpis.tests_requested !== 'number' || 
      typeof kpis.reports_produced !== 'number' || 
      typeof kpis.test_allowance_remaining !== 'number') {
    throw new ApiClientError('Invalid KPIs data format');
  }
  
  return kpis;
}

/**
 * Test API health
 */
export async function fetchApiHealth() {
  const url = '/api/health';
  return await jsonOrThrow(url);
}