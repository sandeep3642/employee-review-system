import axios from 'axios';
import { toast } from 'react-toastify';


const BASE_URL = 'http://localhost:8000' ;
 

const apiHelper = async (endpoint, method = 'GET', body = null, additionalHeaders = {}, params = {}, isBlob = false) => {
  try {
    method = typeof method === 'string' ? method.toUpperCase() : 'GET';
    // Retrieve token and sessionId
    const token = localStorage.getItem('token');
    // Set up default headers
    const defaultHeaders = {
      'Content-Type': body instanceof FormData ? 'multipart/form-data' : 'application/json',
      Authorization: `${token}`,
      ...additionalHeaders,
    };

    // Configure Axios request options
    const options = {
      method,
      url: `${BASE_URL}${endpoint}`,
      headers: defaultHeaders,
      params, // Query parameters
      responseType: isBlob ? 'blob' : 'json', // Set response type to 'blob' for downloads
    };

    // Check if the request body is of type FormData
    if (body instanceof FormData) {
      options.data = body;
      // Remove 'Content-Type' header to allow Axios to set it correctly
      delete options.headers['Content-Type'];
    } else if (body) {
      options.data = body;
    }

    // Make the API request using Axios
    const response = await axios(options);

    // Return the full response for blob downloads
    if (isBlob) return response;
    
    // Return the response data for regular requests
    return response.data;

  } catch (error) {
    // Handle and log errors
    toast.error('API Request failed:', error?.response?.data?.error || error.message);
    
    if (error?.response) {
      toast.error(error?.response?.data?.error || "An error occurred."); 
    } else {
      toast.error(`Network error! ${error.message}`); 
    }
    
    throw error; 
  }
};

export default apiHelper;
