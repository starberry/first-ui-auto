/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */
import * as React from "react"

export const onRenderBody = ({ setHtmlAttributes, setHeadComponents, setPostBodyComponents }) => {
  setHtmlAttributes({ lang: `en` })
  // setPostBodyComponents([
  //   <>
  //   <script src="https://apps.elfsight.com/p/platform.js" type="text/javascript" />
  //   </>
  // ])
  // setHeadComponents([
  //   <link
  //     rel="preload"
  //     href="/src/fonts/albert-sans-regular.woff2"
  //     as="font"
  //     type="font/woff2"
  //     crossOrigin="anonymous"
  //     key="albertsansregular"
  //   />,
  //   <link
  //     rel="preload"
  //     href="/src/fonts/albert-sans-600.woff2"
  //     as="font"
  //     type="font/woff2"
  //     crossOrigin="anonymous"
  //     key="albertsanssemibold"
  //   />,
  //   <link
  //     rel="preload"
  //     href="/src/fonts/dm-serif-display-regular.woff2"
  //     as="font"
  //     type="font/woff2"
  //     crossOrigin="anonymous"
  //     key="dmserifdisplayregular"
  //   />,
  // ])
}
