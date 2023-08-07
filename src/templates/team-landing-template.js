import React from "react";
import { graphql } from 'gatsby'
import loadable from "@loadable/component";
import LayoutTwo from "../components/layoutTwo";
import SEO from "../components/seo"
const BreadcrumbModule = loadable(() => import("../components/BreadcrumbModule/BreadcrumbModule"));
const ListingIntroModule = loadable(() => import("../components/ListingIntroModule/ListingIntroModule"));
const TeamsTab = loadable(() => import("../components/TeamsTab/TeamsTab"));
const ContactIntro = loadable(() => import("../components/ContactIntro/ContactIntro"));
const InnerPagination = loadable(() => import("../components/InnerPagination/InnerPagination"));
const ValuationModule = loadable(() => import("../components/ValuationModule/ValuationModule"));

const Teams = ({ data }, props) => {
  const PageData = data?.strapiPage
  const team = data?.allStrapiTeam.edges
  return (
    <LayoutTwo popularSearch={PageData?.select_popular_search?.title}>
      <div className="layout-padding-top">
        <BreadcrumbModule parentname={PageData.choose_menu[0].strapi_parent.title} parent={PageData.choose_menu[0].strapi_parent.slug} pagename={PageData.title} />
        <div className="grey-bg">
          {PageData?.Add_Page_Modules?.length > 0 && PageData.Add_Page_Modules?.map((module, index) => {
            return (
              <>{module.strapi_component === "page-modules.plain-content" && index === 0 &&
                <ListingIntroModule content={module.content} headingTitle={module.title ? module.title : PageData.title} />}
                {module.strapi_component === "page-modules.global-module" && module.select_module === "team" && <>
                  <TeamsTab data={team} />
                  <InnerPagination />
                </>}
                {module.strapi_component === "page-modules.image-and-content" && !module.background_color_transparent && <ValuationModule {...module} id={PageData.strapi_id} imagetransforms={PageData.imagetransforms} />}
              </>
            )
          })}


        </div>
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

export default Teams


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
          ... on STRAPI__COMPONENT_PAGE_MODULES_PLAIN_CONTENT {
            ...PlainContentFragment
          }
        }
    }
    allStrapiTeam(sort: {fields: rank, order: ASC}, filter: {publish: {eq: true}}) {
        edges {
          node {
            ...TeamFragment
            slug
            category {
              strapi_json_value
            }
          }
        }
    }
  }
`