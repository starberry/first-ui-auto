import React from "react";
import { Container, Row, Col, Tab, Tabs } from "react-bootstrap";
import loadable from "@loadable/component";
import { customStylesNews } from "../Common/utils";
import './assets/styles/_index.scss';
const Select = loadable(() => import("react-select"));

const SocialWallTab = (props) => {
    return (
        <section className="inner-tab-wrapper social-wall-tab-wrapper">
            <Container>
                <Row>
                    <Col>
                        <div className="mobile-tab-wrapper d-md-none">
                            <Select
                                options={
                                    [
                                        { value: 'all', label: 'All' },
                                        { value: 'instagram', label: 'instagram' },
                                        { value: 'facebook', label: 'facebook' },
                                        { value: 'twitter', label: 'twitter' }
                                    ]
                                }
                                isSearchable={false}
                                placeholder={"All"}
                                className={"select-control"}
                                classNamePrefix={"react-select"}
                                styles={customStylesNews}
                                components={{ DropdownIndicator:() => <i className="icon icon-select-dropdown-dark"></i>, IndicatorSeparator:() => null }}
                            />
                        </div>

                        <Tabs
                            defaultActiveKey="all"
                            className="inner-tab d-md-flex d-none"
                        >
                            <Tab eventKey="all" title="All">
                                <div className="social-wall-wrapper-main"></div>
                            </Tab>
                            <Tab eventKey="instagram" title="Instagram">
                                <div className="social-wall-wrapper-main"></div>
                            </Tab>
                            <Tab eventKey="facebook" title="Facebook">
                                <div className="social-wall-wrapper-main"></div>
                            </Tab>
                            <Tab eventKey="twitter" title="Twitter">
                                <div className="social-wall-wrapper-main"></div>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default SocialWallTab