import React, { useState, useEffect } from "react";
import { Container, Row, Col, Tab, Tabs, Table } from "react-bootstrap";
import loadable from "@loadable/component";
import ScrollAnimation from 'react-animate-on-scroll';
import _ from "lodash";
import { Link } from "gatsby";
import { customStylesNews } from "../Common/utils";
// import usePagination from "../../hooks/usePagination"
import InnerPagination from "../InnerPagination/InnerPagination"
import { PageLinks } from "../../common/site/page-static-links";
import './assets/styles/_index.scss';
const { usePagination } = require("@starberry/gatsby-theme-utils/Hooks/UsePagination")
const Select = loadable(() => import("react-select"));

const CareersTab = (props) => {

    const [filter, setFilter] = useState('alljobs');
    let [projects, setProjects] = useState(props.data);
    const selectOptions = [{ value: 'alljobs', label: 'All Jobs' }];
    let [salesCount, setSalesCount] = useState(_.filter(props.data, function (o) { return o.node.category === "sales" }));
    let [lettingsCount, setLettingsCount] = useState(_.filter(props.data, function (o) { return o.node.category === "lettings" }));
    let [marketingCount, setMarketingCount] = useState(_.filter(props.data, function (o) { return o.node.category === "marketing" }));
    let [otherCount, setOtherCount] = useState(_.filter(props.data, function (o) { return o.node.category === "other" }));
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
        if (filt !== "alljobs") {
            setProjects([]);
            const filtered = _.filter(props.data, function (o) { return o.node.category === filt });
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
    // console.log('currentItems',lettingsCount)
    // for pagination

    useEffect(() => {
        if (salesCount.length > 0) {
            selectOptions.push({ value: 'sales', label: 'Sales' })
        }
        if (lettingsCount.length > 0) {
            selectOptions.push({ value: 'lettings', label: 'Lettings' })
        }
        if (marketingCount.length > 0) {
            selectOptions.push({ value: 'marketing', label: 'Marketing' })
        }
        if (otherCount.length > 0) {
            selectOptions.push({ value: 'other', label: 'Other' })
        }
    }, [])

    return (
        <>
        {currentItems && currentItems.length > 0 &&
        <section className="inner-tab-wrapper careers-tab-wrapper">
            <Container>
                <Row>
                    <Col>
                        <div className="mobile-tab-wrapper d-md-none">
                            <Select
                                options={selectOptions}
                                isSearchable={false}
                                placeholder={"All Jobs"}
                                onChange={(e) => { setFilter(e.value); applyCategory(e.value); }}
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
                                        setFilter('alljobs'); applyCategory('alljobs'); newClass(event);
                                    }}>All Jobs</button>
                                </li>
                                {salesCount.length > 0 && <li className="nav-item">
                                    <button type="button" className="nav-link" onClick={(event) => {
                                        setFilter('sales'); applyCategory('sales'); newClass(event);
                                    }}>Sales</button>
                                </li>}
                                {lettingsCount.length > 0 && <li className="nav-item">
                                    <button type="button" className="nav-link" onClick={(event) => {
                                        setFilter('lettings'); applyCategory('lettings'); newClass(event);
                                    }}>Lettings</button>
                                </li>}
                                {marketingCount.length > 0 && <li className="nav-item">
                                    <button type="button" className="nav-link" onClick={(event) => {
                                        setFilter('marketing'); applyCategory('marketing'); newClass(event);
                                    }}>Marketing</button>
                                </li>}
                                {otherCount.length > 0 && <li className="nav-item">
                                    <button type="button" className="nav-link" onClick={(event) => {
                                        setFilter('others'); applyCategory('others'); newClass(event);
                                    }}>Others</button>
                                </li>}
                            </ul>
                        </ScrollAnimation>

                        {currentItems.length > 0 ?
                            <div className="d-md-flex">
                                <div className="careers-card-wrapper-main">
                                    <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={100} offset={10}>
                                        <Table striped hover>
                                            <tbody>
                                                {currentItems?.map(({ node }, index) => {
                                                    return (
                                                        <tr>
                                                            <td className="careers-title">
                                                                {node.title}
                                                                <div className="d-md-none">
                                                                    {node.location && <div className="careers-loc">{node.location}</div>}
                                                                    <Link to={`/${PageLinks.career}/${node.slug}/`} className="link-underline">View Details & Apply</Link>
                                                                </div>
                                                            </td>
                                                            {node.location && <td className="d-xl-table-cell d-none">{node.location}</td>}
                                                            {node.category && <td className="d-xl-table-cell d-none">{_.capitalize(node.category)}</td>}
                                                            <td className="d-xl-table-cell d-none">{node.salary}</td>
                                                            <td className="d-md-table-cell text-end d-none"><Link to={`/${PageLinks.career}/${node.slug}/`} className="link-underline">View Details & Apply</Link></td>
                                                        </tr>
                                                    )
                                                }
                                                )}
                                            </tbody>
                                        </Table>
                                    </ScrollAnimation>
                                </div>
                            </div> :
                            <p className="mb-4">Sorry, noresults found, please check after sometimes</p>}
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
        }</>
    )
}

export default CareersTab