import axios from 'axios';

const baseURL = `${process.env.GATSBY_STRAPI_SRC}`;
const token = process.env.GATSBY_STRAPI_FORM_TOKEN;

const authInstance = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
    // "Content-Type": "multipart/form-data"
  },
});


export const postFileData = async (data) => {

  const res = await authInstance.post('upload', data)
  .then((res) => {
    // Success
    if (res.statusText === 'OK') {
      return {
        success: true,
        ...res.data,
      }
    }
    return { success: false }
  })
  .catch((error) => {
    // Failed
    if (error.response) {
      return {
        success: false,
        message: error.response.data,
      }
    } else {
      // Service error
    }
  })

  return res;

}

export const postFormData = async (data) => {

  const res = await authInstance.post('/api/stb-forms/forms', data)
  .then((res) => {
    // Success
    if (res.statusText === 'OK') {
      return {
        success: true,
        ...res.data,
      }
    }
    return { success: false }
  })
  .catch((error) => {
    // Failed
    if (error.response) {
      return {
        success: false,
        message: error.response.data,
      }
    } else {
      // Service error
    }
  })

  return res;

}