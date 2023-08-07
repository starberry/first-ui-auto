import React, { useState } from "react";
import { Link } from "gatsby";
import { navigate } from "gatsby"
import { Container, Row, Col, Form } from "react-bootstrap";
import loadable from "@loadable/component";
import searchType from "../../search_config/search_type.json";
import BedroomList from "../../search_config/bedrooms.json";
import propertyTypes from "../../search_config/property_type.json";
import minPrice from "../../search_config/min_price.json";
import maxPrice from "../../search_config/max_price.json";
import useHasScrolled from "../../hooks/useHasScrolled";
//import SearchBoxFilter from "./SearchBoxFilter";
import './assets/styles/_index.scss';
const Select = loadable(() => import("react-select"));
const MultiSelectInputDubai = loadable(() => import("../MultiSelectInputDubai/MultiSelectInputDubai"))

const FilterSearchDubai = (props) => {

    // Scroll
    const scrolled = useHasScrolled()
    // Scroll

    // Dropdown react select styles
    const customStyles = {
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                // backgroundColor: isSelected ? "#081D3C" : "null",
                // color: isSelected ? "#ffffff" : "#34373D",
                "&:hover": {
                    // color: "#ffffff",
                    cursor: "pointer",
                    // backgroundColor: "#081D3C",
                }
            }
        },
        control: styles => ({
            ...styles,
            backgroundColor: null,
            border: 0,
            paddingLeft: 0,
            outline: 0,
            boxShadow: "none",
            color: "#fff",
            fontSize: "1rem",
        }),
        valueContainer: styles => ({
            ...styles,
            fontSize: "1rem",
            paddingLeft: 0,
            lineHeight: "21px",
            cursor: "pointer",
        }),
        dropdownIndicator: styles => ({
            ...styles,
            color: "#fff",
        }),
        indicatorsContainer: styles => ({
            ...styles,
            color: "#fff",
            cursor: "pointer",
        }),
        indicatorSeparator: () => null,
        placeholder: defaultStyles => {
            return {
                ...defaultStyles,
                color: "#ffffff",
                marginLeft: 0,
            }
        },
    }
    // Dropdown react select styles

    // More filters
    const [showFilter, setShowFilter] = useState(false);

    const defaultArea = process.env.GATSBY_DEFAULT_AREA

    const moreFilters = (e) => {
        setShowFilter(true);
    }

    const moreFiltersShow = (e) => {
        setShowFilter(false);
    }
    // More filters

    // View on map & list
    const [showMap, setShowMap] = useState(true);
    const [showList, setShowList] = useState(false);

    const mapView = (e) => {
        setShowMap(false);
        setShowList(true);
    }

    const listView = (e) => {
        setShowList(false);
        setShowMap(true);
    }
    // View on map & list

    const SearchTypeChange = (e) => {
        var navPath = ''
        if (e.value === "buy") {
            if (defaultArea) {
                navPath = "/property/for-sale/" + `in-${(process.env.GATSBY_DEFAULT_AREA).toLowerCase()}/`;
            } else {
                navPath = "/property/for-sale/"
            }

        } else if (e.value === "rent") {
            if (defaultArea) {
                navPath = "/property/to-rent/" + `in-${(process.env.GATSBY_DEFAULT_AREA).toLowerCase()}/`;
            } else {
                navPath = "/property/to-rent/"
            }
        }
        navigate(navPath)
    }

    const handleSubmit = event => {
        event.preventDefault();
        const formsdata = (event.target);
        const json = {}
        Object.keys(formsdata).map(key => (
            json[formsdata[key].name] = formsdata[key].value
        ))
        delete json.submit;
        delete json?.undefined;
        //add existing sortby value
        //json['sortby'] = props?.page_url_data?.sortVal
        navigate(props.createResultsUrl(json))
    }

    //filters values
    const search_type_options = searchType;
    let min_price_options = minPrice["sales"];
    let max_price_options = maxPrice["sales"];
    //props?.page_url_data?.search_type
    let search_type_key;
    if (props?.page_url_data?.searchtypeVal === "lettings") {
        search_type_key = 1;
        min_price_options = minPrice["lettings"];
        max_price_options = maxPrice["lettings"];
    } else if (props?.page_url_data?.searchtypeVal === "sales") {
        search_type_key = 0;
    }
    //props?.page_url_data?.minpriceVal
    let min_price_key = Object.keys(min_price_options).find(key => min_price_options[key].value === props?.page_url_data?.minpriceVal);

    //props?.page_url_data?.maxpriceVal
    let max_price_key = Object.keys(max_price_options).find(key => max_price_options[key].value === props?.page_url_data?.maxpriceVal);
    const bedroom_options = BedroomList;
    //props?.page_url_data?.bedVal
    let bedroom_key = Object.keys(bedroom_options).find(key => bedroom_options[key].value === props?.page_url_data?.bedVal);
    const building_options = propertyTypes;
    //props?.page_url_data?.buildingval
    let building_key = Object.keys(building_options).find(key => building_options[key].value === props?.page_url_data?.buildingval);

    let area_val;
    if (props?.page_url_data?.areaVal && props?.page_url_data?.areaVal !== (process.env.GATSBY_DEFAULT_AREA.toLowerCase())) {
        area_val = props?.page_url_data?.areaVal
    }

    return (
        <section className={`filter-search-dubai-wrapper sticky-top ${scrolled ? "filter-scrolled" : ""}`}>
            <Container>
                <Row>
                    <Col>
                        <div className={`filter-search-features ${showFilter === true ? "filter-show" : ""}`}>
                            <Form className="refine-form" method="post" onSubmit={handleSubmit} onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}>
                                <div className={`${showFilter === true ? "" : "d-flex align-items-center justify-content-between"}`}>
                                    <div className={`search-box ${showFilter === true ? "mobile-filter-show" : ""}`}>
                                        {/* <Form.Control name={"area"} type="text" defaultValue={area_val} placeholder="Street, area or postcode" /> */}
                                        <MultiSelectInputDubai />
                                    </div>
                                    <div className={`dropdown-select buy-dropdown mobile-filter ${showFilter === true ? "d-block" : ""}`}>
                                        <Select
                                            options={search_type_options}
                                            defaultValue={search_type_options[search_type_key]}
                                            value={search_type_options.value}
                                            name={"search_type"}
                                            placeholder={"Buy"}
                                            className={"select-control"}
                                            classNamePrefix={"react-select"}
                                            styles={customStyles}
                                            onChange={(e) => SearchTypeChange(e)}
                                            isSearchable={false}
                                            components={{ DropdownIndicator: () => <i className={`${showFilter === true ? "icon icon-select-dropdown-dark" : "icon icon-select-dropdown"}`}></i>, IndicatorSeparator: () => null }}
                                        />
                                    </div>

                                    <div className="search-divider d-xl-block d-none"></div>

                                    <div className={`dropdown-select price-dropdown mobile-filter ${showFilter === true ? "d-block" : ""}`}>
                                        <Select
                                            options={min_price_options}
                                            defaultValue={min_price_options[min_price_key]}
                                            value={min_price_options.value}
                                            placeholder={"Min Price"}
                                            name={"min_price"}
                                            className={"select-control"}
                                            classNamePrefix={"react-select"}
                                            styles={customStyles}
                                            isSearchable={false}
                                            components={{ DropdownIndicator: () => <i className={`${showFilter === true ? "icon icon-select-dropdown-dark" : "icon icon-select-dropdown"}`}></i>, IndicatorSeparator: () => null }}
                                        />
                                    </div>
                                    <div className="search-divider d-xl-block d-none"></div>
                                    <div className={`dropdown-select price-dropdown mobile-filter ${showFilter === true ? "d-block" : ""}`}>
                                        <Select
                                            options={max_price_options}
                                            defaultValue={max_price_options[max_price_key]}
                                            value={max_price_options.value}
                                            placeholder={"Max Price"}
                                            name={"max_price"}
                                            className={"select-control"}
                                            classNamePrefix={"react-select"}
                                            styles={customStyles}
                                            isSearchable={false}
                                            components={{ DropdownIndicator: () => <i className={`${showFilter === true ? "icon icon-select-dropdown-dark" : "icon icon-select-dropdown"}`}></i>, IndicatorSeparator: () => null }}
                                        />
                                    </div>
                                    <div className="search-divider d-xl-block d-none"></div>
                                    <div className={`dropdown-select bed-dropdown mobile-filter ${showFilter === true ? "d-block" : ""}`}>
                                        <Select
                                            options={bedroom_options}
                                            defaultValue={bedroom_options[bedroom_key]}
                                            value={bedroom_options.value}
                                            placeholder={"Bedrooms"}
                                            name={"bedrooms"}
                                            className={"select-control"}
                                            classNamePrefix={"react-select"}
                                            styles={customStyles}
                                            isSearchable={false}
                                            components={{ DropdownIndicator: () => <i className={`${showFilter === true ? "icon icon-select-dropdown-dark" : "icon icon-select-dropdown"}`}></i>, IndicatorSeparator: () => null }}
                                        />
                                    </div>
                                    <div className="search-divider d-xl-block d-none"></div>
                                    <div className={`dropdown-select property-dropdown mobile-filter ${showFilter === true ? "d-block" : ""}`}>
                                        <Select
                                            options={building_options}
                                            defaultValue={building_options[building_key]}
                                            value={building_options.value}
                                            name={"building_type"}
                                            placeholder={"Property Type"}
                                            className={"select-control"}
                                            classNamePrefix={"react-select"}
                                            styles={customStyles}
                                            isSearchable={false}
                                            components={{ DropdownIndicator: () => <i className={`${showFilter === true ? "icon icon-select-dropdown-dark" : "icon icon-select-dropdown"}`}></i>, IndicatorSeparator: () => null }}
                                        />
                                    </div>
                                    <div className={`d-xl-none search-more-filters ${showFilter === true ? "d-none" : ""}`}>
                                        <button className="more-filters-btn" onClick={moreFilters}>More Filters <i className="icon icon-more-filters"></i></button>
                                    </div>
                                    <div className={`search-btn-wrapper ${showFilter === true ? "d-none" : ""}`}>
                                        <button name="submit" className="button button-primary">Search</button>
                                        <Form.Control name={"sortby"} type="hidden" defaultValue={props?.page_url_data?.sortVal} />
                                        <Form.Control name={"includesold"} type="hidden" defaultValue={props?.page_url_data?.soldVal} />
                                        <Form.Control name={"layout"} type="hidden" defaultValue={props?.page_url_data?.layoutVal} />
                                    </div>
                                    <Row className="g-0">
                                        <Col xs={6}>
                                            <div className={`search-btn-wrapper me-3 ${showFilter === true ? "search-btn-mobile" : "d-none"}`}>
                                                <button className="button button-secondary-outline-bg" name="submit" onClick={moreFiltersShow}>Close</button>
                                            </div>
                                        </Col>
                                        <Col xs={6}>
                                            <div className={`search-btn-wrapper ${showFilter === true ? "search-btn-mobile" : "d-none"}`}>
                                                <button className="button button-primary" name="submit" onClick={moreFiltersShow}>Update</button>
                                            </div>
                                        </Col>
                                    </Row>

                                    <ul className={`d-md-none list-inline more-filters-btn-list d-flex justify-content-between ${showFilter === true ? "d-none" : ""}`}>
                                        <li className="list-inline-item">
                                            <div className="more-filters-btn-mobile">
                                                <button className="more-filters-btn d-flex align-items-center justify-content-center" onClick={moreFilters}><i className="icon icon-more-filters"></i> Filters</button>
                                            </div>
                                        </li>
                                        <li className="list-inline-item">
                                            <div className="more-filters-btn-mobile">
                                                {props?.page_url_data?.layoutVal == "" &&
                                                    <Link to={props?.mymapview_url + "map-view/"} className="more-filters-btn d-flex align-items-center justify-content-center" ><i className="icon icon-map-white"></i> Map</Link>
                                                }
                                                {props?.page_url_data?.layoutVal &&
                                                    <Link to={props?.mymapview_url} className="more-filters-btn d-flex align-items-center justify-content-center" ><i className="icon icon-list-white"></i> List</Link>
                                                }
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default FilterSearchDubai