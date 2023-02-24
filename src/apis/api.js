import axios from '../axios.config'

export const loginAPI = async (data) => {
    const url = "/login";
    return axios.post(url, data);
  };

export const registerAPI = async (data) => {
  const url = "/register";
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


export const logout = async (data) => {
  const url = "/logout";
  return axios.post(url, JSON.stringify({'token':data}),{
    headers: {
      // Overwrite Axios's automatically set Content-Type
      'Content-Type': 'application/json'
    }
  }).then(
    response => {

    }
  );
}

axios.interceptors.response.use(response => {
  return response;
}, error => {
 if (error.response.status === 401) {
  //place your reentry code
  console.log('intercept 401')
 }
 return error;
});

export const checkValidToken = async (data) => {
  const url = "/check_token";
  return axios.post(url, data)
};

export const getListAudio = async (data) => {
  const url = "/get_list";
  return axios.post(url, data)
};