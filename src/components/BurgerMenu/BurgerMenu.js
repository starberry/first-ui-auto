import React from "react";
import { useStaticQuery, graphql } from "gatsby"
import { Container, Row, Col } from "react-bootstrap";
// import CTALink from "../../modules/cta_link"
import AccordionMenu from "./AccordionSubMenu/AccordionSubMenu"
import './assets/styles/_index.scss';
const { CTALink } = require("@starberry/gatsby-theme-utils/Modules/CTALinkModule")

const BurgerMenu = (props) => {

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
                      ...MenuFragment
                    }
                    add_new {
                      title
                      link {
                        ...MenuFragment
                      }
                    }
                  }
                }
            }
        }
    `);

    const menus = data.allStrapiBurgerMenu.edges;

    return (
        <div className="burger-menu">
            <Container>
                <Row className="d-flex justify-content-center">
                    <Col lg={8}>
                        <ul className="list-unstyled burger-menu-list">
                            {menus && menus.map(({ node }, i) => (
                                <li>
                                    {node.add_new.length === 0 ?
                                        <CTALink {...node} target_window={node.link.target_window}/> : <AccordionMenu {...node} key={i} />
                                    }
                                </li>
                            ))}
                        </ul>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default BurgerMenu