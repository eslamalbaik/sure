/**
 * Zoho CRM API Integration Utility
 * Handles form submissions to Zoho CRM via backend API
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export interface ZohoFormData {
  name: string;
  email: string;
  phone?: string;
  mobile?: string;
  message?: string;
  question?: string;
  description?: string;
  module?: 'Leads' | 'Contacts';
  leadSource?: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  fileNumber?: string;
  customFields?: Record<string, any>;
  attachments?: Array<{
    name: string;
    url: string;
    path?: string;
    size?: number;
    type?: string;
  }>;
}

export interface ZohoResponse {
  success: boolean;
  message?: string;
  error?: string;
  data?: {
    id: string;
    module: string;
  };
}

/**
 * Submit form data to Zoho CRM
 */
export async function submitToZoho(formData: ZohoFormData): Promise<ZohoResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/zoho/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data: ZohoResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to submit to Zoho CRM');
    }

    return data;
  } catch (error) {
    console.error('Error submitting to Zoho:', error);
    throw error;
  }
}

/**
 * Test Zoho connection
 */
export async function testZohoConnection(): Promise<ZohoResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/zoho/test`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data: ZohoResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to connect to Zoho CRM');
    }

    return data;
  } catch (error) {
    console.error('Error testing Zoho connection:', error);
    throw error;
  }
}

