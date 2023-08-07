import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import FeaturedstbList from "./FeaturedstbListLet";
import FeaturedLet from "./FeaturedLet";

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
            {featured === "cms" ? <FeaturedLet /> : <FeaturedstbList />}
        </>
    )
}

export default FeaturedProperties