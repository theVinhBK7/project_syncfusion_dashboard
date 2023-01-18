import axios from '../axios.config'

export const loginAPI = async (data) => {
    const url = "/login";
  
    return axios.post(url, data);
  };

  export const speechToText = async (formData) => {
    const url = "/stt";
    return axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
  }

