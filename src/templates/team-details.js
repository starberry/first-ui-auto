import React from "react";
import { graphql } from 'gatsby'
import loadable from "@loadable/component";
import LayoutTwo from "../components/layoutTwo";
import Seo from "../components/seo"
import { PageLinks } from "../common/site/page-static-links";
const BreadcrumbModule = loadable(() => import("../components/BreadcrumbModule/BreadcrumbModule"));
const TeamDetailDesc = loadable(() => import("../components/TeamDetailDesc/TeamDetailDesc"));
const Enquire = loadable(() => import("../components/Enquire/Enquire"));

const TeamDetail = ({ data }, props) => {
    const PageData = data?.strapiTeam
    
    let breadcrumData;

    if (PageLinks?.team_parent_label) {
        breadcrumData = { parentname: PageLinks.team_parent_label, parent: PageLinks.team_parent, subparentname: PageLinks.team_label, subparent: PageLinks.team, pagename: PageData.title }
    } else {
        breadcrumData = { parentname: PageLinks.team_label, parent: PageLinks.team, pagename: PageData.title }
    }

    return (
        <LayoutTwo popularSearch="Generic pages" footerContact={'footercontact'}>
            <div className="layout-padding-top">
                <BreadcrumbModule {...breadcrumData} />

                <TeamDetailDesc {...PageData} />
            </div>

            <div className="d-md-none">
                <Enquire cta_1_label="Email Us" cta_2_label="Call" />
            </div>
        </LayoutTwo>
    )
}

export const Head = ({ data }) => {
  const PageData = data?.strapiTeam
  return (
    <Seo title={`${PageData.title} ${PageData.designation ? ' | '+PageData.designation : ''}`} description={`Get to know about ${PageData.title} here. Contact one of our estate agents for assistance in finding the right property for you.`} />
  )
}

export default TeamDetail


export const query = graphql`
query ($page_id: Int) {
    strapiTeam(strapi_id: {eq: $page_id}) {
      ...TeamFragment
        content {
          data {
            content
          }
        }
    }
  }
`