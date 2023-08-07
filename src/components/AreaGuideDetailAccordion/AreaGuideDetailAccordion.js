import React from "react";
import { Accordion } from "react-bootstrap";
import './assets/styles/_index.scss';

const AreaGuideDetailAccordion = (props) => {
    return (
        <div className="news-detail-accordion-wrapper areaguide-detail-accordion-wrapper">
            <Accordion className="news-detail-accordion">
                <Accordion.Item eventKey={0}>
                    <Accordion.Header>Restaurants</Accordion.Header>
                    <Accordion.Body>
                        <p>Sed enim massa, efficitur nec quam interdum, euismod hendrerit est. Donec sed libero luctus, sodales justo nec, tempus massa. Aliquam et eros lectus. Nam euismod eros rhoncus, ornare velit ac, semper enim. Proin a sem euismod, imperdiet ex ac, faucibus dui.</p>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey={1}>
                    <Accordion.Header>Attractions</Accordion.Header>
                    <Accordion.Body>
                        <p>Sed enim massa, efficitur nec quam interdum, euismod hendrerit est. Donec sed libero luctus, sodales justo nec, tempus massa. Aliquam et eros lectus. Nam euismod eros rhoncus, ornare velit ac, semper enim. Proin a sem euismod, imperdiet ex ac, faucibus dui.</p>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey={2}>
                    <Accordion.Header>Landmarks</Accordion.Header>
                    <Accordion.Body>
                        <p>Sed enim massa, efficitur nec quam interdum, euismod hendrerit est. Donec sed libero luctus, sodales justo nec, tempus massa. Aliquam et eros lectus. Nam euismod eros rhoncus, ornare velit ac, semper enim. Proin a sem euismod, imperdiet ex ac, faucibus dui.</p>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey={3}>
                    <Accordion.Header>Lifestyle</Accordion.Header>
                    <Accordion.Body>
                        <p>Sed enim massa, efficitur nec quam interdum, euismod hendrerit est. Donec sed libero luctus, sodales justo nec, tempus massa. Aliquam et eros lectus. Nam euismod eros rhoncus, ornare velit ac, semper enim. Proin a sem euismod, imperdiet ex ac, faucibus dui.</p>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

export default AreaGuideDetailAccordion