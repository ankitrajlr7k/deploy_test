import axios from "axios";

// Create an instance of axios with environment-based configuration
const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  withCredentials: true,
  timeout: 10000, // Set a timeout of 10 seconds
});


// Request interceptor to modify or add headers
apiRequest.interceptors.request.use(
  (config) => {
    // Example: Add Authorization header if token is available
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
apiRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle response errors
    if (error.response) {
      // Example: Handle specific status codes
      if (error.response.status === 401) {
        // Handle unauthorized access (e.g., redirect to login)
      }
    }
    return Promise.reject(error);
  }
);

export default apiRequest;
