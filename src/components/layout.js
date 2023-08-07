/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

 import * as React from "react"
 import loadable from "@loadable/component";
//import { useStaticQuery, graphql } from "gatsby"
 
//  import Header from "./header"
//  import "./layout.css"
import "../styles/main.scss";
import "animate.css/animate.min.css";
import Header from "./Header/Header";
// const Header = loadable(() => import("./Header/Header"));
const Footer = loadable(() => import("./Footer/Footer"));

 const Layout = ({ children, popularSearch, footerContact, customClass }) => {
  //  const data = useStaticQuery(graphql`
  //    query SiteTitleQuery {
  //      site {
  //        siteMetadata {
  //          title
  //        }
  //      }
  //    }
  //  `)
 
   return (
     <div className={customClass}>
      <Header />
        <main>{children}</main>
      <Footer popularSearch={popularSearch} footerContact={footerContact} />
     </div>
   )
 }
 
 export default Layout