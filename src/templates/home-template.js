import React, { useEffect, useState } from "react";
import { graphql } from 'gatsby'
import loadable from "@loadable/component";
import Layout from "../components/layout";
import SEO from "../components/seo"
import Banner from "../components/Banner/HomeBanner";
const IntroModule = loadable(() => import("../components/IntroModule/IntroModule"));
const InnerIntroModule = loadable(() => import("../components/InnerIntroModule/InnerIntroModule"));
const TileBlock = loadable(() => import("../components/TileBlock/TileBlock"));
const FeaturedProperties = loadable(() => import("../components/FeaturedProperties/FeaturedProperties"));
const ReviewsSlider = loadable(() => import("../components/ReviewsSlider/ReviewsSlider"));
const ValuationModule = loadable(() => import("../components/ValuationModule/ValuationModule"));
const Enquire = loadable(() => import("../components/Enquire/Enquire"));

const HomePageTemplate = ({ data }, props) => {
  const PageData = data?.strapiPage
  const siteData = data?.strapiSiteConfig

  const [renderComponent, setRenderComponent] = useState(false);
  useEffect(() => {
    window.addEventListener("mousemove", () => {
      if (renderComponent === false) {
        setRenderComponent(true)
      }
    })
    window.addEventListener("touchmove", () => {
      if (renderComponent === false) {
        setRenderComponent(true)
      }
    })
    window.addEventListener("keypress", () => {
      if (renderComponent === false) {
        setRenderComponent(true)
      }
    })

  }, [])
  const page_url = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <Layout popularSearch={PageData?.select_popular_search?.title} footerContact={"footercontact"} customClass={PageData?.custom_css_classname ? PageData?.custom_css_classname : ""}>
      <Banner title={PageData.title} {...PageData.banner} id={PageData.strapi_id} imagetransforms={PageData.imagetransforms?.banner_section_banner_image_Transforms} />

      {PageData?.Add_Page_Modules?.length > 0 && PageData.Add_Page_Modules?.map((module, index) => {
        return (
          <>
            {module.strapi_component === "page-modules.text-module" && module.layout === "default" && <InnerIntroModule tag="landing" {...module} layout={PageData.layout} />}
            {module.strapi_component === "page-modules.text-module" && module.layout === "content_with_right_tiles" && <IntroModule tag="landing" {...module} id={PageData.strapi_id} layout={PageData.layout} imagetransforms={PageData.imagetransforms} />}
            {module.strapi_component === "page-modules.global-module" && (module.select_module === "featured_properties_sales" || module.select_module === "featured_properties") && renderComponent && <FeaturedProperties />}
            {module.strapi_component === "page-modules.global-module" && module.select_module === "google_reviews_slider" && renderComponent && <ReviewsSlider />}
            {module.strapi_component === "page-modules.image-and-content" && module.background_color_transparent && <TileBlock {...module} id={PageData.strapi_id} imagetransforms={PageData.imagetransforms} />}
            {module.strapi_component === "page-modules.image-and-content" && !module.background_color_transparent && <ValuationModule {...module} id={PageData.strapi_id} imagetransforms={PageData.imagetransforms} />}
          </>
        )
      })}
      <div className="d-md-none">
        <Enquire />
      </div>
    </Layout>
  )
}

export const Head = ({ data }, props) => {
  const PageData = data?.strapiPage
  const siteData = data?.strapiSiteConfig

  var schemaSameAs = ''
  if (siteData?.facebook_link.length > 1) {
    schemaSameAs = siteData?.facebook_link + ','
  }
  if (siteData?.twitter_link.length > 1) {
    schemaSameAs += siteData?.twitter_link + ','
  }
  if (siteData?.instagram_link.length > 1) {
    schemaSameAs += siteData?.instagram_link + ','
  }
  if (siteData?.linkedin_link.length > 1) {
    schemaSameAs += siteData?.linkedin_link + ','
  }

  var ldJson = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "url": process.env.GATSBY_SITE_URL,
    "name": process.env.GATSBY_SITE_NAME,
    "alternateName": process.env.GATSBY_SITE_NAME,
    "logo": process.env.GATSBY_SITE_URL + `/images/logo.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": siteData?.mobile_device_phone,
      "areaServed": process.env.GATSBY_DEFAULT_AREA,
      "contactType": "Sales"
    },
    "sameAs": schemaSameAs.replace(/,\s*$/, "").split(',')
  };

  return (
    <SEO title={PageData?.seo?.metaTitle ? PageData?.seo?.metaTitle : PageData?.title} description={PageData?.seo?.metaDescription ? PageData?.seo?.metaDescription : PageData?.title}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
      />
    </SEO>
  )
}

export default HomePageTemplate


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