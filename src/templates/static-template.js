import React from "react";
import { graphql } from 'gatsby'
import loadable from "@loadable/component";
import LayoutTwo from "../components/layoutTwo";
import SEO from "../components/seo"
const BreadcrumbModule = loadable(() => import("../components/BreadcrumbModule/BreadcrumbModule"));
const NewsDetailAccordion = loadable(() => import("../components/NewsDetailAccordion/NewsDetailAccordion"));
const TileBlock = loadable(() => import("../components/TileBlock/TileBlock"));
const ValuationModule = loadable(() => import("../components/ValuationModule/ValuationModule"));
const StaticSection = loadable(() => import("../components/StaticSection/StaticSection"));

const StaticTemplate = ({ data }, props) => {
    const PageData = data?.strapiPage
    return (
        <LayoutTwo popularSearch={PageData?.select_popular_search?.title}>

            <div className="layout-padding-top">
                <BreadcrumbModule parentname={PageData.choose_menu[0]?.strapi_parent?.title} parent={PageData.choose_menu[0]?.strapi_parent?.slug} pagename={PageData.title} />

                {PageData?.Add_Page_Modules?.length > 0 && PageData.Add_Page_Modules?.map((module, index) => {
                    return (
                        <> {module.strapi_component === "page-modules.plain-content" && <StaticSection {...module} pagename={PageData.title} />}
                            {module.strapi_component === "page-modules.image-and-content" && module.background_color_transparent && <TileBlock {...module} id={PageData.strapi_id} imagetransforms={PageData.imagetransforms} />}
                            {module.strapi_component === "page-modules.image-and-content" && !module.background_color_transparent && <ValuationModule {...module} />}
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

export default StaticTemplate

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
  }
`