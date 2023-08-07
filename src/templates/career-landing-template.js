import React from "react";
import loadable from "@loadable/component";
import { graphql } from 'gatsby'
import LayoutTwo from "../components/layoutTwo";
import SEO from "../components/seo"
const BreadcrumbModule = loadable(() => import("../components/BreadcrumbModule/BreadcrumbModule"));
const ListingIntroModule = loadable(() => import("../components/ListingIntroModule/ListingIntroModule"));
const CareersTab = loadable(() => import("../components/CareersTab/CareersTab"));
const ValuationModule = loadable(() => import("../components/ValuationModule/ValuationModule"));

const CareerLanding = ({ data }, props) => {
  const PageData = data?.strapiPage
  const Jobs = data?.allStrapiCareer.edges
  return (
    <LayoutTwo popularSearch={PageData?.select_popular_search?.title} customClass={PageData?.custom_css_classname ? PageData?.custom_css_classname : ""}>
      <div className="layout-padding-top">
      <BreadcrumbModule parentname={PageData.choose_menu[0].strapi_parent.title} parent={PageData.choose_menu[0].strapi_parent.slug} pagename={PageData.title} />

        {PageData?.Add_Page_Modules?.length > 0 && PageData.Add_Page_Modules?.map((module, index) => {
          return (
            <>
              {module.strapi_component === "page-modules.plain-content" && <ListingIntroModule headingTitle={PageData.title} content={module.content} />}
            </>
          )
        })}

        <CareersTab data={Jobs} />


        {PageData?.Add_Page_Modules?.length > 0 && PageData.Add_Page_Modules?.map((module, index) => {
          return (
            <>
              {module.strapi_component === "page-modules.image-and-content" && !module.background_color_transparent && <ValuationModule {...module} id={PageData.strapi_id} imagetransforms={PageData.imagetransforms}/>}
            </>
          )
        })}
      </div>
    </LayoutTwo>
  )
}

export const Head = ({ data }) => {
  const PageData = data?.strapiPage  
  return (
      <SEO title={PageData?.seo?.metaTitle ? PageData?.seo?.metaTitle : PageData?.title} description={PageData?.seo?.metaDescription ? PageData?.seo?.metaDescription : PageData?.title} />
  )
}

export default CareerLanding


export const query = graphql`
query ($page_id: String) {
    strapiPage(id: {eq: $page_id}) {
        ...PageFragment
        Add_Page_Modules {
            ... on STRAPI__COMPONENT_PAGE_MODULES_PLAIN_CONTENT {
              ...PlainContentFragment
            }
            ... on STRAPI__COMPONENT_PAGE_MODULES_IMAGE_AND_CONTENT {
              ...ImageAndContentFragment
            }
        }
    }
    
    allStrapiCareer(filter: {publish: {eq: true}}) {
        edges {
            node {
              ...CareerFragment
            }
        }
    }
  }
`