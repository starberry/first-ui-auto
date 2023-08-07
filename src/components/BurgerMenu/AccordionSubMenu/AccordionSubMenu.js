import React from "react";
import { Accordion } from "react-bootstrap";
// import CTALink from "../../../modules/cta_link"
import '../assets/styles/_index.scss';

const { CTALink } = require("@starberry/gatsby-theme-utils/Modules/CTALinkModule")

const AccordionBurgerMenu = (props) => {
    return (
        <Accordion className="burger-menu-accordion">
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    <CTALink {...props} />
                </Accordion.Header>
                <Accordion.Body>
                    <ul className="list-unstyled inner-burger-menu-list">
                        {props.add_new && props.add_new.map((item, i) => (
                        <li>
                            <CTALink {...item} target_window={item?.link?.target_window}/>
                        </li>
                        ))}
                    </ul>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default AccordionBurgerMenu