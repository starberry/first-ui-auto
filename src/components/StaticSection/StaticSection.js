import React from "react";
import { Container, Row, Col } from "react-bootstrap";
// import ContentModule from "../../modules/content-render";
const { ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")

const StaticSection = (props) => {
    return (
        <section className="terms-and-conditions-wrapper">
            <Container>
                <Row>
                    <Col xl={7}>
                        <h1>{props.title ? props.title : props.pagename}</h1>
                        <div className="inner-detail-desc">
                            <ContentModule Content={props.content.data.content} />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default StaticSection