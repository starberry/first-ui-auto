import React from "react";
import { graphql } from 'gatsby'
import loadable from "@loadable/component";
import Layout from "../components/layout";
import SEO from "../components/seo"
import Banner from "../components/Banner/Banner";
import { PageLinks } from "../common/site/page-static-links";
const IntroModule = loadable(() => import("../components/IntroModule/IntroModule"));
const InnerIntroModule = loadable(() => import("../components/InnerIntroModule/InnerIntroModule"));
const TileBlock = loadable(() => import("../components/TileBlock/TileBlock"));
const FeaturedProperties = loadable(() => import("../components/FeaturedProperties/FeaturedProperties"));
const FeaturedPropertiesLet = loadable(() => import("../components/FeaturedProperties/FeaturedPropertiesLet"));
const ReviewsSlider = loadable(() => import("../components/ReviewsSlider/ReviewsSlider"));
const ValuationModule = loadable(() => import("../components/ValuationModule/ValuationModule"));
const Enquire = loadable(() => import("../components/Enquire/Enquire"));

const LandingPageTemplate = ({ data }, props) => {
  const PageData = data?.strapiPage
  return (
    <Layout popularSearch={PageData?.select_popular_search?.title} footerContact={"footercontact"} customClass={PageData?.custom_css_classname ? PageData?.custom_css_classname : ""}>
      <Banner tag="landing" title={PageData.title} {...PageData.banner} id={PageData.strapi_id} imagetransforms={PageData.imagetransforms?.banner_section_banner_image_Transforms} />

      {PageData?.Add_Page_Modules?.length > 0 && PageData.Add_Page_Modules?.map((module, index) => {
        return (
          <>
            {module.strapi_component === "page-modules.text-module" && module.layout === "default" && <InnerIntroModule tag="landing" {...module} layout={PageData.layout} />}
            {module.strapi_component === "page-modules.text-module" && module.layout === "content_with_right_tiles" && <IntroModule tag="landing" {...module} id={PageData.strapi_id} layout={PageData.layout} imagetransforms={PageData.imagetransforms} />}
            {module.strapi_component === "page-modules.global-module" && module.select_module === "featured_properties_sales" && <FeaturedProperties />}
            {module.strapi_component === "page-modules.global-module" && module.select_module === "featured_properties_lettings" && <FeaturedPropertiesLet />}
            {module.strapi_component === "page-modules.global-module" && module.select_module === "google_reviews_slider" && <ReviewsSlider />}
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
  var about_path = '/' + PageLinks.about + '/'
  var schema = false
  if (about_path === (typeof window !== 'undefined' ? window.location.pathname : '')) {
    schema = true
  }
  var ldJson = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "url": process.env.GATSBY_SITE_URL + '/' + PageLinks.about + '/',
    "name": process.env.GATSBY_SITE_NAME,
    "image": PageData.banner?.image?.url,
    "logo": process.env.GATSBY_SITE_URL + `/images/logo.png`
  };

  return (
    <SEO title={PageData?.seo?.metaTitle ? PageData?.seo?.metaTitle : PageData?.title} description={PageData?.seo?.metaDescription ? PageData?.seo?.metaDescription : PageData?.title}>
      {schema &&
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
        />
      }
    </SEO>
  )
}

export default LandingPageTemplate


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
  }
`