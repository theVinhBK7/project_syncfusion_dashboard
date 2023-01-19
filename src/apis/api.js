import axios from '../axios.config'
import { redirect } from 'react-router-dom';

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

axios.interceptors.response.use(response => {
  return response;
}, error => {
 if (error.response.status === 401) {
  //place your reentry code
  redirect("/login");
 }
 return error;
});

export const checkValidToken = async (data) => {
  const url = "/check_token";
  redirect("/login");

  await axios.post(url, data).then(
    response => {
    }
  )

};