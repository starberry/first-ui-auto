import React, { useState, useEffect } from "react"
import _ from "lodash";
import loadable from "@loadable/component";
import { useStaticQuery, graphql } from "gatsby"
import { Container, Row, Col } from "react-bootstrap";
import InnerPagination from "../InnerPagination/InnerPagination"
import { customStylesNews } from "../Common/utils";
import AreaGuidesCard from "../AreaGuidesCard/AreaGuidesCard"
const { usePagination } = require("@starberry/gatsby-theme-utils/Hooks/UsePagination")
const Select = loadable(() => import("react-select"));

const AreaGuideListing = (props) => {

    const [filter, setFilter] = useState('');

    const data = useStaticQuery(graphql`
        query {
            allStrapiAreaGuide(filter: {publish: {eq: true}}) {
              edges {
                node {
                  slug
                  strapi_id
                  title
                  tile_image {
                    alternativeText
                    url
                  }
                  areas {
                    title
                    slug
                  }
                }
              }
            }
        }
    `);

    const areaguides = data.allStrapiAreaGuide.edges;

    const [areafilteredList, setAreaFilteredList] = useState();
    const [set, setClass] = useState(false);
    let [projects, setProjects] = useState('');
    let [filteredList, setFilteredList] = useState('');

    const applyCategory = (filt) => {
        if (filt !== 'all') {
            setProjects([]);
            const filtered = _.filter(areaguides, function (o) {
                return (o.node.areas.some(item => item.slug === filt))
            });
            setProjects(filtered);
            setFilteredList(filtered);
        } else {
            setProjects(areaguides);
            setFilteredList(areaguides);
        }
    }

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


    // for pagination
    const itemsPerPage = 16
    const { currentItems, currentPage, setCurrentPage } = usePagination({
        items: filteredList,
        itemsPerPage,
    })
    // for pagination


    useEffect(() => {
        setFilteredList(areaguides)
        setFilteredList(areaguides)
        let filterAreas = [{ value: 'all', label: "All" }]
        areaguides.map(({ node }) => {
            if (node.areas && node.areas.length > 0) {
                node.areas.map((item) => {
                    filterAreas.push({ value: item.slug, label: item.title })
                })
            }
        })
        setAreaFilteredList(_.uniqBy(filterAreas, 'value'))
    }, [areaguides])

    return (
        <section className="inner-tab-wrapper areaguide-tab-wrapper ">
            <Container>
                <Row>
                    <Col>
                        {areafilteredList && areafilteredList.length > 0 && <div className="mobile-tab-wrapper d-md-none">
                            <Select
                                options={areafilteredList}
                                isSearchable={false}
                                onChange={(e) => { setFilter(e.value); applyCategory(e.value); }}
                                placeholder={"All"}
                                className={"select-control"}
                                classNamePrefix={"react-select"}
                                styles={customStylesNews}
                                components={{ DropdownIndicator: () => <i className="icon icon-select-dropdown-dark"></i>, IndicatorSeparator: () => null }}
                            />
                        </div>}
                        {areafilteredList && areafilteredList.length > 0 && <ul className="inner-tab d-md-flex d-none nav nav-tabs" id="filter-link">
                            <li className="nav-item">
                                <button type="button" className="nav-link active" onClick={(event) => {
                                    setFilter('all'); applyCategory('all'); newClass(event);
                                }}>All</button>
                            </li>
                            {areafilteredList.slice(1, 100).map((item, index) => (
                                <li className="nav-item">
                                    <button type="button" className="nav-link" onClick={(event) => {
                                        setFilter(item.value); applyCategory(item.value); newClass(event);
                                    }}>{item.label}</button>
                                </li>
                            ))}
                        </ul>}
                        <div className="areaguies-landing-card-wrapper">
                            {currentItems && currentItems.map(({ node }, i) => (
                                <AreaGuidesCard
                                    {...node}
                                />
                            ))}
                        </div>
                    </Col>
                    <InnerPagination
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        totalItems={areaguides.length}
                        setCurrentPage={setCurrentPage}
                    />
                </Row>
            </Container>
        </section>
    )
}

export default AreaGuideListing