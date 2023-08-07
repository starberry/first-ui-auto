import axios from 'axios';
import { isEmpty } from 'lodash';

const token = process.env.GATSBY_STRAPI_FORM_TOKEN;

export const ApiRequest = (request, cb) => {
  if (request.method === "GET") {
    getRequest(request, cb);
  } else if (request.method === "POST") {
    postRequest(request, cb);
  } else if (request.method === "PUT") {
    putRequest(request, cb);
  }
}

export const getRequest = (request, cb) => {
  var headers = {Authorization: `Bearer ${token}`}
  if (!isEmpty(request.header)) {
    headers = request.header;
  }
  axios.get(request.url, {
    headers: headers,
    params: request.body
  })
    .then(function (response) {
      if (response.status === 200) {
        cb(response.data);
      }
    })
    .catch(function (error) {
      console.log(error);
    })
}

export const postRequest = (request, cb) => {
  var reqHeaders = {}
  if (!isEmpty(request.header)) {
    reqHeaders = {
      headers: request.header,
      mode: 'no-cors',
    }
  }
  axios.post(request.url, request.body, reqHeaders)
    .then(function (response) {
      if (response.status === 200 || response.status === 201) {
        cb(response.data);
      }
    })
    .catch(function (error) {
      console.log(error);
    })
}

export const putRequest = (request, cb) => {
  var reqHeaders = {}
  if (!isEmpty(request.header)) {
    reqHeaders = {
      headers: request.header,
      mode: 'no-cors',
    }
  }
  axios.put(request.url, request.body, reqHeaders)
    .then(function (response) {
      if (response.status === 200 || response.status === 201) {
        cb(response.data);
      }
    })
    .catch(function (error) {
      console.log(error);
    })
}