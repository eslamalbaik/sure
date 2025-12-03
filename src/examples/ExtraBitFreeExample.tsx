/**
 * Example: How to use ExtraBitFree API in React components
 */

import { useState } from 'react';
import { 
  getExtraBitFree, 
  postExtraBitFree, 
  putExtraBitFree, 
  deleteExtraBitFree 
} from '@/utils/extrabitfreeApi';

export function ExtraBitFreeExample() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Example: GET request
  const handleGet = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getExtraBitFree('users');
      setData(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  // Example: POST request
  const handlePost = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await postExtraBitFree('users', {
        name: 'John Doe',
        email: 'john@example.com'
      });
      setData(response.data);
      alert('User created successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  // Example: PUT request
  const handleUpdate = async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await putExtraBitFree(`users/${userId}`, {
        name: 'Jane Doe'
      });
      setData(response.data);
      alert('User updated successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  // Example: DELETE request
  const handleDelete = async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await deleteExtraBitFree(`users/${userId}`);
      setData(response.data);
      alert('User deleted successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">ExtraBitFree API Examples</h2>
      
      <div className="space-y-2 mb-4">
        <button 
          onClick={handleGet}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'GET Users'}
        </button>
        
        <button 
          onClick={handlePost}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50 ml-2"
        >
          {loading ? 'Loading...' : 'POST Create User'}
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded mb-4">
          Error: {error}
        </div>
      )}

      {data && (
        <div className="p-3 bg-gray-100 rounded">
          <pre className="text-sm overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

