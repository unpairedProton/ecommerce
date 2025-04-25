import axios from "axios";

const instance = axios.create({
  baseURL: 'https://fakestoreapi.com',
  // Add error handling interceptor
  interceptors: {
    response: {
      use: (response) => response,
      error: (error) => {
        console.error('API Error:', error);
        // Return a more helpful error message
        return Promise.reject({
          ...error,
          message: 'API request failed. Note that Fake Store API is read-only and changes are not persisted.'
        });
      }
    }
  }
});

export default instance;