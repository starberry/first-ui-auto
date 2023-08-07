import { graphql } from 'gatsby';


export const MenuFragment = graphql`
    fragment MenuFragment on STRAPI_MENU {
        id
        slug
        title
        target_window
        link_type
        external_link
        strapi_parent {
            title
            slug
        }
    }
`;


export const PageFragment = graphql`
    fragment PageFragment on STRAPI_PAGE {
        title
        layout
        id
        strapi_id
        custom_css_classname
        imagetransforms {
          ...PageImageTransformFragment
        }
        seo {
          ...SeoFragment
        }
        select_popular_search {
          title
        }
        banner {
          ...BannerSectionFragment
        }
        choose_menu {
          ...MenuFragment
        }
    }
`;

export const TeamFragment = graphql`
    fragment TeamFragment on STRAPI_TEAM {
        title
        designation
        email
        strapi_id
        phone
        image {
          alternativeText
          url
        }
        imagetransforms {
          image_Transforms
        }
    }
`;


export const BlogFragment = graphql`
    fragment BlogFragment on STRAPI_BLOG {
        slug
        strapi_id
        title
        date(formatString: "DD MMM, yyyy")
        category {
            strapi_json_value
        }
        imagetransforms {
            tile_image_Transforms
            banner_image_Transforms
        }
    }
`;


export const AreaGuideFragment = graphql`
    fragment AreaGuideFragment on STRAPI_AREA_GUIDE {
        slug
        strapi_id
        title
        imagetransforms {
            tile_image_Transforms
            
        }
    }
`;

export const CareerFragment = graphql`
    fragment CareerFragment on STRAPI_CAREER {
        title
        salary
        video_link
        location
        strapi_id
        category
        slug
    }
`;
