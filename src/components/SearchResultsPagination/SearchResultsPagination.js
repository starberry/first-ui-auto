import React, { useState } from "react";
import { navigate } from "gatsby";
import loadable from "@loadable/component";
import { customStyles } from "../SearchResults/DropdownStyle";
import './assets/styles/_index.scss';
const Select = loadable(() => import("react-select"));

function SearchResultsPagination(props) {
    const [pagenumber, setPageNumber] = useState(1);
    const changepagination = event => {
        //get sortby value
        let pageUrl = '';
        setPageNumber(event.value)
        if (event?.value && event?.value > 1) {
            pageUrl = 'page-' + event.value + '/'
        }
        //get current url
        const urlwithoutsort = (props?.location_path).split("page-");
        // concat url and navigate
        navigate(urlwithoutsort[0] + pageUrl)
    }
    const nextpage = event => {
        setPageNumber(pagenumber+1)
        let pageUrl = 'page-' + (pagenumber+1) + '/';
        //get current url
        const urlwithoutsort = (props?.location_path).split("page-");
        // concat url and navigate
        navigate(urlwithoutsort[0] + pageUrl)
    }
    const prevpage = event => {
        setPageNumber(pagenumber-1)
        let pageUrl = 'page-' + (pagenumber-1) + '/';
        //get current url
        const urlwithoutsort = (props?.location_path).split("page-");
        // concat url and navigate
        navigate(urlwithoutsort[0] + pageUrl)
    }
    //
    let page_options = [];
    for (let i = 1; i <= props?.nbPages; i++) {
        page_options.push({ value: i, label: i });
    }
    //props?.page_url_data?.pageVal
    let page_key = Object.keys(page_options).find(key => page_options[key].value === props?.page_url_data?.pageVal);

    return (
        <div className={`load-more-wrap ${props.tag}`}>
            {props?.total &&

                <div className="d-flex align-items-center justify-content-between">
                    <button className={`results-btn d-flex align-items-center ${props?.current_page_number > 0 ? "" : "disabled"}`} disabled={props?.current_page_number > 0 ? "" : "disabled"} onClick={() => prevpage()}><i className="icon icon-results-back"></i> <span>Previous</span></button>

                    <div className="text-center pages-count d-flex align-items-center">
                        <div className="spacing spacing-right">Page</div>
                        <Select
                            options={page_options}
                            onChange={changepagination}
                            placeholder={(props?.current_page_number) + 1}
                            className={"select-control"}
                            classNamePrefix={"react-select"}
                            styles={customStyles}
                            defaultValue={page_options[page_key]}
                            value={page_options.value}
                            isSearchable={false}
                            //value={(props?.props?.current_page_number) + 1}
                            components={{ DropdownIndicator: () => <i className="icon icon-select-dropdown-dark"></i>, IndicatorSeparator: () => null }}
                        />
                        <div className="spacing spacing-both">of</div>
                        <div className="spacing">{props?.nbPages}</div>
                    </div>

                    <button className={`results-btn d-flex align-items-center ${(props?.current_page_number + 1) === props?.nbPages ? "disabled" : ""}`} disabled={(props?.current_page_number + 1) === props?.nbPages ? "disabled" : ""} onClick={() => nextpage()}><span>Next</span> <i className="icon icon-results-next"></i></button>
                </div>
            }
        </div>
    );
}

export default SearchResultsPagination