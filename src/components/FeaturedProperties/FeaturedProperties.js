import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import FeaturedstbList from "./FeaturedstbList";
import FeaturedSales from "./FeaturedSales";

const FeaturedProperties = (props) => {

    const data = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        featured
                    }
                }
            }
        `
    )

    const featured = data?.site?.siteMetadata?.featured
    return (
        <>
            {featured === "cms" ? <FeaturedSales /> : <FeaturedstbList />}
        </>
    )
}

export default FeaturedProperties