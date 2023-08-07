import React from "react";
import { graphql } from 'gatsby'
import loadable from "@loadable/component";
import { Container, Row, Col } from "react-bootstrap";
import ScrollAnimation from 'react-animate-on-scroll';
import LayoutTwo from "../components/layoutTwo";
import SEO from "../components/seo"
const BreadcrumbModule = loadable(() => import("../components/BreadcrumbModule/BreadcrumbModule"));
const ContactIntro = loadable(() => import("../components/ContactIntro/ContactIntro"));
const ContactCard = loadable(() => import("../components/ContactCard/ContactCard"));
const ValuationModule = loadable(() => import("../components/ValuationModule/ValuationModule"));
const Enquire = loadable(() => import("../components/Enquire/Enquire"));

const Contact = ({ data }, props) => {
  const PageData = data?.strapiPage
  const Offices = data?.allStrapiOffice.edges
  return (
    <LayoutTwo popularSearch={PageData?.select_popular_search?.title} footerContact={"footercontact"} customClass={PageData?.custom_css_classname ? PageData?.custom_css_classname : ""}>
      <div className="layout-padding-top">
        <BreadcrumbModule pagename={PageData.title} />

        {PageData?.Add_Page_Modules?.length > 0 && PageData.Add_Page_Modules?.map((module, index) => {
          return (
            <>{module.strapi_component === "page-modules.plain-content" && index === 0 &&
              <ContactIntro {...module} pagename={PageData.title} />}
              {module.strapi_component === "page-modules.global-module" && module.select_module === "offices" && <div className="grey-bg">

                <Container>
                  <Row>
                    {Offices && Offices.map(({ node }, index) => {
                      return (
                        <Col md={6}>
                          <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={index * 100} offset={10}>
                            <ContactCard {...node} />
                          </ScrollAnimation>
                        </Col>
                      )
                    })}
                  </Row>
                </Container>
              </div>}
              {module.strapi_component === "page-modules.image-and-content" && !module.background_color_transparent && <ValuationModule {...module} id={PageData.strapi_id} imagetransforms={PageData.imagetransforms} />}
            </>
          )
        })}
      </div>

      <div className="d-md-none">
        <Enquire
          tag=""
        />
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

export default Contact

export const query = graphql`
query ($page_id: String) {
    strapiPage(id: {eq: $page_id}) {
        ...PageFragment
        Add_Page_Modules {
            ... on STRAPI__COMPONENT_PAGE_MODULES_GLOBAL_MODULE {
              ...GlobalModuleFragment
            }
            ... on STRAPI__COMPONENT_PAGE_MODULES_PLAIN_CONTENT {
              ...PlainContentFragment
            }
            ... on STRAPI__COMPONENT_PAGE_MODULES_IMAGE_AND_CONTENT {
              ...ImageAndContentFragment
            }
        }
    }

    allStrapiOffice(filter: {publish: {eq: true}}) {
      edges {
        node {
          title
          address
          slug
          phone
          email
          sales_email
          sales_phone
          lettings_email
          lettings_phone
          image {
            alternativeText
            url
          }
          imagetransforms {
            image_Transforms
          }
          strapi_id
        }
      }
    }
  }
`