import React from "react";
import HTMLReactParser from "html-react-parser"
import _ from "lodash";

const ContentModule = ({Content}) => {
    if(!_.isEmpty(Content)){
        return (
            HTMLReactParser(Content)
        )
    }
    return '';
   
}
export default ContentModule;