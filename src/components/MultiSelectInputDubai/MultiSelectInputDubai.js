import React, { useState, useEffect, useRef } from "react"
import { Link } from "gatsby"
import './assets/styles/_index.scss'

const MultiSelectInputDubai = (props) => {

    // Search add
    const [searchAdd, setSearchAdd] = useState(false);

    const showSearchAdd = (e) => {
        setSearchAdd(true);
    }
    // Search add

    // clear the suggestions when click outside the component
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const wrapperRef = useRef(null);

    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setSearchAdd(false);
        }
    }
    // clear the suggestions when click outside the component

    return (
        <div className={`multi-select-input-dubai-wrapper ${searchAdd === true ? "search-add-open" : ""}`} ref={wrapperRef}>
            <div className="d-flex align-items-center">
                <div className="d-flex align-items-center search-dubai-list">Business Bay <i className="icon icon-search-list-close"></i></div>
                <div className="d-flex align-items-center search-dubai-list" onClick={showSearchAdd}>1 more <i className="icon icon-search-list-close"></i></div>
                <Link to="#!" className="search-add-list" onClick={showSearchAdd}>+ Add</Link>
            </div>
            <div className={`search-open-list ${searchAdd === true ? "search-add-open" : ""}`}>
                <ul className="list-unstyled">
                    <li>
                        <div className="d-inline-flex align-items-center search-dubai-list">Business Bay <i className="icon icon-search-list-close"></i></div>
                    </li>
                    <li>
                        <div className="d-inline-flex align-items-center search-dubai-list">Al Furjan (Dubai) <i className="icon icon-search-list-close"></i></div>
                    </li>
                    <li>
                        <div className="d-inline-flex align-items-center search-dubai-list">Business Bay (Dubai) <i className="icon icon-search-list-close"></i></div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default MultiSelectInputDubai