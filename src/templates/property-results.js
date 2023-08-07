import React, { useState, Suspense, useEffect } from "react";
import loadable from "@loadable/component"
import { Link, navigate } from "gatsby";
import { Container, Row, Col, Form } from "react-bootstrap";
import LayoutTwo from "../components/layoutTwo";
import { PageLinks } from "../common/site/page-static-links";
import { customStyles } from "../components/SearchResults/DropdownStyle";
const FilterSearch = React.lazy(() => import("../components/FilterSearch/FilterSearch"));
const PropertyCard = React.lazy(() => import("../components/PropertyCard/PropertyCard"));
const NewHomesCard = React.lazy(() => import("../components/NewHomesCard/NewHomesCard"));
const SearchResultsPagination = React.lazy(() => import("../components/SearchResultsPagination/SearchResultsPagination"));
const ValuationModule = React.lazy(() => import("../components/ValuationModule/ValuationModuleGlobal"));
const NoResultPropertiesSales = React.lazy(() => import("../components/NoResultsProperties/NoResultsProperties"));
const NoResultPropertiesLet = React.lazy(() => import("../components/NoResultsProperties/NoResultsPropertiesLettings"));
const GoogleMapReults = React.lazy(() => import("../components/maps/google/results"));
const Select = React.lazy(() => import("react-select"));
const LeafletMapReults = React.lazy(() => import("../components/maps/leaflet/results"));

