import React from "react"
import LogoImg from "../images/logo.svg";

export const SEOSEARCHRESULTS = ({ title, description, image, url, children }) => {
  let robots = "all"
  //if(site.siteMetadata?.env !== "production"){
    //robots = "none"
  //}
  image = LogoImg
  url = process.env.GATSBY_SITE_URL + url

  // check trailing slash
  if (!url.endsWith("/")) url = url + "/"

  // remove page- from url
  if (url.includes("page-")) {
    url = url
      .split("/")
      .filter(path => !path.includes("page-"))
      .join("/")
  }

  //remove multiple slashes
  url = url.replace(/([^:]\/)\/+/g, "$1")

  //set lowercase url
  url = url.toLowerCase()

  return (
    <>
      <title>{title}</title>
      <meta name="robots" content={robots}></meta>
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <meta name="og:type" content={`website`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="og:title" content={title} />
      <meta name="og:url" content={url} />
      <meta name="twitter:url" content={url} />
      <meta name="og:description" content={description} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {/* <meta name="twitter:creator" content={twitterUsername} /> */}
      <link rel="canonical" href={url} />
      {children}
    </>
  )
}