import React from "react";
import { Link } from "gatsby";
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import './assets/styles/_index.scss';

const BreadcrumbModule = (props) => {
    return (
        <div className="breadcrumb-module-wrapper">
            <Container>
                <Row>
                    <Col>
                        <Breadcrumb>
                            <Link to="../../../../" className="breadcrumb-item">Home</Link>
                            {props.parent && <Link to={`/${props.parent}/`} className="breadcrumb-item">{props.parentname}</Link> }
                            {props.subparent && <Link to={`/${props.subparent}/`} className="breadcrumb-item">{props.subparentname}</Link> }
                            <Breadcrumb.Item active>{props.pagename}</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default BreadcrumbModule