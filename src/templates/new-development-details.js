import React from "react";
import { graphql } from 'gatsby'
import loadable from "@loadable/component"
import LayoutTwo from "../components/layoutTwo";
import sitelogoimage from "../images/logo.png";
import Seo from '../components/seo';
import { PageLinks } from "../common/site/page-static-links";

const BreadcrumbModule = loadable(() => import("../components/BreadcrumbModule/BreadcrumbModule"));
const NewHomesDetailsBanner = loadable(() => import("../components/NewHomesDetailsBanner/NewHomesDetailsBanner"));
const PropertyNavSticky = loadable(() => import("../components/PropertyNavSticky/PropertyNavSticky"));
const NewHomesDetailsDesc = loadable(() => import("../components/NewHomesDetailsDesc/NewHomesDetailsDesc"));
const NewHomesDetailsAvailability = loadable(() => import("../components/NewHomesDetailsAvailability/NewHomesDetailsAvailability"));
const PropertyDetailsMap = loadable(() => import("../components/PropertyDetailsMap/PropertyDetailsMap"));
const NewHomesDetailsProperties = loadable(() => import("../components/NewHomesDetailsMoreProperties/NewHomesDetailsProperties"));
const ValuationModule = React.lazy(() => import("../components/ValuationModule/ValuationModuleGlobal"));
const Enquire = loadable(() => import("../components/Enquire/Enquire"));

const PropertyDetail = ({ data, children }) => {

    var imagename = "new-developments.images.details";

    let processedImages = JSON.stringify({});
    if (data?.strapiNewDevelopments.imagetransforms?.images_Transforms) {
        processedImages = data?.strapiNewDevelopments?.imagetransforms?.images_Transforms;
    }

    let propertyDetailImg = [];
    //if((data?.strapiNewDevelopments?.images).length > 0) {
    for (let i = 0; i < data?.strapiNewDevelopments?.images?.strapi_json_value.length; i++) {
        if (data.strapiNewDevelopments?.images?.strapi_json_value[i].url) {
            propertyDetailImg.push(data.strapiNewDevelopments?.images?.strapi_json_value[i].url);
        }
    }
    //}
    // we could server resized version instead of original one to avoid load time
    //features = []
    //if(data.strapiNewDevelopments?.accommodation_summary?.strapi_json_value)
    let features = []//data.strapiNewDevelopments?.accommodation_summary?.strapi_json_value;

    const url = typeof window !== 'undefined' ? window.location.href : ''

    return (
        <LayoutTwo>
            <div className="layout-padding-top">
                <BreadcrumbModule parentname={PageLinks.new_developments_label} parent={PageLinks.new_developments} pagename={data.strapiNewDevelopments?.display_address} />

                <NewHomesDetailsBanner {...data.strapiNewDevelopments} propImg={propertyDetailImg} processedImages={processedImages} strapi_id={data.strapiNewDevelopments.strapi_id} imagename={imagename} crm_id={data?.strapiNewDevelopments?.crm_id} prop_id={data?.strapiNewDevelopments?.strapi_id} />

                <PropertyNavSticky  {...data.strapiNewDevelopments} propImg={propertyDetailImg} processedImages={processedImages} imagename={imagename} />

                <NewHomesDetailsDesc content={data.strapiNewDevelopments?.additional_description?.data?.additional_description} price={data.strapiNewDevelopments?.price} max_price={data.strapiNewDevelopments?.max_price} price_qualifier={data.strapiNewDevelopments?.price_qualifier} />

                {/* <NewHomesDetailsAvailability /> */}

                {data.strapiNewDevelopments?.latitude && data.strapiNewDevelopments?.longitude && <PropertyDetailsMap
                    lat={data.strapiNewDevelopments.latitude}
                    lng={data.strapiNewDevelopments.longitude}
                />}
                {data.allStrapiNewDevelopments.edges.length > 0 && <NewHomesDetailsProperties properties={data.allStrapiNewDevelopments.edges} />}

                <ValuationModule />
            </div>
            <div className="d-md-none">
                <Enquire tag="property-details" strapi_id={data.strapiNewDevelopments.strapi_id} crm_id={data.strapiNewDevelopments.crm_id} display_address={data.strapiNewDevelopments.display_address} pageurl={url} propImg={propertyDetailImg} />
            </div>
        </LayoutTwo>
    )
}

