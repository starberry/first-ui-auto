import { graphql } from 'gatsby';

export const SeoFragment = graphql`
    fragment SeoFragment on STRAPI__COMPONENT_SHARED_SEO {
        metaDescription
        metaTitle
    }
`;
