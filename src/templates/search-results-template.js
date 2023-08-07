import React from "react";
import loadable from "@loadable/component"
import { Link } from "gatsby";
import { Container, Row, Col } from "react-bootstrap";
import { 
    Configure, 
    // Hits, 
    useHits, 
    // useInfiniteHits, 
    InstantSearch, 
    InstantSearchSSRProvider, 
    RefinementList, 
    SearchBox, 
  // useInstantSearch 
} from 'react-instantsearch-hooks-web';
import { simple } from 'instantsearch.js/es/lib/stateMappings';
import { history } from 'instantsearch.js/es/lib/routers';
import LayoutTwo from "../components/layoutTwo";
import { searchClient } from '../components/Algolia/searchClient';
// import  Stats  from '../components/Algolia/Stats';
// import routing from '../components/Algolia/search-routing';
import { customStyles } from "../components/SearchResults/DropdownStyle";
const FilterSearch = loadable(() => import("../components/FilterSearch/FilterSearch"));
const Stats = loadable(() => import("../components/Algolia/Stats"));
const PropertyCard = loadable(() => import("../components/PropertyCard/PropertyCard"));
const SearchResultsPagination = loadable(() => import("../components/SearchResultsPagination/SearchResultsPagination"));
const ValuationModule = loadable(() => import("../components/ValuationModule/ValuationModule"));
const Select = loadable(() => import("react-select"));

function CustomHits(props) {
    const { hits } = useHits(props); 

    return (
        hits.map((hit, i) => (
                <PropertyCard address={hit?.display_address} title={hit?.title} currency={hit?.currency} price={hit?.price} img={hit?.thumbnail} />
            )
        )
    )
}

const SearchResultsTemplate = (props, { serverState, location }) => {

    return (
        <LayoutTwo>

            <div className="layout-padding-top">
                <InstantSearchSSRProvider {...serverState}>
                    <InstantSearch
                        indexName="dev_properties"
                        searchClient={searchClient}
                        initialUiState={{
                            dev_properties: {
                                refinementList: {
                                    search_type: [props.ptype],
                                    department: [props.pcategorytype],
                                    publish: [true],
                                },
                            },
                        }}
                        routing={{
                            stateMapping: simple(),
                            router: history({
                                getLocation() {
                                    if (typeof window === 'undefined') {
                                        return location;
                                    }

                                    return window.location;
                                },
                            }),
                        }}
                    >
                        <div className="d-none">
                            <SearchBox placeholder="Search" />
                            <RefinementList attribute="search_type" defaultRefinement={[props.ptype]} />
                            <RefinementList attribute="department" defaultRefinement={[props.pcategorytype]} />
                            <RefinementList attribute="publish" defaultRefinement={[true]} />
                        </div>
                        <FilterSearch />
                        <div className="search-results-heading-wrapper">
                            <Container>
                                <Row>
                                    <Col lg={8}>
                                        <Stats />
                                        <p className="search-results-desc-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.</p>
                                    </Col>
                                </Row>
                                <Row className="search-results-title-count">
                                    <Col md={6} className="d-flex align-items-center">
                                        <div className="search-results-title">Showing 1-12 of 421 Properties</div>
                                    </Col>
                                    <Col md={6} className="d-md-block d-none">
                                        <div className="d-flex justify-content-end align-items-center">
                                            <div className="dropdown-select d-flex align-items-center">
                                                Sort:
                                                <Select
                                                    options={
                                                        [
                                                            { value: 'most-recent', label: 'Most Recent' },
                                                            { value: 'highest-price', label: 'Highest Price' },
                                                            { value: 'lowest-price', label: 'Lowest Price' }
                                                        ]
                                                    }
                                                    isSearchable={false}
                                                    placeholder={"Most Recent"}
                                                    className={"select-control"}
                                                    classNamePrefix={"react-select"}
                                                    styles={customStyles}
                                                    components={{ DropdownIndicator: () => <i className="icon icon-select-dropdown-dark"></i>, IndicatorSeparator: () => null }}
                                                />
                                            </div>
                                            <div className="map-link">
                                                <Link to="#" className="link-underline"><i className="icon icon-map"></i> <span>View on Map</span></Link>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                        <Configure hitsPerPage={21} />
                        <Container>
                            <div className="property-card-wrapper-main">
                                <CustomHits {...props} />
                                <SearchResultsPagination />
                            </div>
                        </Container>
                    </InstantSearch>
                </InstantSearchSSRProvider>
                <ValuationModule />
            </div>
        </LayoutTwo>
    )
}

export default SearchResultsTemplate