import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import loadable from "@loadable/component";
import { customStylesNews } from "../Common/utils";
import './assets/styles/_index.scss';
const Select = loadable(() => import("react-select"));

const InnerPagination = ({
    itemsPerPage,
    totalItems,
    currentPage,
    setCurrentPage,
  }) => {
  
    const pageNumbers = []
    const pageNumberOptions = []
  
    // Generate page numbers
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i)
      pageNumberOptions.push({ value: i, label: i })
    }
  
    const totalPageNumbers = pageNumbers?.length
  
    const handlePageChange = value => {
      // handle change for dropdown select
      if (typeof value === "object") setCurrentPage(value.value)
      // handle change for number based page change
      else if (typeof value === "number") setCurrentPage(value)
      else
        switch (value) {
          case "back":
            setCurrentPage(page => --page)
            break
          case "next":
            setCurrentPage(page => ++page)
            break
          default:
            break
        }
      if(typeof window != 'undefined') {
        window.scrollTo(0, 80)
      }
    }
  
    if(totalPageNumbers < 2) return null
  
    return (
        <div className="inner-pagination-wrapper">
            <Row>
                <Col>
                    <div className="load-more-inner-wrap">
                        <div className="d-flex align-items-center justify-content-between">
                            <button className={`results-btn d-flex align-items-center`} onClick={() => handlePageChange("back")} disabled={currentPage <= 1}><i className="icon icon-results-back"></i> <span>Previous</span></button>

                            <div className="text-center pages-count d-flex align-items-center">
                                <div className="spacing spacing-right">Page</div>
                                <Select
                                    options={pageNumberOptions}
                                    isSearchable={false}
                                    placeholder={"1"}
                                    className={"select-control"}
                                    classNamePrefix={"react-select"}
                                    styles={customStylesNews}
                                    value={{ value: currentPage, label: currentPage }}
                                    onChange={handlePageChange}
                                    components={{ DropdownIndicator: () => <i className="icon icon-select-dropdown-dark"></i>, IndicatorSeparator: () => null }}
                                />
                                <div className="spacing spacing-both">of</div>
                                <div className="spacing">{totalPageNumbers}</div>
                            </div>

                            <button className={`results-btn d-flex align-items-center`} onClick={() => handlePageChange("next")} disabled={currentPage >= totalPageNumbers}><span>Next</span> <i className="icon icon-results-next"></i></button>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default InnerPagination