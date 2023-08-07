import { graphql } from 'gatsby';

export const BannerSectionFragment = graphql`
    fragment BannerSectionFragment on STRAPI__COMPONENT_COMPONENTS_BANNER_SECTION {
        cta_1_title
        cta_2_title
        image {
            url
            alternativeText
        }
        banner_title
        banner_content {
            data {
                banner_content
            }
        }
        cta_1_link {
            ...MenuFragment
        }
        cta_2_link {
            ...MenuFragment
        }
    }
`;

export const GlobalModuleFragment = graphql`
    fragment GlobalModuleFragment on STRAPI__COMPONENT_PAGE_MODULES_GLOBAL_MODULE {
        id
        select_module
        strapi_component
    }
`;

export const PlainContentFragment = graphql`
    fragment PlainContentFragment on STRAPI__COMPONENT_PAGE_MODULES_PLAIN_CONTENT {
        strapi_component
        cta_1_title
        cta_2_title
        title
        layout
        cta_1_link {
            ...MenuFragment
        }
        cta_2_link {
            ...MenuFragment
        }
        content {
            data {
                content
            }
        }
    }
`;

export const ImageAndContentFragment = graphql`
    fragment ImageAndContentFragment on STRAPI__COMPONENT_PAGE_MODULES_IMAGE_AND_CONTENT {
        id
        image_alignment
        subscribe_form
        background_color_transparent
        description {
            data {
                description
            }
        }
        strapi_component
        image {
            url
            alternativeText
        }
        cta_title
        cta_link {
            ...MenuFragment
        }
    }
`;

export const TextModuleFragment = graphql`
    fragment TextModuleFragment on STRAPI__COMPONENT_PAGE_MODULES_TEXT_MODULE {
        id
        Statistics {
            stats_description
            stats_title
        }
        short_description {
            data {
                short_description
            }
        }
        strapi_component
        title
        layout
        cta_title
        cta_link {
            ...MenuFragment
        }
        right_tiles_module_title
        add_new {
            title
            link {
                ...MenuFragment
            }
            tile_image {
                alternativeText
                url
            }
        }
    }
`;

export const VideoReviewFragment = graphql`
    fragment VideoReviewFragment on STRAPI__COMPONENT_PAGE_MODULES_VIDEO_REVIEW {
        add {
            video_link
            image {
              alternativeText
              url
            }
        }
        strapi_component
    }
`;

export const ValuationModuleFragment = graphql`
    fragment ValuationModuleFragment on STRAPI__COMPONENT_PAGE_MODULES_VALUATION_MODULE {
        strapi_component
        add_details {
            title
            content {
                data {
                    content
                }
            }
            cta_title
            cta_link {
                ...MenuFragment
            }
            image {
                alternativeText
                url
            }
        }
    }
`;

export const ImageFragment = graphql`
    fragment ImageFragment on STRAPI__COMPONENT_PAGE_MODULES_IMAGE {
        strapi_component
        image {
            alternativeText
            url
        }
    }
`;

export const AccordionFragment = graphql`
    fragment AccordionFragment on STRAPI__COMPONENT_PAGE_MODULES_ACCORDION {
        strapi_component
        add {
            title
            content {
                data {
                    content
                }
            }
        }
    }
`;

export const PageImageTransformFragment = graphql`
    fragment PageImageTransformFragment on STRAPI_PAGE_IMAGETRANSFORMS_JSONNODE {
        banner_section_banner_image_Transforms
        explore_section_tile_image_Transforms
        tile_section_image_Transforms
        valuation_section_tile_image_Transforms
    }
`;