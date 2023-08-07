import React from "react";
import { navigate } from "gatsby";
import loadable from "@loadable/component";
import { Container, Row, Col } from "react-bootstrap";
import FormLayout from "../components/FormLayout/FormLayout"
import LayoutTwo from "../components/layoutTwo";
import { parse as parseSearch } from "query-string"
import { useLocation } from "@reach/router"
import FormFields from "../../static/forms/book_a_viewing_form.json";
import Seo from "../components/seo"
const BreadcrumbModule = loadable(() => import("../components/BreadcrumbModule/BreadcrumbModule"));
const EnquiryIntro = loadable(() => import("../components/EnquiryIntro/EnquiryIntro"));
const BookAViewFormLayout = loadable(() => import("../components/forms/default-form-layout"));

const BookaViewing = (props) => {
    const location = useLocation()
    const searchParams = parseSearch(location.search)
    const pid = props.location?.state?.id
    const prop_url = props.location?.state?.pageurl
    const prop_address = props.location?.state?.address
    const prop_img_url = props.location?.state?.propImage
    const email_template_type = typeof pid == "undefined" ? "book_a_viewing_global" : "book_a_viewing"
    // const { data } = GetPropertyBooking(pid)
    // console.log('pid',props.location.state);
    return (
        <LayoutTwo>
            <div className="layout-padding-top book-a-viewing-form-page">
                <BreadcrumbModule pagename="Book a viewing" />

                <Container className="back">
                    <Row>
                        <Col>
                            <button onClick={() => navigate(-1)} className="search-back d-flex align-items-center"><i className="icon icon-search-back"></i> <span>Back to details page</span></button>
                        </Col>
                    </Row>
                </Container>

                <EnquiryIntro
                    // titlesm={"Book a Viewing"}
                    title={"Book a Viewing"}
                />

                <FormLayout><BookAViewFormLayout prop_url={`${prop_url}`} prop_address={`${prop_address}`} prop_img_url={`${prop_img_url}`} email_template_type={`${email_template_type}`} fields={FormFields} classname="enquiry-form-wrapper" /></FormLayout>
            </div>
        </LayoutTwo>
    )
}

export const Head = () => <Seo title="Book a viewing" />
export default BookaViewing