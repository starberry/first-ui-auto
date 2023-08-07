import React from "react"
import { graphql } from 'gatsby'
import loadable from "@loadable/component"
import HeaderTwo from "../components/HeaderTwo/HeaderTwo"
import "../styles/main.scss"

const BreadcrumbModule = loadable(() => import("../components/BreadcrumbModule/BreadcrumbModule"))
const FaqDesc = loadable(() => import("../components/FaqDesc/FaqDesc"))
const Footer = loadable(() => import("../components/Footer/Footer"))

const FaqPage = ({ data }) => {
    const PageData = data?.strapiPage

    return (
        <>
            <HeaderTwo headerDubai="header-dubai" />
            <div className="layout-padding-top"></div>
            <BreadcrumbModule pagename="FAQs" />
            <FaqDesc />
            <Footer popularSearch={PageData?.select_popular_search?.title} footerContact={"footercontact"} footerDubai="footer-dubai" />
        </>
    )
}

export default FaqPage

export const query = graphql`
  query ($page_id: String) {
    strapiPage(id: {eq: $page_id}) {
        ...PageFragment
        Add_Page_Modules {
            ... on STRAPI__COMPONENT_PAGE_MODULES_GLOBAL_MODULE {
              ...GlobalModuleFragment
            }
            ... on STRAPI__COMPONENT_PAGE_MODULES_IMAGE_AND_CONTENT {
              ...ImageAndContentFragment
            }
            ... on STRAPI__COMPONENT_PAGE_MODULES_TEXT_MODULE {
              ...TextModuleFragment
            }
        }
    }
    
    strapiSiteConfig {
      twitter_link
      instagram_link
      linkedin_link
      facebook_link
      mobile_device_phone
    }
  }
`