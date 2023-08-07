import React from "react"
import { graphql } from 'gatsby'
import SEO from "../components/seo"
import loadable from "@loadable/component";

import Layout from "../components/layoutTwo"
import FormLayout from "../components/FormLayout/FormLayout"
import ContactFormFields from "../../static/forms/contact_form.json";
import ValuationFormFields from "../../static/forms/instant_valuation_form.json";
import HomeVisitValuationFormFields from "../../static/forms/homevisit_valuation_form.json";
import FourTierExceptionalFormFields from "../../static/forms/four_tier_exceptional_form.json";
import ReportRepairFormFields from "../forms/report_repair_form.json";

const BreadcrumbModule = loadable(() => import("../components/BreadcrumbModule/BreadcrumbModule"));
const ValuationModule = loadable(() => import("../components/ValuationModule/ValuationModule"));
const ContactIntro = loadable(() => import("../components/ContactIntro/ContactIntro"));
const EnquiryIntro = loadable(() => import("../components/EnquiryIntro/EnquiryIntro"));
const DefaultForm = loadable(() => import("../components/forms/default-form-layout"))

const FormTemplate = (props) => {
    const { data } = props
    const PageData = data?.strapiPage
    const to_email_id = props?.location?.state?.data?.to_email_id


    return (
        <Layout>
            <div className="layout-padding-top">
                <BreadcrumbModule parentname={PageData.choose_menu[0]?.strapi_parent?.title} parent={PageData.choose_menu[0]?.strapi_parent?.slug} pagename={PageData.title} />

                {PageData?.Add_Page_Modules?.length > 0 && PageData.Add_Page_Modules?.map((module, index) => {
                    return (
                        <>{module.strapi_component === "page-modules.plain-content" && index === 0 &&
                            <EnquiryIntro titlesm={module.title} title={module.content?.data?.content.replace(/(<([^>]+)>)/gi, "")} />}

                            {module.strapi_component === "page-modules.global-module" && module.select_module === "contact_form" && <FormLayout><DefaultForm fields={ContactFormFields} classname="enquiry-form-wrapper" to_email_id={to_email_id} /></FormLayout>}

                            {module.strapi_component === "page-modules.global-module" && module.select_module === "report_repair_form" && <FormLayout><DefaultForm fields={ReportRepairFormFields} classname="enquiry-form-wrapper" /></FormLayout>}

                            {module.strapi_component === "page-modules.global-module" && module.select_module === "exceptional_service_form" && <FormLayout><DefaultForm fields={FourTierExceptionalFormFields} classname="enquiry-form-wrapper" /></FormLayout> }

                            {module.strapi_component === "page-modules.global-module" && module.select_module === "home_visit_valuation_form" && <FormLayout><DefaultForm fields={HomeVisitValuationFormFields} classname="enquiry-form-wrapper" /></FormLayout> }

                            {module.strapi_component === "page-modules.global-module" && module.select_module === "instant_valuation_form" && <FormLayout><DefaultForm fields={ValuationFormFields} classname="enquiry-form-wrapper" /></FormLayout> }

                            {module.strapi_component === "page-modules.image-and-content" && !module.background_color_transparent && <ValuationModule {...module} id={PageData.strapi_id} imagetransforms={PageData.imagetransforms} />}
                        </>
                    )
                })}
            </div>
        </Layout>
    )
}

export const Head = ({ data }) => {
    const PageData = data?.strapiPage  
    return (
        <SEO title={PageData?.seo?.metaTitle ? PageData?.seo?.metaTitle : PageData?.title} description={PageData?.seo?.metaDescription ? PageData?.seo?.metaDescription : PageData?.title} />
    )
}

export default FormTemplate

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
  }
`