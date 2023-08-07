// import {removeSpecialChar} from "../common/utils"
import propertyStatus from "../../search_config/status.json";
import departmentAllVal from "../../search_config/department.json";
const {removeSpecialChar } = require("@starberry/gatsby-theme-utils/Common/Utils")

const parseResultsUrl = (location) => {
    //split the URL
    if (location) {
        var pathUri_main = ""
        let departmentVal = "residential"
        let searchtypeVal = ""
        let areaVal = ""
        let bedVal = ""
        let minpriceVal = ""
        let maxpriceVal = ""
        let pageVal = "1"
        let buildingval = ""
        let sortVal = ""
        let soldVal = ""
        let statusVal = ""
        let layoutVal = ""
        let index_name = process.env.GATSBY_ALGOLIA_INDEX_NAME
        let propertyTypeVal = "residential"

        let salespage  = location.pathname.indexOf("/property/for-sale") > -1
        let lettingspage = location.pathname.indexOf("/property/to-rent") > -1
        let newdevelopmentspage = location.pathname.indexOf("/property/new-homes/for-sale") > -1

        if (salespage === true) {
            pathUri_main = location.pathname.split("/property/for-sale")
            searchtypeVal = "sales"
            statusVal = propertyStatus[0].sales
            departmentVal = departmentAllVal[0].sales
        }
        else if (lettingspage === true) {
            pathUri_main = location.pathname.split("/property/to-rent")
            searchtypeVal = "lettings"
            statusVal = propertyStatus[1].lettings
            departmentVal = departmentAllVal[1].lettings
        }
        else if (newdevelopmentspage === true) {
            pathUri_main = location.pathname.split("/property/new-homes/for-sale")
            searchtypeVal = "sales"
            index_name = process.env.GATSBY_ALGOLIA_NEW_DEVELOPMENTS_INDEX_NAME
            propertyTypeVal = "new_developments"
        }

        if (pathUri_main[1]) {
            // following could be regexp
            let pathUri = pathUri_main[1].split("/")
            //lets loop
            for (let vi = 1; vi <= pathUri.length; vi++) {
                // check for area
                if (typeof pathUri[vi] === "undefined") {
                    continue
                }

                // Area
                if (pathUri[vi].indexOf("in-") >= 0) {
                    areaVal = removeSpecialChar(pathUri[vi].replace("in-", ""), " ")
                }

                // Bedrooms
                if (pathUri[vi].indexOf("-and-more-") >= 0) {
                    bedVal = pathUri[vi].replace("-and-more-bedrooms", "")
                }

                // Property type
                if (pathUri[vi].indexOf("type-") >= 0) {
                    buildingval = pathUri[vi].replace("type-", "")
                }

                // Price
                if (
                pathUri[vi].indexOf("between-") >= 0 ||
                pathUri[vi].indexOf("above-") >= 0 ||
                pathUri[vi].indexOf("below-") >= 0
                ) {
                    let priceFilt1 = pathUri[vi].split("above-")
                    if (priceFilt1[1]) {
                        minpriceVal = priceFilt1[1]
                    }
                    let priceFilt2 = pathUri[vi].split("below-")
                    if (priceFilt2[1]) {
                        maxpriceVal = priceFilt2[1]
                    }
                    let priceFilt3 = pathUri[vi].split("between-")
                    if (priceFilt3[1]) {
                        let priceFilt4 = priceFilt3[1].split("-and-")
                        minpriceVal = priceFilt4[0]
                        maxpriceVal = priceFilt4[1]
                    }
                }

                // Sort by
                if (pathUri[vi].indexOf("sortby-") >= 0) {
                    let sortVal_filt = pathUri[vi].replace("sortby-", "")

                    if (sortVal_filt === "") {
                        sortVal = process.env.GATSBY_ALGOLIA_INDEX_NAME;
                    }

                    if (sortVal_filt === "price-asc") {
                        sortVal = process.env.GATSBY_ALGOLIA_INDEX_NAME + "_price_asc"
                    }

                    if (sortVal_filt === "price-desc") {
                        sortVal = process.env.GATSBY_ALGOLIA_INDEX_NAME + "_price_desc"
                    }
                }

                // Include Sold
                if (pathUri[vi].indexOf("includes-") >= 0) {
                    let sortVal_filt = pathUri[vi].replace("includes-", "")
                    soldVal = pathUri[vi].replace("includes-", "")
                    if(propertyTypeVal === "residential" && searchtypeVal === "sales" && soldVal === "sold") {
                        statusVal = propertyStatus[0].sales_sold
                    }
                    if(propertyTypeVal === "residential" && searchtypeVal === "lettings" && soldVal === "let-agreed") {
                        statusVal = propertyStatus[1].lettings_agreed
                    }
                }

                // Page
                if (pathUri[vi].indexOf("page") >= 0) {
                    pageVal = pathUri[vi].replace("page-", "")
                }

                if (pathUri[vi].indexOf("map-view") >= 0) {
                    layoutVal = "map"
                }
            }
        }
        var mydatarr = []
        mydatarr['indexVal'] = index_name
        mydatarr['departmentVal'] = departmentVal
        mydatarr['searchtypeVal'] = searchtypeVal
        mydatarr['areaVal'] = areaVal
        mydatarr['bedVal'] = bedVal
        mydatarr['minpriceVal'] = minpriceVal
        mydatarr['maxpriceVal'] = maxpriceVal
        mydatarr['pageVal'] = pageVal
        mydatarr['buildingval'] = buildingval
        mydatarr['sortVal'] = sortVal
        mydatarr['soldVal'] = soldVal
        mydatarr['layoutVal'] = layoutVal
        mydatarr['statusVal'] = statusVal
        mydatarr['propertyTypeVal'] = propertyTypeVal
        return mydatarr
    }
    return false
}

export default parseResultsUrl