const SearchResultsTemplate = (props) => {

    const [isChecked, setIsChecked] = useState()
    const mapService = process.env.GATSBY_MAP_PROVIDER == "leaflet" ? "leaflet" : "google";
    const changesortby = event => {
        //get sortby value
        let sortbyUrl = '';
        if (event?.value) {
            sortbyUrl = 'sortby-' + event.value + '/'
        }
        //get current url
        const urlwithoutsort_filt = (props?.location_path).split("page-");
        const urlwithoutsort = urlwithoutsort_filt[0].split("sortby-");
        // concat url and navigate
        navigate(urlwithoutsort[0] + sortbyUrl)
    }

    useEffect(() => {
        setIsChecked(props?.page_url_data?.soldVal ? true : false)
    },[props?.page_url_data])

    const changeincludesold = event => {
        let sortbyUrl = '';
        //get current url
        const urlwithoutsort_filt = (props?.location_path).split("page-");
        const urlwithoutsort = urlwithoutsort_filt[0].split("sortby-");
        if (!isChecked) {
            setIsChecked(true)
            if (props?.page_url_data.searchtypeVal === "sales") {
                sortbyUrl = 'includes-sold/'
            }
            else {
                sortbyUrl = 'includes-let-agreed/'
            }
            // concat url and navigate
            navigate(urlwithoutsort[0] + sortbyUrl)
        } else {
            setIsChecked(false)
            if (props?.page_url_data.searchtypeVal === "sales") {
                navigate(urlwithoutsort[0].replace('includes-sold/', ''))
            }
            else {
                navigate(urlwithoutsort[0].replace('includes-let-agreed/', ''))
            }
        }
    }
    //const changelayout = event => {
    //get current url
    const mymapview_url = (props?.location_path).split("map-view/");
    // concat url and navigate
    //navigate()
    //}
    const sortby_options = [
        { value: '', label: 'Most Recent' },
        { value: 'price-desc', label: 'Highest Price' },
        { value: 'price-asc', label: 'Lowest Price' }
    ];
    //props?.page_url_data?.search_type
    let sortby_key;
    if (props?.page_url_data?.sortVal === props.indexname) {
        sortby_key = 0;
    } else if (props?.page_url_data?.sortVal === props.indexname + "_price_desc") {
        sortby_key = 1;
    } else if (props?.page_url_data?.sortVal === props.indexname + "_price_asc") {
        sortby_key = 2;
    }

    // View on map & list
    const [showMap, setShowMap] = useState(true);
    const [showList, setShowList] = useState(false);

    const [showDesc, setShowDesc] = useState(false)
    const mapView = (e) => {
        setShowMap(false);
        setShowList(true);
    }

    const listView = (e) => {
        setShowList(false);
        setShowMap(true);
    }
    // View on map & list

    var itemListElement = [];
    if (props?.total > 0 && props.hits) {
        (props.hits).map((val, key) => {
            let details_path = '/property-for-sale'
            if (val.search_type == "lettings") {
                details_path = '/property-to-rent'
            }
            if (props.page_url_data.propertyTypeVal === "new_developments") {
                details_path = '/new-home-for-sale'
            }
            let propid = ''
            if (val?.strapi_id)
                propid = val.strapi_id
            else if (val?.objectID)
                propid = val.objectID
            itemListElement.push(
                {
                    "@type": "ListItem",
                    "position": key + 1,
                    "url": process.env.GATSBY_SITE_URL + details_path + '/' + val.slug + '/' + (propid) + '/',
                    "name": val.slug.replace(/-/g, " ")
                }
            )
        })
    }


    var ldJson = props.hits ? {
        "@context": "https://schema.org",
        "@type": "SearchResultsPage",
        "publisher": {
            "@type": "Corporation",
            "name": process.env.GATSBY_SITE_NAME + " in " + process.env.GATSBY_DEFAULT_AREA,
            "logo": {
                "@type": "ImageObject",
                "url": process.env.GATSBY_SITE_URL + `/images/logo.png`,
                "width": 250,
                "height": 100
            }
        },
        "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": props.total,
            "name": props?.pageh1,
            "description": props?.introcopy,
            "itemListElement": itemListElement
        }
    } : '';

    const IncludeSoldCheckbox = (
        <Form.Check
            className="search-results-check"
            inline
            label={props?.page_url_data.searchtypeVal === "sales" ? "Include Sold" : "Let Agreed"}
            name=""
            checked={isChecked}
            type={"checkbox"}
            id={`include-sold`}
            onChange={changeincludesold}
        />
    )

    return (
        <LayoutTwo
            tag="search-results-template" 
        >
            <Suspense fallback={<div>Loading...</div>}>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
                />
                <div className="layout-padding-top">
                    <FilterSearch mymapview_url={mymapview_url[0]} page_url_data={props.page_url_data} createResultsUrl={props.createResultsUrl} />

                    <div className="search-results-heading-wrapper">
                        <Container>
                            <Row>
                                <Col lg={6}>
                                    <h1 className="search-results-heading">{props?.pageh1} <i className="icon icon-info" onClick={() => setShowDesc(!showDesc)}></i></h1>
                                    {showDesc && <p className="search-results-desc-text">{props?.introcopy} <Link to={`/${PageLinks.contact}/`}>{process.env.GATSBY_SITE_NAME}</Link>.</p>}
                                </Col>
                            </Row>
                            <Row className="search-results-title-count">
                                <Col md={3} className="d-flex align-items-center col-4 result-count">
                                    {props.total} results
                                    {/* {props?.page_url_data?.layoutVal == "" && (props.total > props.hitsPerPage) &&
                                        <div className="search-results-title">Showing {props.hitsPerPage * (props?.current_page_number) + 1}-{props.hitsPerPage * (props?.current_page_number + 1)} of {props.total} Properties</div>
                                    } */}
                                </Col>
                                <Col md={9} className="col-8">
                                    {props.total > 0 &&
                                        <div className="d-flex justify-content-end align-items-center sort-option-select">
                                            <div className="ver-line"></div>
                                            {
                                                process.env.GATSBY_PROPERTY_INCLUDE_SOLD === "true" ?
                                                    <div className={`d-md-block d-none ${props?.page_url_data.searchtypeVal}`}>
                                                        {IncludeSoldCheckbox}
                                                    </div>
                                                    : ""
                                            }
                                            {props?.page_url_data?.layoutVal == "" &&
                                                <div className="dropdown-select d-flex align-items-center">
                                                    Sort:
                                                    <Select
                                                        options={sortby_options}
                                                        defaultValue={sortby_options[sortby_key]}
                                                        value={sortby_options.value}
                                                        placeholder={"Most Recent"}
                                                        onChange={changesortby}
                                                        className={"select-control"}
                                                        classNamePrefix={"react-select"}
                                                        styles={customStyles}
                                                        isSearchable={false}
                                                        components={{ DropdownIndicator: () => <i className="icon icon-select-dropdown-dark"></i>, IndicatorSeparator: () => null }}
                                                    />
                                                </div>
                                            }
                                            <div className="map-link d-md-block d-none">
                                                {props?.page_url_data?.layoutVal == "" &&
                                                    <Link to={mymapview_url[0] + "map-view/"} className="link-underline"><i className="icon icon-map"></i> <span>View on Map</span></Link>
                                                }
                                                {props?.page_url_data?.layoutVal &&
                                                    <Link to={mymapview_url[0]} className="link-underline"><i className="icon icon-list"></i> <span>View on Grid</span></Link>
                                                }
                                            </div>
                                        </div>
                                    }
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {props.total > 0 &&
                                        process.env.GATSBY_PROPERTY_INCLUDE_SOLD === "true" ?
                                            <div className="d-md-none d-block include-sold-mobile">
                                                {IncludeSoldCheckbox}
                                            </div>
                                            : ""
                                    }
                                </Col>
                            </Row>
                            {props.total == 0 &&
                                <Row>
                                    <Col>
                                        <div className="no-results-section">
                                            <p>Unfortunately, we do not currently have any properties that match your search criteria.</p><p>We have selected some of our showcase properties for you to browse below. Alternatively, you can search again in the bar above.</p>
                                            {props?.page_url_data.searchtypeVal === "lettings" ? <NoResultPropertiesLet /> : <NoResultPropertiesSales />}
                                        </div>
                                    </Col>
                                </Row>
                            }
                        </Container>
                    </div>
                    <div className="results-page-default-section">
                        {props?.page_url_data?.layoutVal == "" &&
                            <Container>
                                {props?.total > 0 &&
                                    <div className={props.page_url_data.propertyTypeVal === "residential" ? "property-card-wrapper-main" : "property-card-wrapper-main new-homes-card-wrapper-main"}>
                                        {(props.hits).map((hit, i) => props.page_url_data.propertyTypeVal === "residential" ? <PropertyCard myindexval={i} data={hit} key={i} /> : <NewHomesCard myindexval={i} data={hit} key={i} />)}
                                        {(props.total > props.hitsPerPage) ? <SearchResultsPagination setMypageoption={props.setMypageoption} location_path={props?.location_path} page_url_data={props.page_url_data} total={props?.total} current_page_number={props?.current_page_number} hitsPerPage={props?.hitsPerPage} nbPages={props?.number_of_pages} /> : <div className="empty-space-search"></div>}
                                    </div>
                                }
                            </Container>
                        }
                    </div>
                    {props?.page_url_data?.layoutVal &&
                        <div className="map-results">
                            {props?.total > 0 && mapService == "google" &&
                                <GoogleMapReults hits={props?.hits} propertyTypeVal={props.page_url_data.propertyTypeVal} />
                            }
                            {props?.total > 0 && mapService == "leaflet" &&
                                <LeafletMapReults hits={props?.hits} propertyTypeVal={props.page_url_data.propertyTypeVal} />
                            }
                        </div>
                    }

                    <ValuationModule />
                </div>
            </Suspense>
        </LayoutTwo>
    )
}

export default SearchResultsTemplate