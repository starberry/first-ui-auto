//import { navigate } from "gatsby"
// import {removeSpecialChar} from "../common/utils"
const {removeSpecialChar } = require("@starberry/gatsby-theme-utils/Common/Utils")

const createResultsUrl = (props) => {
    //lets form the URL
    let searchtypePath = ""
    let areaPath = ""
    let bedPath = ""
    let pricePath = ""
    let buildingPath = ""
    let sortPath = ""
    let layoutPath = ""
    let soldPath = ""

    if (props?.search_type === "buy") {
        searchtypePath = "for-sale/"
    } else if (props?.search_type === "rent") {
        searchtypePath = "to-rent/"
    } else {
        searchtypePath = "new-homes/for-sale/"
    }
    if (props?.area) {
        // first trim the value for start and end empty spaces; remove one more '-'
        // let areafilt = (props?.area).trim();
        // areafilt = areafilt.replace(/-+/gi,'-')
        // //remove special char except , and space
        // areafilt = areafilt.replace(/[^-,a-zA-Z ]/g, '');
        // // split using comma
        // areafilt = areafilt.split(",");
        // let areafiltUpd = areafilt.map(area => {
        //     if (area.charAt(0) == '-') {
        //         area = area.substring(1);
        //     }
        //     if (area.charAt((area.length)-1) == '-') {
        //         area = area.substring(0,area.length-1);
        //     }
        //     return area;
        // })
        // // again trim the values & join using -and- & replace multiple space
        // areaPath = "in-" + encodeURIComponent(decodeURIComponent(areafiltUpd.join("-and-"))) + "/"
        areaPath = "in-" + encodeURIComponent(decodeURIComponent(removeSpecialChar(props?.area))) + "/"
    } else {
        if (process.env.GATSBY_DEFAULT_AREA) {
            areaPath = `in-${(process.env.GATSBY_DEFAULT_AREA).toLowerCase()}/`
        } else {
            areaPath = ``
        }
    }
    if (props?.bedrooms) {
        if (parseInt(props?.bedrooms) === 0) {
            bedPath = "studio/"
        }

        if (parseInt(props?.bedrooms) > 0) {
            bedPath = props?.bedrooms + "-and-more-bedrooms/"
        }
    }
    if ( props?.min_price || props?.max_price ) {
        if (props?.min_price&& props?.max_price) {
            pricePath = "between-" + props?.min_price + "-and-" + props?.max_price + '/';
        } else if (props?.max_price) {
            pricePath = "below-" + props?.max_price + '/';
        } else if (props?.min_price) {
            pricePath = "above-" + props?.min_price + '/';
        }
    }
    if (props?.building_type) {
        buildingPath = "type-" + props?.building_type.replace(/ /g, '-') + "/"
    }
    if (props?.sortby) {
        if (props?.sortby === process.env.GATSBY_ALGOLIA_INDEX_NAME + "_price_asc") {
            sortPath = "sortby-price-asc/";
        }
        if (props?.sortby === process.env.GATSBY_ALGOLIA_INDEX_NAME + "_price_desc") {
            sortPath = "sortby-price-desc/";
        }
    }
    if (props?.includesold === "sold") {
        soldPath = "includes-sold/"
    }
    if (props?.includesold === "let-agreed") {
        soldPath = "includes-let-agreed/"
    }
    if (props?.layout) {
        layoutPath = "map-view/";
    }
    let myUrl = `/property/${searchtypePath}${areaPath}${bedPath}${pricePath}${buildingPath}${sortPath}${soldPath}${layoutPath}`;

    myUrl = myUrl.toLowerCase().replace(/ /g, '-');

    return myUrl;//navigate(myUrl)
}

//export default createResultsUrl
module.exports.createResultsUrl = createResultsUrl
