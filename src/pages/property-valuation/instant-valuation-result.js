import React, { useEffect, useState } from "react";
import SEO from "../../components/seo"
import { Container, Row, Col } from "react-bootstrap";
import loadable from "@loadable/component";
import Layout from "../../components/layoutTwo";
import FormLayout from "../../components/FormLayout/FormLayout"

// const BreadcrumbModule = loadable(() => import("../../components/BreadcrumbModule/BreadcrumbModule"));
// const ContactIntro = loadable(() => import("../../components/ContactIntro/ContactIntro"));
// const ContactDetail = loadable(() => import("../../components/ContactDetail/ContactDetail"));
const EnquiryIntro = loadable(() => import("../../components/EnquiryIntro/EnquiryIntro"));
const ValuationThankYou = loadable(() => import("../../components/ValuationThankYou/ValuationThankYou"));

const Contact = (props) => {
    const [result, setResult] = useState(null);
    const [thankyou, setThanksyou] = useState(false);
    useEffect(() => {
        if (result === null && sessionStorage.getItem('valuationResult') != null) {
            setResult(JSON.parse(sessionStorage.getItem('valuationResult')))
        }
    })
    return (
        <Layout>

            <div className="layout-padding-top"></div>

            {/* <BreadcrumbModule subparentlabel={PageData.choose_menu[0]?.strapi_parent?.title} subparentlink={PageData.choose_menu[0]?.strapi_parent?.slug} parentlabel={PageData.choose_menu[0]?.strapi_parent?.strapi_parent?.title} parentlink={PageData.choose_menu[0]?.strapi_parent?.strapi_parent?.slug} title={PageData.title} tag="menu"/> */}

            <EnquiryIntro titlesm="" title="Instant Valuation"/>

            <div className="contact-page-wrapper section-p">
                <FormLayout>
                    <ValuationThankYou {...result} />
                </FormLayout>
            </div>
        </Layout>
    )
}

export const Head = () => <SEO title="Instant Valuation Results" description="Instant Valuation Results" />

export default Contact
