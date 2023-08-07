"use strict"
import { isBrowser } from "./utility"
import ProcessRequest from "./axios.service"

const GATSBY_STRAPI_SRC = process.env.GATSBY_STRAPI_SRC,
  GATSBY_STRAPI_API_AUTH_TOKEN = process.env.GATSBY_STRAPI_API_TOKEN;

const PerformAction = (url, imageParams, method) => {
  if (!imageParams.format) {
    //Default image format jpg to source image format
    imageParams.format = isBrowser() ? (localStorage.getItem("GGFX-NOTWEBP") ? "" : "webp") : ""
  }
  return ProcessRequest({
    method: method || "get",
    //Strapi url for the application from env
    baseURL: GATSBY_STRAPI_SRC || "STRAPI_URL",
    //url: `/ggfx-core/${url}`,
    url: `/api/ggfxservercore/${url}`,
    params: imageParams,
    headers: {
      Authorization: `Bearer ${GATSBY_STRAPI_API_AUTH_TOKEN}`
    }
  })
}

export const GetUrlSet = (imageParams) => {
  return PerformAction("urlset", imageParams)
}
