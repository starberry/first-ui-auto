import React from "react";
import { graphql } from 'gatsby'
import loadable from "@loadable/component";
import LayoutTwo from "../components/layoutTwo";
import Seo from "../components/seo"
import { PageLinks } from "../common/site/page-static-links";
import OfficeDetailsBanner from "../components/OfficeDetailsBanner/OfficeDetailsBanner"
const OfficeDetailsDescription = loadable(() => import("../components/OfficeDetailsDescription/OfficeDetailsDescription"));
const OfficeDetailsSlider = loadable(() => import("../components/OfficeDetailsSlider/OfficeDetailsSlider"));
const ValuationModule = loadable(() => import("../components/ValuationModule/ValuationModuleGlobal"));

const OfficeDetails = ({ data }, props) => {
  const PageData = data?.strapiOffice

  return (
    <LayoutTwo popularSearch="Generic pages">
      <div className="layout-padding-top">
        <OfficeDetailsBanner {...PageData} />

        <OfficeDetailsDescription {...PageData} />

        <OfficeDetailsSlider team_intro={PageData.team_intro} team={PageData.select_team} />

        <ValuationModule />
      </div>
    </LayoutTwo>
  )
}

export const Head = ({ data }) => {
  const PageData = data?.strapiOffice
  const metaDescription = `Our Estate agents in ${PageData.title} offer the best property advice in Selling, Buying, Letting and Renting. Contact us to get assistance.`

  var ldJson = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "url": process.env.GATSBY_SITE_URL + `/` + PageLinks.contact,
    "name": process.env.GATSBY_SITE_NAME + ` in ` + PageData?.title,
    "alternateName": process.env.GATSBY_SITE_NAME,
    "logo": process.env.GATSBY_SITE_URL + `/images/logo.png`,
    "description": PageData?.title,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": PageData?.address,
      "addressLocality": PageData?.address,
      "addressRegion": PageData?.address,
      "addressCountry": PageData?.address
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": PageData?.latitude,
      "longitude": PageData?.longitude
    },
    "email": PageData?.email,
    "telephone": PageData?.phone,
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Sales"
    }
  };

  return (
    <Seo title={PageData.title} description={metaDescription}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
      />
    </Seo>
  )
}

export default OfficeDetails


export const query = graphql`
query ($page_id: Int) {
    strapiOffice(strapi_id: {eq: $page_id}) {
        email
        strapi_id
        phone
        sales_phone
        sales_email
        lettings_phone
        lettings_email
        title
        address
        imagetransforms {
          image_Transforms
        }
        image {
          alternativeText
          url
        }
        about {
            data {
                about
            }
        }
        latitude
        longitude
        opening_hours {
            data {
                opening_hours
            }
        }
        team_intro {
            data {
                team_intro
            }
        }
        select_team {
            slug
            strapi_id
            image {
                alternativeText
                url
            }
            imagetransforms {
                image_Transforms
            }
            designation
            email
            title
            phone
        }
    }
  }
`