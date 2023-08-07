import React from "react";
import { useStaticQuery, graphql } from "gatsby"
// import ContentModule from "../../modules/content-render";
// import CTALink from "../../modules/cta_link"
import './assets/styles/_index.scss';
const {ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")
const {CTALink } = require("@starberry/gatsby-theme-utils/Modules/CTALinkModule")

const PropertyValuationCard = (props) => {
    const data = useStaticQuery(graphql`
        query {
            strapiSiteConfig {
              news_details_sidebar_content {
                data {
                  news_details_sidebar_content
                }
              }
              sidebar_cta_title
              sidebar_cta_link {
                slug
                target_window
                external_link
                link_type
                strapi_parent {
                  slug
                }
              }
            }
        }
    `);

    const sidebarData = data.strapiSiteConfig;

    return (
        <React.Fragment>
            {sidebarData && <div className="property-sidebar-valuation-wrapper">
                <ContentModule Content={sidebarData.news_details_sidebar_content?.data?.news_details_sidebar_content} />
                <div className="property-sidebar-valuation-btn">
                    {sidebarData.sidebar_cta_link && <CTALink class="button button-secondary-outline" link={sidebarData.sidebar_cta_link} title={sidebarData.sidebar_cta_title} target_window={sidebarData.sidebar_cta_link?.target_window} />}
                </div>
            </div>}
        </React.Fragment>
    )
}

export default PropertyValuationCard