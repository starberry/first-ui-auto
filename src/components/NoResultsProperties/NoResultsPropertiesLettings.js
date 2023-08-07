import React, { useState } from "react";
import { Link } from "gatsby";
import { useStaticQuery, graphql } from "gatsby"

const PropertyCard = React.lazy(() => import("../PropertyCard/PropertyCard"));

const NoResultPropertiesLet = (props) => {

    const data = useStaticQuery(graphql`
        query {
            allStrapiProperty(filter: {publish: {eq: true}, search_type: {eq: "lettings"}}, limit: 6) {
                edges {
                    node {
                        id
                        slug
                        crm_id
                        strapi_id
                        images {
                            strapi_json_value {
                                url
                            }
                        }
                        price_qualifier
                        price
                        search_type
                        title
                        display_address
                        imagetransforms {
                            images_Transforms
                        }
                    }
                }
            }
        }
    `);

    const menus = data.allStrapiProperty.edges;

    return (
        <div className="property-card-wrapper-main">
            {menus.map(({ node }, i) => {

                let processedImages = JSON.stringify({});
                if (node?.imagetransforms?.images_Transforms) {
                    processedImages = node?.imagetransforms?.images_Transforms;
                }

                return (
                    <PropertyCard myindexval={i} data={node} key={i} processedImages={processedImages} tag="no-result" />
                )
            }
            )}
        </div>
    )
}

export default NoResultPropertiesLet