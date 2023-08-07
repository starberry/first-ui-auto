import React from "react"
import { graphql } from 'gatsby'
import loadable from "@loadable/component"
import Header from "../components/Header/Header"
import HeaderTwo from "../components/HeaderTwo/HeaderTwo"
import "../styles/main.scss";

import BannerImg from "../images/areaguide_details_banner_img.png"

const FilterSearchDubai = loadable(() => import("../components/FilterSearchDubai/FilterSearchDubai"))
const Footer = loadable(() => import("../components/Footer/Footer"))

const TestPage = ({ data }) => {
    const PageData = data?.strapiPage

    return (
        <>
            <Header headerDubai="header-dubai" />
            {/* <HeaderTwo headerDubai="header-dubai" /> */}
            <img src={BannerImg} className="img-fluid" />
            <div className="layout-padding-top"></div>
            
            <FilterSearchDubai />

            <Footer popularSearch={PageData?.select_popular_search?.title} footerContact={"footercontact"} footerDubai="footer-dubai" />
        </>
    )
}

export default TestPage

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
