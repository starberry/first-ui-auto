import React from "react";
import { Accordion } from "react-bootstrap";
// import ContentModule from "../../modules/content-render";
import './assets/styles/_index.scss';
const {ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")

const NewsDetailAccordion = (props) => {
    return (
        <div className="news-detail-accordion-wrapper">
            <Accordion className="news-detail-accordion">
                {props.data.map((item, index) => (
                    <Accordion.Item eventKey={index}>
                        <Accordion.Header>{item.title}</Accordion.Header>
                        <Accordion.Body>
                            {item.content &&
                            <ContentModule Content={item.content?.data?.content} /> }
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    )
}

export default NewsDetailAccordion