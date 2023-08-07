/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
const { SEOModule } = require("@starberry/gatsby-theme-utils/Modules/SEOModule")
const { useLocation } = require("@reach/router")


const  Seo = ({ description, title, children }) =>  {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            env
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title

  let robots = "all"
  if(site.siteMetadata?.env !== "production"){
    //robots = "none"
  }
  
  var { pathname } = useLocation()

  if (pathname == "/home/" || pathname == "/home") pathname = "/"

  var currentUrl = ""
  currentUrl = process.env.GATSBY_SITE_URL + pathname

  // check trailing slash
  if (!currentUrl.endsWith("/")) currentUrl = currentUrl + "/"

  // remove page- from url
  if (currentUrl.includes("page-")) {
    currentUrl = currentUrl
      .split("/")
      .filter(path => !path.includes("page-"))
      .join("/")
  }

  //remove multiple slashes
  currentUrl = currentUrl.replace(/([^:]\/)\/+/g, "$1")

  //set lowercase url
  currentUrl = currentUrl.toLowerCase()

  return (
    <>
    <SEOModule 
    title = {defaultTitle ? `${title} | ${defaultTitle}` : title} 
    robots = {robots} 
    description={metaDescription} 
    OG_title = {title}
    OG_Description = {metaDescription}
    OG_type = "website"
    twitter_card = "summary"
    twitter_creator = {site.siteMetadata?.author || ``} 
    twitter_title = {title}
    twitter_desc = {metaDescription}
    >
    {children}
    <link rel="canonical" href={currentUrl} />
    </SEOModule>
      {/* <title>{defaultTitle ? `${title} | ${defaultTitle}` : title}</title>
      <meta name="robots" content={robots}></meta>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={site.siteMetadata?.author || ``} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      {children} */}
    </>
  )
}

export default Seo
