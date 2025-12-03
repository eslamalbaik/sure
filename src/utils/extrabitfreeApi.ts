/**
 * ExtraBitFree API Integration Utility
 * Handles requests to ExtraBitFree API via backend proxy
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export interface ExtraBitFreeRequest {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  headers?: Record<string, string>;
}

export interface ExtraBitFreeResponse {
  success: boolean;
  data?: any;
  message?: string;
  error?: string;
  details?: any;
}

/**
 * Make request to ExtraBitFree API through backend proxy
 */
export async function callExtraBitFreeAPI(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: any,
  customHeaders?: Record<string, string>
): Promise<ExtraBitFreeResponse> {
  try {
    // Remove leading slash if present
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...customHeaders
    };

    const requestOptions: RequestInit = {
      method,
      headers,
    };

    if (data && (method === 'POST' || method === 'PUT')) {
      requestOptions.body = JSON.stringify(data);
    }

    const response = await fetch(`${API_BASE_URL}/api/extrabitfree/${cleanEndpoint}`, requestOptions);

    const result: ExtraBitFreeResponse = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to process request');
    }

    return result;
  } catch (error) {
    console.error('Error calling ExtraBitFree API:', error);
    throw error;
  }
}

/**
 * GET request to ExtraBitFree API
 */
export async function getExtraBitFree(
  endpoint: string,
  headers?: Record<string, string>
): Promise<ExtraBitFreeResponse> {
  return callExtraBitFreeAPI(endpoint, 'GET', undefined, headers);
}

/**
 * POST request to ExtraBitFree API
 */
export async function postExtraBitFree(
  endpoint: string,
  data?: any,
  headers?: Record<string, string>
): Promise<ExtraBitFreeResponse> {
  return callExtraBitFreeAPI(endpoint, 'POST', data, headers);
}

/**
 * PUT request to ExtraBitFree API
 */
export async function putExtraBitFree(
  endpoint: string,
  data?: any,
  headers?: Record<string, string>
): Promise<ExtraBitFreeResponse> {
  return callExtraBitFreeAPI(endpoint, 'PUT', data, headers);
}

/**
 * DELETE request to ExtraBitFree API
 */
export async function deleteExtraBitFree(
  endpoint: string,
  headers?: Record<string, string>
): Promise<ExtraBitFreeResponse> {
  return callExtraBitFreeAPI(endpoint, 'DELETE', undefined, headers);
}

