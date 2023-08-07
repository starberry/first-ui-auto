import { useStaticQuery, graphql } from "gatsby"

export const useAllStrapiOffice = () => {
  return useStaticQuery(
    graphql`
      query useAllStrapiOffice {
        allStrapiOffice(filter: {publish: {eq: true}}) {
          nodes {
            title
            property_office_mapping
            phone
            email
            address
            image {
              url
            }
            imagetransforms {
              image_Transforms
            }
            strapi_id
          }
        }
      }
    `
  )
}