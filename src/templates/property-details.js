import React from "react";
import { graphql } from 'gatsby'
import loadable from "@loadable/component"
import LayoutTwo from "../components/layoutTwo";
import sitelogoimage from "../images/logo.png";
// import propertyDetailsimg2 from "../images/property_img_1.png";
import Seo from '../components/seo';

import PropertyBanner from "../components/PropertyBanner/PropertyBanner";
import PropertyNavSticky from "../components/PropertyNavSticky/PropertyNavSticky";
import PropertyDescription from "../components/PropertyDescription/PropertyDescription";
import Enquire from "../components/Enquire/Enquire";
const FeaturedProperties = loadable(() => import("../components/FeaturedProperties/SimilarProperties"));
const ValuationModule = loadable(() => import("../components/ValuationModule/ValuationModuleGlobal"));

const PropertyDetail = ({ data, children }) => {

    var imagename = "property.images.details";

    let processedImages = JSON.stringify({});
    if (data?.strapiProperty.imagetransforms?.images_Transforms) {
        processedImages = data?.strapiProperty?.imagetransforms?.images_Transforms;
    }

    let propertyDetailImg = [];
    //if((data?.strapiProperty?.images).length > 0) {
    for (let i = 0; i < data?.strapiProperty?.images?.strapi_json_value.length; i++) {
        if (data.strapiProperty?.images?.strapi_json_value[i].url) {
            propertyDetailImg.push(data.strapiProperty?.images?.strapi_json_value[i].url);
        }
    }

    //}
    // we could server resized version instead of original one to avoid load time
    //features = []
    //if(data.strapiProperty?.accommodation_summary?.strapi_json_value)
    let features = []//data.strapiProperty?.accommodation_summary?.strapi_json_value;

    const url = typeof window !== 'undefined' ? window.location.href : ''

    return (
        <LayoutTwo footerContact={"footercontact"} tag="property-details-template">
            <div className="layout-padding-top">
                <PropertyBanner {...data.strapiProperty} propImg={propertyDetailImg} processedImages={processedImages} strapi_id={data.strapiProperty.strapi_id} imagename={imagename} crm_id={data?.strapiProperty?.crm_id} prop_id={data?.strapiProperty?.strapi_id} />

                <PropertyNavSticky  {...data.strapiProperty} propImg={propertyDetailImg} processedImages={processedImages} imagename={imagename}
                    tag="property-details-template"
                />

                <PropertyDescription propImg={propertyDetailImg} processedImages={processedImages} imagename={imagename} features={features} {...data.strapiProperty} />

                <FeaturedProperties prop_id={data?.strapiProperty?.strapi_id}
                    tag="property-details"
                />

                <ValuationModule />
            </div>
            <div className="d-md-none">
                <Enquire tag="property-details" strapi_id={data.strapiProperty.strapi_id} crm_id={data.strapiProperty.crm_id} display_address={data.strapiProperty.display_address} pageurl={url} propImg={propertyDetailImg} status={data?.strapiProperty?.status}/>
            </div>
        </LayoutTwo>
    )
}

export const query = graphql`
  query ($strapi_id: Int) {
    strapiProperty(strapi_id: {eq: $strapi_id}) {
        title
        crm_id
        strapi_id
        display_address
        latitude
        id
        floorarea_min
        status
        floorarea_type
        slug
        longitude
        long_description{
            data {
                long_description
            }
        }
        price
        description {
            data {
              description
            }
        }
        bedroom
        bathroom
        selling_info {
            tenure {
              type
            }
        }
        imagetransforms {
            images_Transforms
        }
        price_qualifier
        epc {
            strapi_json_value {
              srcUrl
            }
        }
        office_mapping
        negotiator_mapping
        strapi_id
        search_type
        images {
            strapi_json_value {
              url
              srcUrl
            }
        }
        floorplan {
            strapi_json_value {
              srcUrl
            }
        }
        building {
            strapi_json_value
        }
    }
  }
`

export const Head = (props) => {
    //seo title, h1 and desc prepare, this can send to utilis function later
    let desc_meta_ptype = props.data.strapiProperty?.building?.strapi_json_value?.length > 0 ? props.data.strapiProperty?.building?.strapi_json_value.join(" and ") : "property"

    let cap_ptype = desc_meta_ptype?.charAt(0).toUpperCase() + desc_meta_ptype?.slice(1);

    let desc_meta_seachtype = `for sale`
    if (props.data.strapiProperty?.search_type == "lettings") {
        desc_meta_seachtype = `to rent`
    }
    let desc_meta_beds = props.data.strapiProperty?.bedroom
    let desc_meta_address = props.data.strapiProperty?.display_address
    let desc_meta_price = `£` + new Intl.NumberFormat('en-UK').format(props.data.strapiProperty?.price)

    let pagetitle = `${cap_ptype} ${desc_meta_seachtype} with ${desc_meta_beds} bedrooms in ${desc_meta_address} at ${desc_meta_price}`

    let pagemetadesc = `Know the details of ${desc_meta_ptype} ${desc_meta_seachtype} with ${desc_meta_beds} bedrooms in ${desc_meta_address} at ${desc_meta_price}. Book a viewing with ${process.env.GATSBY_SITE_NAME} to get assistance in finding the right ${desc_meta_ptype} for you.`

    let pageUrl = process.env.GATSBY_SITE_URL + (props?.location?.pathname).replace(/\/?$/, '/')
    let myimgtransforms = ''
    if (props.data.strapiProperty?.imagetransforms?.images_Transforms) {
        myimgtransforms = JSON.parse(props.data.strapiProperty?.imagetransforms?.images_Transforms);
    }
    let pageImg = sitelogoimage;
    if (myimgtransforms && Object.keys(myimgtransforms).length > 0) {
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


    var ldJson = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": props.data.strapiProperty?.slug.replace(/-/g, " "),
        "image": props.data.strapiProperty?.images?.strapi_json_value[0]?.url,
        "description": pagemetadesc,
        "brand": {
            "@type": "Organization",
            "name": process.env.GATSBY_SITE_NAME,
            "logo": process.env.GATSBY_SITE_URL + `/images/logo.png`
        },
        "offers": {
            "@type": "Offer",
            "url": pageUrl,
            "priceCurrency": "GBP",
            "price": props.data.strapiProperty?.price,
            "availability": "https://schema.org/InStock"
        }
    
    };
    return (
        <Seo title={pagetitle} description={pagemetadesc}>
            <meta name="image" content={pageImg} />
            <meta name="og:image" content={pageImg} />
            <meta name="og:image:width" content="400" />
            <meta name="og:image:height" content="300" />
            <meta name="twitter:image" content={pageImg} />
            <meta name="og:url" content={pageUrl} />
            <meta name="twitter:url" content={pageUrl} />
            <link rel="canonical" href={pageUrl} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
            />
        </Seo>
    )
}

export default PropertyDetail