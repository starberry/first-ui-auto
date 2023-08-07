import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import loadable from "@loadable/component";
import ScrollAnimation from 'react-animate-on-scroll';
import _ from "lodash";
import TeamsCard from "../TeamsCard/TeamsCard";
// import usePagination from "../../hooks/usePagination"
import InnerPagination from "../InnerPagination/InnerPagination"
import { customStylesNews } from "../Common/utils";
import './assets/styles/_index.scss';
const { usePagination } = require("@starberry/gatsby-theme-utils/Hooks/UsePagination")
const Select = loadable(() => import("react-select"));

const TeamsTab = (props) => {

    const [filter, setFilter] = useState('everyone');
    let [projects, setProjects] = useState(props.data);
    let [filteredList, setFilteredList] = useState(props.data);
    const selectOptions = [{ value: 'everyone', label: 'Everyone' }];
    let [directorsCount, setDirectorsCount] = useState(_.filter(props.data, function (o) { return (o.node.category?.strapi_json_value).includes("directors"); }));
    let [negotiatorsCount, setNegotiatorsCount] = useState(_.filter(props.data, function (o) { return (o.node.category?.strapi_json_value).includes("negotiators"); }));
    let [marketingCount, setMarketingCount] = useState(_.filter(props.data, function (o) { return (o.node.category?.strapi_json_value).includes("marketing"); }));
    const [set, setClass] = useState(false);

    const newClass = (event) => {
        var parent = document.getElementById('filter-link');
        parent.classList.add('filter-active');
        setClass(false);
        var allChildElements = parent.querySelectorAll('.nav-link');
        for (const box of allChildElements) {
            box.classList.remove('active');
        }
        event.target.classList.add('active')
    }

    const applyCategory = (filt) => {
        if (filt !== "everyone") {
            setProjects([]);
            const filtered = _.filter(props.data, function (o) { return (o.node.category.strapi_json_value).includes(filt); });
            setProjects(filtered);
            setFilteredList(filtered);
        } else {
            setProjects(props.data);
            setFilteredList(props.data);
        }
    }


    // for pagination
    const itemsPerPage = 12
    const { currentItems, currentPage, setCurrentPage } = usePagination({
        items: filteredList,
        itemsPerPage,
    })
    // for pagination

    useEffect(() => {
        if (directorsCount.length > 0) {
            selectOptions.push({ value: 'directors', label: 'Directors' })
        }
        if (negotiatorsCount.length > 0) {
            selectOptions.push({ value: 'negotiators', label: 'Negotiators' })
        }
        if (marketingCount.length > 0) {
            selectOptions.push({ value: 'marketing', label: 'Marketing' })
        }
    }, [filteredList])

    return (
        <section className="inner-tab-wrapper teams-tab-wrapper">
            <Container>
                <Row>
                    <Col>
                        <div className="mobile-tab-wrapper d-md-none">
                            <Select
                                options={selectOptions}
                                isSearchable={false}
                                onChange={(e) => { setFilter(e.value); applyCategory(e.value); }}
                                placeholder={"Everyone"}
                                className={"select-control"}
                                classNamePrefix={"react-select"}
                                styles={customStylesNews}
                                components={{ DropdownIndicator: () => <i className="icon icon-select-dropdown-dark"></i>, IndicatorSeparator: () => null }}
                            />
                        </div>
                        <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={100} offset={10}>
                            <ul className="inner-tab d-md-flex d-none nav nav-tabs" id="filter-link">
                                <li className="nav-item">
                                    <button type="button" className="nav-link active" onClick={(event) => {
                                        setFilter('everyone'); applyCategory('everyone'); newClass(event);
                                    }}>Everyone</button>
                                </li>
                                {directorsCount.length > 0 && <li className="nav-item">
                                    <button type="button" className="nav-link" onClick={(event) => {
                                        setFilter('directors'); applyCategory('directors'); newClass(event);
                                    }}>Directors</button>
                                </li>}
                                {negotiatorsCount.length > 0 && <li className="nav-item">
                                    <button type="button" className="nav-link" onClick={(event) => {
                                        setFilter('negotiators'); applyCategory('negotiators'); newClass(event);
                                    }}>Negotiators</button>
                                </li>}
                                {marketingCount.length > 0 && <li className="nav-item">
                                    <button type="button" className="nav-link" onClick={(event) => {
                                        setFilter('marketing'); applyCategory('marketing'); newClass(event);
                                    }}>Marketing</button>
                                </li>}
                            </ul>
                        </ScrollAnimation>

                        {currentItems.length > 0 ?
                            <div className="teams-card-wrapper-main">
                                {currentItems?.map(({ node }, index) => {
                                    return (
                                        <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={100} offset={10}>
                                            <TeamsCard data={node} />
                                        </ScrollAnimation>
                                    )
                                }
                                )}
                            </div> :
                            <p>Sorry, noresults found, please check after sometimes</p>}
                    </Col>
                    <InnerPagination
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        totalItems={filteredList.length}
                        setCurrentPage={setCurrentPage}
                    />
                </Row>
            </Container>
        </section >
    )
}

export default TeamsTab