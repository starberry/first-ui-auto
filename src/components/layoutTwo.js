/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import loadable from "@loadable/component"
import HeaderTwo from "./HeaderTwo/HeaderTwo";
// import Footer from "./Footer/Footer";
import "../styles/main.scss";

const Footer = loadable(() => import("./Footer/Footer"));
 
 const LayoutTwo = ({ children, popularSearch, tag, footerContact, customClass }) => {

   return (
     <div className={customClass}>
      <HeaderTwo tag={tag} />
        <main>{children}</main>
      <Footer popularSearch={popularSearch} footerContact={footerContact}/>
     </div>
   )
 }
 
 export default LayoutTwo