import React from "react";
import { graphql } from 'gatsby'
import loadable from "@loadable/component";
import LayoutTwo from "../components/layoutTwo";
import { PageLinks } from "../common/site/page-static-links";
import Seo from "../components/seo"
const BreadcrumbModule = loadable(() => import("../components/BreadcrumbModule/BreadcrumbModule"));
const Banner = loadable(() => import("../components/Banner/AreaGuideBanner"));
const AreaGuideDetailDesc = loadable(() => import("../components/AreaGuideDetailDesc/AreaGuideDetailDesc"));
const PropertyDetailsMap = loadable(() => import("../components/PropertyDetailsMap/PropertyDetailsMap"));
const AreaGuideProperties = loadable(() => import("../components/FeaturedProperties/AreaGuideProperties"));
const ValuationModule = loadable(() => import("../components/ValuationModule/ValuationModuleGlobal"));

const AreaGuideDetails = ({ data }, props) => {
    const PageData = data?.strapiAreaGuide

    let breadcrumData;

    if (PageLinks?.areaguide_parent_label) {
        breadcrumData = { parentname: PageLinks.areaguide_parent_label, parent: PageLinks.areaguide_parent, subparentname: PageLinks.areaguide_label, subparent: PageLinks.areaguide, pagename: PageData.title }
    } else {
        breadcrumData = { parentname: PageLinks.areaguide_label, parent: PageLinks.areaguide, pagename: PageData.title }
    }

    return (
        <LayoutTwo popularSearch="Generic pages">
            <div className="layout-padding-top">
                <BreadcrumbModule  {...breadcrumData} />
                <Banner tag="landing" title={PageData.title} banner_title={`${PageData.title} Area Guide`} image={PageData.banner_image} banner_content={PageData.banner_content} id={PageData.strapi_id} imagetransforms={PageData.imagetransforms?.banner_section_banner_image_Transforms} page="areaguide" />


                <AreaGuideDetailDesc {...PageData} />

                {PageData.latitude && PageData.longitude && <PropertyDetailsMap
                    lat={PageData.latitude}
                    lng={PageData.longitude}
                />}

                <AreaGuideProperties tag="areaguide-properties" areaname={PageData.title}/>

                <ValuationModule />
            </div>
        </LayoutTwo>
    )
}

export const Head = ({ data }) => {
    const PageData = data?.strapiAreaGuide  
    return (
        <Seo title={PageData.title} description={`Know more about ${PageData.title} here. Contact one of our estate agents for assistance in finding the right property for you in ${PageData.title}.`} />
    )
}

export default AreaGuideDetails

export const query = graphql`
query ($page_id: Int) {
    strapiAreaGuide(strapi_id: {eq: $page_id}) {
        ...AreaGuideFragment
        banner_content {
            data {
            banner_content
            }
        }
        banner_image {
          alternativeText
          url
        }
        latitude
        longitude
        add_content {
            ... on STRAPI__COMPONENT_PAGE_MODULES_PLAIN_CONTENT {
                ...PlainContentFragment
            }
            ... on STRAPI__COMPONENT_PAGE_MODULES_IMAGE {
                ...ImageFragment
            }
            ... on STRAPI__COMPONENT_PAGE_MODULES_ACCORDION {
                ...AccordionFragment
            }
        }
    }
    
  }
`