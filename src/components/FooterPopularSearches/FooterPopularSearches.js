import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby"
// import CTALink from "../../modules/cta_link"
import _ from "lodash";
import { Link } from "gatsby";
import { Row, Col, Accordion } from "react-bootstrap";
import './assets/styles/_index.scss';
const {CTALink } = require("@starberry/gatsby-theme-utils/Modules/CTALinkModule")

const FooterPopularSearches = (props) => {

    const [allData, setAllData] = useState([]);


    const data = useStaticQuery(graphql`
        query {
            allStrapiPopularSearch {
                edges {
                    node {
                        title
                        new_column {
                            add_new_link {
                                title
                                custom_link
                                link {
                                slug
                                target_window
                                link_type
                                external_link
                                    strapi_parent {
                                        slug
                                    }
                                }
                            }
                        }
                        pages {
                            strapi_id
                        }
                    }
                }
            }
        }
    `);

    const popularSearchLinks = data.allStrapiPopularSearch?.edges;

    useEffect(() => {
        var filtered = _.filter(popularSearchLinks, function (o) { return o.node.title === props.popularSearch });
        setAllData(filtered)
    }, [popularSearchLinks])

    return (
        <Accordion className={`popular-searches-accordion ${props.popularSearch ? '' : 'empty-search'}`}>
            {allData && allData.map((item, index) => (
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Popular Searches</Accordion.Header>
                    <Accordion.Body>
                        <Row>
                            {item?.node.new_column?.map((col, i) => (
                                <Col xl={3}>
                                    <ul className="list-unstyled popular-searches-list">
                                        {col?.add_new_link?.map((main, i) => (
                                            <li>
                                                {main.link ? <CTALink {...main} /> :
                                                    <a href={main.custom_link}>{main.title}</a>}
                                            </li>
                                        ))}
                                    </ul>
                                </Col>
                            ))}
                        </Row>
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
    )
}

export default FooterPopularSearches