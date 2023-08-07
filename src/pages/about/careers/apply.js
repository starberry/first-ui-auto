import React from "react";
import loadable from "@loadable/component";
import LayoutTwo from "../../../components/layoutTwo";
import FormLayout from "../../../components/FormLayout/FormLayout"
import Seo from "../../../components/seo"
import { PageLinks } from "../../../common/site/page-static-links";
import { parse as parseSearch } from "query-string"
import FormFields from "../../../forms/career_form.json";
import { useLocation } from "@reach/router"
const BreadcrumbModule = loadable(() => import("../../../components/BreadcrumbModule/BreadcrumbModule"));
const EnquiryIntro = loadable(() => import("../../../components/EnquiryIntro/EnquiryIntro"));
const CareerForm = loadable(() => import("../../../components/forms/default-form-layout"));

const ApplyJob = (props) => {
    const location = useLocation()
    const searchParams = parseSearch(location.search)
    // const { data } = GetPropertyBooking(pid)
    // console.log('pid',props.location.state);
    return (
        <LayoutTwo>
            <div className="layout-padding-top">
                <BreadcrumbModule subparentname={`Career Opportunities`} subparent={PageLinks.career} parentname={`About`} parent={PageLinks.about} pagename="Apply for this Job" />

                <EnquiryIntro 
                    // titlesm={"Book a Viewing"}
                    title={"Apply for this Job"}
                />

                <FormLayout><CareerForm fields={FormFields} classname="enquiry-form-wrapper" /></FormLayout>
            </div>
        </LayoutTwo>
    )
}

export const Head = () => <Seo title="Apply for this Job" />

export default ApplyJob