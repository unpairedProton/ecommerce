import axios from "axios";

const instance = axios.create({
  // Use proxy in development, direct URL in production
  baseURL: import.meta.env.DEV ? '/api' : 'https://fakestoreapi.com',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // Enable CORS
  withCredentials: false,
});

// Add request interceptor to handle CORS
instance.interceptors.request.use((config) => {
  // Add CORS headers to the request
  config.headers['Access-Control-Allow-Origin'] = '*';
  config.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';
  return config;
});

// Add response interceptor to handle CORS errors
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 403) {
        console.error('CORS Error:', error);
      }
      // Log the full error response for debugging
      console.error('API Error Response:', {
        status: error.response.status,
        headers: error.response.headers,
        data: error.response.data
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Error setting up request:', error.message);
    }
    return Promise.reject(error);
  }
);

export default instance;