const useSearchResultsSEO = (action, area, property_type, bedroom, minprice, maxprice, propertyTypeVal) => {
 
    let pagetitle = ''
    let pageh1 = ''
    let pagemetadesc = ''
    let introcopy = ''

    let myactin = "for sale"
    if(action == "lettings")
      myactin = "to rent"
    
    let myarea = area.charAt(0).toUpperCase() + area.substring(1).replaceAll('-', ' ')

    let myproperty = "Property"
    if(propertyTypeVal === "new_developments") {
        myproperty = "New homes"
    }
    if(property_type){
        myproperty = property_type.charAt(0).toUpperCase() + property_type.substring(1).replaceAll('-', ' ')+'s'
    }

    let mybedroom = ''
    if(bedroom > 0){
        mybedroom = ` with more than ${bedroom} bedrooms`
    }

    let mypricestr = ''
    if (minprice > 0 && maxprice > 0) {
        mypricestr = ` between ${currencyFormat(minprice)} and ${currencyFormat(maxprice)}`;
    } else if (maxprice > 0) {
        mypricestr = ` below ${currencyFormat(maxprice)}`;
    } else if (minprice > 0) {
        mypricestr = ` above ${currencyFormat(minprice)}`;
    }
    
    pagetitle = `${myproperty} ${myactin} ${myarea ? 'in '+myarea:''}${mybedroom}${mypricestr} | ${process.env.GATSBY_SITE_NAME}`

    pageh1 = `${myproperty} ${myactin} ${myarea ? 'in '+myarea:''}${mybedroom}${mypricestr}`

    pagemetadesc = `Explore our latest collection of property ${myactin} ${myarea ? 'in '+myarea:''}. Contact ${process.env.GATSBY_SITE_NAME} ${myarea ? 'in '+myarea:''} to find the right property for you.`
    if(area == ""){
        pagemetadesc = `Explore our latest collection of property ${myactin}. Contact ${process.env.GATSBY_SITE_NAME} to find the right property for you.`
    }
    if(area != (process.env.GATSBY_DEFAULT_AREA.toLowerCase()) && area != ""){
        pagemetadesc = `Explore our range of property ${myactin} ${myarea ? 'in '+myarea:''}. Contact our property experts to find the right property ${myactin} ${myarea ? 'in '+myarea:''}.`
    }
    if(property_type){
        pagemetadesc = `Looking for ${myproperty} ${myactin} ${myarea ? 'in '+myarea:''}? Property experts from ${process.env.GATSBY_SITE_NAME} are here to help.`
    }
    if(bedroom > 0){
        pagemetadesc = `Explore property ${myactin} ${myarea ? 'in '+myarea:''}${mybedroom} here. Contact our expert estate agents today to get assistance in finding the right property ${myarea ? 'in '+myarea:''}.`
    }
    if(mypricestr){
        pagemetadesc = `Locate the right property ${myactin} ${myarea ? 'in '+myarea:''}${mypricestr} with ${process.env.GATSBY_SITE_NAME}. Book an appointment with one of our property experts ${myactin}.`
    }
    if(mypricestr && myproperty != "Property"){
        pagemetadesc = `Check out the latest collection of ${myproperty} ${myactin} ${myarea ? 'in '+myarea:''}${mypricestr} with ${process.env.GATSBY_SITE_NAME}.`
    }
    if(mypricestr && bedroom > 0){
        pagemetadesc = `Explore the list of property ${myactin} ${myarea ? 'in '+myarea:''}${mybedroom}${mypricestr} with ${process.env.GATSBY_SITE_NAME} and request a viewing for the property that interests you.`
    }
    if(myproperty != "Property" && bedroom > 0){
        pagemetadesc = `Find the latest collection of ${myproperty} ${myactin} ${myarea ? 'in '+myarea:''}${mybedroom}. Contact ${process.env.GATSBY_SITE_NAME} and letting agents in ${myactin}, to arrange a viewing.`
    }
    if(myproperty != "Property" && bedroom > 0 && mypricestr && area != "london"){
        pagemetadesc = `Explore ${myproperty} ${myactin} ${myarea ? 'in '+myarea:''}${mybedroom}${mypricestr} available with ${process.env.GATSBY_SITE_NAME}. Contact one of our estate agents for assistance in finding your property ${myarea ? 'in '+myarea:''}.`
    }

    introcopy = `Explore our ${pageh1.replace("Property", "property")}. For more information about property ${myactin} ${myarea ? 'in '+myarea:''}, please get in touch with `
    
    return {
        pagetitle,
        pageh1,
        pagemetadesc,
        introcopy
    }
}
  
export default useSearchResultsSEO
  
const currencyFormat = (num, currency = '£', withSpace = false) => {
    var filterNum = filterNumber(num);
    if (!filterNum) {
        return `${currency} 0`
    }
    if (withSpace) {
        return `${currency} ${new Intl.NumberFormat("en-US", {}).format(filterNum)}`
    } else {
        return `${currency}${new Intl.NumberFormat("en-US", {}).format(filterNum)}`
    }

}

const filterNumber = (str) => {
    if (!str) return 0
    str = str.toString()
    return parseInt(str.replace(/[^\d.]/g, ""), 10)
}

const numberFormat = num => {
    if (!num) return 0
    return new Intl.NumberFormat("en-US", {}).format(num)
}