import React from "react";
import loadable from "@loadable/component";
import { Container, Row, Col } from "react-bootstrap";
import { useStaticQuery, graphql } from "gatsby";
import { Link } from "gatsby";
import CTALink from "../modules/cta_link"
import LayoutTwo from "../components/layoutTwo";
import Seo from "../components/seo"
import "../styles/inc/_sitemap.scss";
const ListingIntroModule = loadable(() => import("../components/ListingIntroModule/ListingIntroModule"));

const SitemapPage = () => {
    const data = useStaticQuery(graphql`
        query {
            allStrapiBurgerMenu(
                filter: {publish: {eq: true}}
                sort: {fields: sort, order: ASC}
              ) {
                edges {
                  node {
                    title
                    link {
                      slug
                      external_link
                      link_type
                      target_window
                      strapi_parent {
                        slug
                        target_window
                        link_type
                      }
                    }
                    add_new {
                      title
                      link {
                        slug
                        external_link
                        link_type
                        target_window
                        strapi_parent {
                          slug
                          link_type
                          target_window
                        }
                      }
                    }
                  }
                }
            }
        }
    `);

    const menus = data.allStrapiBurgerMenu.edges;

    return (
        <LayoutTwo>
            <div className="layout-padding-top">

                <div className="grey-bg">
                    <ListingIntroModule
                        headingTitle="Sitemap"
                    />
                    <Container>
                        <Row>
                            <Col lg={12} className="sitemap-page">
                                <ul className="sitemap-main-list">
                                    {menus && menus.map(({ node }, i) => {
                                        return (
                                            <React.Fragment key={i}>
                                                {node.add_new.length === 0 &&
                                                    <li className="li-main">
                                                        <CTALink {...node} />
                                                    </li>
                                                }
                                                {node.add_new.length > 0 &&
                                                    <li className="li-main">
                                                        <CTALink {...node} />
                                                        <ul className="sub-menu sitemap-sub-menu-list">
                                                            {node.add_new && node.add_new.map((item, i) => (
                                                                <li key={i} className='sub-li-list'>
                                                                    <CTALink {...item} />
                                                                </li>
                                                            ))}
                                                        </ul>

                                                    </li>
                                                }
                                            </React.Fragment>
                                        )
                                    }
                                    )}
                                </ul>
                            </Col>
                        </Row>
                    </Container>

                </div>

            </div>
        </LayoutTwo>

    )
}

export const Head = () => <Seo title="Sitemap" description={`Discover the comprehensive sitemap of ${process.env.GATSBY_SITE_NAME} website, featuring our range of property services, career opportunities, and contact information.`}/>

export default SitemapPage
