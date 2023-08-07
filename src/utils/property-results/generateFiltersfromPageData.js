const generateFiltersfromPageData = (departmentVal,searchtypeVal,areaVal,bedVal,minpriceVal,maxpriceVal,statusVal,buildingval) => {
    // lets from the filters 
    // here the search login lives

    var myfilter = []

    //facet filters
    if ((Array.isArray(departmentVal))) {
        myfilter.push('(department:"' + (departmentVal).join('" OR department:"') + '")')
    }
    // if(departmentVal){
    //     myfilter.push("(department:"+departmentVal+")")
    // }
    if(searchtypeVal){
        myfilter.push("(search_type:"+searchtypeVal+")")
    }
    // if(areaVal && areaVal !== "london"){
    //     myfilter.push("(area:"+areaVal+" OR post_code:"+areaVal+" OR display_address:"+areaVal+")")
    // }
    if(buildingval){
        myfilter.push("(building:"+buildingval+")")
    }
    if ((Array.isArray(statusVal))) {
        myfilter.push('(status:"' + (statusVal).join('" OR status:"') + '")')
    }
    //numberic filters
    if(bedVal && bedVal > 0){
        myfilter.push("(bedroom >= "+bedVal+")")
    }
    if( (minpriceVal && minpriceVal > 0) && (maxpriceVal && maxpriceVal > 0) ){
        myfilter.push("(price >= "+minpriceVal+" AND price <= "+maxpriceVal+")")
    } else if(maxpriceVal && maxpriceVal > 0) {
        myfilter.push("(price <= "+maxpriceVal+")")
    } else if(minpriceVal && minpriceVal > 0) {
        myfilter.push("(price >= "+minpriceVal+")")
    }
    // if(pageVal){
    //     myfilter.push("(page: "+(pageVal)+")")
    // }
    return myfilter.join(' AND ')
}

export default generateFiltersfromPageData
