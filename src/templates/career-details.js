import React from "react";
import { graphql } from 'gatsby'
import loadable from "@loadable/component";
import LayoutTwo from "../components/layoutTwo";
import Seo from "../components/seo"
import { PageLinks } from "../common/site/page-static-links";
const BreadcrumbModule = loadable(() => import("../components/BreadcrumbModule/BreadcrumbModule"));
const CareersDetailDesc = loadable(() => import("../components/CareersDetailDesc/CareersDetailDesc"));
const Enquire = loadable(() => import("../components/Enquire/Enquire"));

const CareerDetail = ({data}, props) => {
    const PageData = data?.strapiCareer

    let breadcrumData;

    if (PageLinks?.career_parent_label) {
        breadcrumData = { parentname: PageLinks.career_parent_label, parent: PageLinks.career_parent, subparentname: PageLinks.career_label, subparent: PageLinks.career, pagename: PageData.title }
    } else {
        breadcrumData = { parentname: PageLinks.career_label, parent: PageLinks.career, pagename: PageData.title }
    }


    return (
        <LayoutTwo popularSearch="Generic pages" footerContact="footercontact">
            <div className="layout-padding-top">
                <BreadcrumbModule {...breadcrumData} />

                <CareersDetailDesc data={PageData}/>
            </div>

            <div className="d-md-none">
                <Enquire 
                    tag="career"
                    crm_id={PageData?.strapi_id}
                    display_address={PageData?.title}
                />
            </div>
        </LayoutTwo>
    )
}

export const Head = ({ data }) => {
  const PageData = data?.strapiCareer
  const metaDescription = `Join our dynamic team as a ${PageData.title} at ${process.env.GATSBY_SITE_NAME}. Take the first step towards a rewarding real estate career with our established agency. Apply now!`

  return (
    <Seo title={PageData.title} description={metaDescription}/>
  )
}

export default CareerDetail

export const query = graphql`
query ($page_id: Int) {
    strapiCareer(strapi_id: {eq: $page_id}) {
      ...CareerFragment
        job_details {
          data {
            job_details
          }
        }
        image {
          alternativeText
          url
        }
        imagetransforms {
          image_Transforms
        }
    }
  }
`