import React from "react";
import loadable from "@loadable/component";
import LayoutTwo from "../../../components/layoutTwo";
import FormLayout from "../../../components/FormLayout/FormLayout"
import Seo from "../../../components/seo"
import { PageLinks } from "../../../common/site/page-static-links";
import FormFields from "../../../../static/forms/team_contact_form.json";
import { parse as parseSearch } from "query-string"
import { useLocation } from "@reach/router"
const BreadcrumbModule = loadable(() => import("../../../components/BreadcrumbModule/BreadcrumbModule"));
const EnquiryIntro = loadable(() => import("../../../components/EnquiryIntro/EnquiryIntro"));
const TeamForm = loadable(() => import("../../../components/forms/default-form-layout"));

const TeamContact = (props) => {
    const location = useLocation()
    const searchParams = parseSearch(location.search)
    // const { data } = GetPropertyBooking(pid)
    // console.log('pid',props.location.state);
    const name = props.location?.state?.name
    const email = props.location?.state?.email
    return (
        <LayoutTwo>
            <Seo title={`Contact ${name}`} />
            <div className="layout-padding-top">
                <BreadcrumbModule subparentname={`Our Team`} subparent={PageLinks.team} parentname={`About`} parent={PageLinks.about} pagename={`Contact ${name ? name : ''}`} />

                <EnquiryIntro 
                    // titlesm={"Book a Viewing"}
                    title={`Contact ${name ? name : ''}`}
                />

                <FormLayout><TeamForm to_email_id={email ? email : ''} title={name ? name : ''} fields={FormFields} classname="enquiry-form-wrapper" /></FormLayout>
            </div>
        </LayoutTwo>
    )
}


export default TeamContact