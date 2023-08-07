import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NewHomesKeyDetails from "./NewHomesKeyDetails";
import './assets/styles/_index.scss';
const { ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")

const NewHomesDetailsDesc = (props) => {

    // Sticky scroll
    const [scroll, setScroll] = useState(false)
    const [renderComponent, setRenderComponent] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 750)
        })
        window.addEventListener("mousemove", () => {
            if (renderComponent === false) {
              setRenderComponent(true)
            }
          })
          window.addEventListener("touchmove", () => {
            if (renderComponent === false) {
              setRenderComponent(true)
            }
          })
          window.addEventListener("keypress", () => {
            if (renderComponent === false) {
              setRenderComponent(true)
            }
          })
    },[])
    // Sticky scroll

    return (
        <section className="property-desc-wrapper new-homes-details-desc-wrapper" id="new-homes-details-desc-wrapper">
            <Container>
                <Row>
                    <Col xl={12}>
                        <h2 className="new-homes-details-heading">About this Development</h2>
                    </Col>
                </Row>
                <Row>
                    {props.content &&
                    <Col xl={7}>
                        <div className="property-desc-title">Description</div>
                        <div className="read-more-wrap property-desc-text">
                            <ContentModule Content={props.content} />
                        </div>
                    </Col> }
                    <Col xl={1}></Col>
                    <Col xl={4}>
                        <div className={`new-homes-details-sidebar position-sticky ${scroll ? "scrolled" : ""}`}>
                            <NewHomesKeyDetails {...props}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default NewHomesDetailsDesc