export const query = graphql`
  query ($strapi_id: Int) {
    strapiNewDevelopments(strapi_id: {eq: $strapi_id}) {
        title
        crm_id
        strapi_id
        display_address
        latitude
        longitude
        price
        max_price
        additional_description {
        data {
            additional_description
        }
        }
        images {
            strapi_json_value {
                srcUrl
                url
            }
        }
        imagetransforms {
            images_Transforms
        }
        description {
            data {
              description
            }
        }
        building {
            strapi_json_value
        }
        bedroom
        price_qualifier
        floorplan {
            strapi_json_value {
              srcUrl
            }
        }
        strapi_id
    }
    
    allStrapiNewDevelopments(filter: {publish: {eq: true}, strapi_id: {ne: $strapi_id}}, limit: 6) {
        edges {
            node {
                slug
                strapi_id
                title
                display_address
                price
                max_price
                price_qualifier
                imagetransforms {
                  images_Transforms
                }
                images {
                  strapi_json_value {
                    srcUrl
                    url
                  }
                }
            }
        }
    }
  }
`

export const Head = (props) => {
    //seo title, h1 and desc prepare, this can send to utilis function later
    let desc_meta_ptype = props.data.strapiNewDevelopments?.building?.strapi_json_value.join(" and ")
    let desc_meta_seachtype = `for sale`
    if (props.data.strapiNewDevelopments?.building == "lettings") {
        desc_meta_seachtype = `to rent`
    }
    let desc_meta_beds = props.data.strapiNewDevelopments?.bedroom
    let desc_meta_address = props.data.strapiNewDevelopments?.display_address
    let desc_meta_price = `£` + new Intl.NumberFormat('en-UK').format(props.data.strapiNewDevelopments?.price)

    let pagetitle = `${desc_meta_ptype} ${desc_meta_seachtype} with ${desc_meta_beds} bedrooms in ${desc_meta_address} at ${desc_meta_price}`

    let pagemetadesc = `Know the details of ${desc_meta_ptype} ${desc_meta_seachtype} with ${desc_meta_beds} bedrooms in ${desc_meta_address} at ${desc_meta_price}. Book a viewing with ${process.env.GATSBY_SITE_NAME} to get assistance in finding the right ${desc_meta_ptype} for you.`

    let pageUrl = process.env.GATSBY_SITE_URL + (props?.location?.pathname).replace(/\/?$/, '/')
    let myimgtransforms = ''
    if (props.data.strapiNewDevelopments?.imagetransforms?.images_Transforms) {
        myimgtransforms = JSON.parse(props.data.strapiNewDevelopments?.imagetransforms?.images_Transforms);
    }
    let pageImg = sitelogoimage;
    if (myimgtransforms.length > 0 && Object.keys(myimgtransforms).length > 0) {
        let mymetaimg = Object.values(myimgtransforms);
        let pageImg_filt = []
        for (const myimgtransform in myimgtransforms) {
            if (typeof myimgtransforms[myimgtransform]['webp'] !== "undefined") {
                pageImg_filt = Object.values(myimgtransforms[myimgtransform]['webp']);
                break;
            }
        }
        if (pageImg_filt.length > 0)
            pageImg = pageImg_filt[0]
    }

    return (
        <Seo title={pagetitle} description={pagemetadesc}>
            <meta name="image" content={pageImg} />
            <meta name="twitter:image" content={pageImg} />
            <meta name="og:url" content={pageUrl} />
            <meta name="twitter:url" content={pageUrl} />
            <link rel="canonical" href={pageUrl} />
        </Seo>
    )
}

export default PropertyDetail