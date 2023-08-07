import React, { useState, useEffect } from "react";
import algoliasearch from 'algoliasearch/lite';
import SearchResultsTemplate from "../../templates/property-results";
import parseResultsUrl from "../../utils/property-results/parseResultsUrl";
import generateFiltersfromPageData from "../../utils/property-results/generateFiltersfromPageData";
import { createResultsUrl } from "../../utils/property-results/createResultsUrl";
import { SEOSEARCHRESULTS } from "../../components/seo-search-results"
import useSearchResultsSEO from "../../hooks/useSearchResultsSEO"
// format h1 & desc and send to template
// format seo component

export default function SearchResults(props) {

    const [algoliadata, getAlgoliadata] = useState([]);
    // const [mysortbyoption, setMysortbyoption] = useState('');
    // const [mypageoption, setMypageoption] = useState('');

    //the current page data are lives here
    const page_url_data = parseResultsUrl(props.location)

    // you can make default search page results filters here
    const myalgoliafilters = generateFiltersfromPageData(page_url_data['departmentVal'], page_url_data['searchtypeVal'], page_url_data['areaVal'], page_url_data['bedVal'], page_url_data['minpriceVal'], page_url_data['maxpriceVal'], page_url_data['statusVal'], page_url_data['buildingval'])

    // navigate to pages based on filters

    const { pageh1, introcopy } = useSearchResultsSEO(page_url_data['searchtypeVal'], page_url_data['areaVal'], page_url_data['buildingval'], page_url_data['bedVal'], page_url_data['minpriceVal'], page_url_data['maxpriceVal'], page_url_data['propertyTypeVal'])

    useEffect(() => {
        getAlgoliaResutls(myalgoliafilters);
    }, [props.location]);

    const getAlgoliaResutls = (myalgoliafilters) => {
        // lets run algolia search query to fetch hits, stats and number of pages
        const client = algoliasearch(process.env.GATSBY_ALGOLIA_APP_ID, process.env.GATSBY_ALGOLIA_API_KEY);
        const index = client.initIndex(page_url_data['sortVal'] ? page_url_data['sortVal'] : page_url_data['indexVal']);
        //const index = client.initIndex(process.env.GATSBY_ALGOLIA_INDEX_NAME);
        // let query_filt = page_url_data['areaVal'].split("-and-")
        // let myareaquery = query_filt.map(function(area) {
        //     return area;
        // });
        index.search((page_url_data['areaVal'] == (process.env.GATSBY_DEFAULT_AREA).toLowerCase() ? '' : page_url_data['areaVal']), {
            // similarQuery: myareaquery.join(' '),
            filters: myalgoliafilters,
            page: (page_url_data['pageVal'] - 1),
            hitsPerPage: (page_url_data['layoutVal'] ? 1000 : 21)
        }).then(({ nbHits, page, hitsPerPage, nbPages, hits }) => {
            var myArray = { "total": nbHits, "current_page_number": page, "hitsPerPage": hitsPerPage, "number_of_pages": nbPages, "hits": hits };
            getAlgoliadata(myArray)
        });
    }
    return (
        <React.Fragment>
            <SearchResultsTemplate
                {...algoliadata}
                pageh1={pageh1}
                introcopy={introcopy}
                page_url_data={page_url_data}
                createResultsUrl={createResultsUrl}
                location_path={props.location.pathname}
                indexname={page_url_data['indexVal']}
            />
        </React.Fragment>
    )
}

export const Head = (props) => {
    //the current page data are lives here
    const page_url_data = parseResultsUrl(props.location)

    // you can make default search page results filters here
    const myalgoliafilters = generateFiltersfromPageData(page_url_data['departmentVal'], page_url_data['searchtypeVal'], page_url_data['areaVal'], page_url_data['bedVal'], page_url_data['minpriceVal'], page_url_data['maxpriceVal'], page_url_data['buildingval'])

    const { pagetitle, pagemetadesc } = useSearchResultsSEO(page_url_data['searchtypeVal'], page_url_data['areaVal'], page_url_data['buildingval'], page_url_data['bedVal'], page_url_data['minpriceVal'], page_url_data['maxpriceVal'])

    return (
        <SEOSEARCHRESULTS title={pagetitle} description={pagemetadesc} url={props.location.pathname} />
    )
}