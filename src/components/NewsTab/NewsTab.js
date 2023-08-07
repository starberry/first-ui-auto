import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import loadable from "@loadable/component";
import ScrollAnimation from 'react-animate-on-scroll';
import _ from "lodash";
import NewsCard from "../NewsCard/NewsCard";
// import usePagination from "../../hooks/usePagination"
import InnerPagination from "../InnerPagination/InnerPagination"
import { customStylesNews } from "../Common/utils";
import './assets/styles/_index.scss';
const { usePagination } = require("@starberry/gatsby-theme-utils/Hooks/UsePagination")
const Select = loadable(() => import("react-select"));

const NewsTab = (props) => {

    const [filter, setFilter] = useState('everything');
    let [projects, setProjects] = useState(props.data);
    const selectOptions = [{ value: 'everything', label: 'Everything' }];
    let [buyingCount, setBuyingCount] = useState(_.filter(props.data, function (o) { return (o.node.category.strapi_json_value).includes("buying"); }));
    let [sellingCount, setSellingCount] = useState(_.filter(props.data, function (o) { return (o.node.category.strapi_json_value).includes("selling"); }));
    let [rentingCount, setRentingCount] = useState(_.filter(props.data, function (o) { return (o.node.category.strapi_json_value).includes("renting"); }));
    let [landlordsCount, setLandlordsCount] = useState(_.filter(props.data, function (o) { return (o.node.category.strapi_json_value).includes("landlords"); }));
    let [filteredList, setFilteredList] = useState(props.data);
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
        if (filt !== "everything") {
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
        if (buyingCount.length > 0) {
            selectOptions.push({ value: 'buying', label: 'Buying' })
        }
        if (sellingCount.length > 0) {
            selectOptions.push({ value: 'selling', label: 'Selling' })
        }
        if (rentingCount.length > 0) {
            selectOptions.push({ value: 'renting', label: 'Renting' })
        }
        if (landlordsCount.length > 0) {
            selectOptions.push({ value: 'landlords', label: 'Landlords' })
        }
    }, [filteredList])



    return (
        <section className="inner-tab-wrapper news-tab-wrapper">
            <Container>
                <Row>
                    <Col>
                        <div className="mobile-tab-wrapper d-md-none">
                            <Select
                                options={selectOptions}
                                isSearchable={false}
                                onChange={(e) => { setFilter(e.value); applyCategory(e.value); }}
                                value={selectOptions.find(obj => obj.value === filter)}
                                placeholder={"Everything"}
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
                                        setFilter('everything'); applyCategory('everything'); newClass(event);
                                    }}>Everything</button>
                                </li>
                                {buyingCount.length > 0 && <li className="nav-item">
                                    <button type="button" className="nav-link" onClick={(event) => {
                                        setFilter('buying'); applyCategory('buying'); newClass(event);
                                    }}>Buying</button>
                                </li>}
                                {sellingCount.length > 0 && <li className="nav-item">
                                    <button type="button" className="nav-link" onClick={(event) => {
                                        setFilter('selling'); applyCategory('selling'); newClass(event);
                                    }}>Selling</button>
                                </li>}
                                {rentingCount.length > 0 && <li className="nav-item">
                                    <button type="button" className="nav-link" onClick={(event) => {
                                        setFilter('renting'); applyCategory('renting'); newClass(event);
                                    }}>Renting</button>
                                </li>}
                                {landlordsCount.length > 0 && <li className="nav-item">
                                    <button type="button" className="nav-link" onClick={(event) => {
                                        setFilter('landlords'); applyCategory('landlords'); newClass(event);
                                    }}>Landlords</button>
                                </li>}
                            </ul>
                        </ScrollAnimation>

                        {currentItems.length > 0 ?
                            <div className="news-card-wrapper-main">
                                {currentItems?.map(({ node }, index) => {
                                    return (
                                        <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={100} offset={10}>
                                            <NewsCard data={node} tag="landing" />
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
        </section>
    )
}

export default NewsTab