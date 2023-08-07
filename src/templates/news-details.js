import React from "react";
import { graphql } from 'gatsby'
import loadable from "@loadable/component";
import LayoutTwo from "../components/layoutTwo";
import { PageLinks } from "../common/site/page-static-links";
import Seo from "../components/seo"
const BreadcrumbModule = loadable(() => import("../components/BreadcrumbModule/BreadcrumbModule"));
const NewDetailIntro = loadable(() => import("../components/NewsDetailIntro/NewsDetailIntro"));
const NewsDetailDesc = loadable(() => import("../components/NewsDetailDesc/NewsDetailDesc"));
const ValuationModule = loadable(() => import("../components/ValuationModule/ValuationModuleGlobal"));
const MoreNewsModule = loadable(() => import("../components/MoreNews/MoreNews"));

const NewsDetail = ({ data }, props) => {
    const PageData = data?.strapiBlog
    const MoreNews = data?.allStrapiBlog.edges

    let breadcrumData;

    if (PageLinks?.news_parent_label) {
        breadcrumData = { parentname: PageLinks.news_parent_label, parent: PageLinks.news_parent, subparentname: PageLinks.news_label, subparent: PageLinks.news, pagename: PageData.title }
    } else {
        breadcrumData = { parentname: PageLinks.news_label, parent: PageLinks.news, pagename: PageData.title }
    }

    return (
        <LayoutTwo popularSearch="Generic pages">
            <div className="layout-padding-top">
                <BreadcrumbModule {...breadcrumData} />

                <NewDetailIntro {...PageData} />

                <NewsDetailDesc {...PageData} />

                <MoreNewsModule data={MoreNews} />

                <ValuationModule />
            </div>
        </LayoutTwo>
    )
}

export const Head = ({ data }) => {
    const PageData = data?.strapiBlog
    var ldJson = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": typeof window !== 'undefined' ? window.location.href : ''
        },
        "headline": PageData?.title,
        "image": PageData?.banner_image ? PageData?.banner_image?.url : '', 
        "datePublished": PageData?.publishedAt,
        "dateModified": PageData?.updatedAt,
        "author": {
            "@type": "Person",
            "name": PageData.author ? PageData.author?.title : process.env.GATSBY_SITE_NAME
        },
      
        "publisher": {
            "@type": "Organization",
            "name": process.env.GATSBY_SITE_NAME,
            "logo": {
                "@type": "ImageObject",
                "url": process.env.GATSBY_SITE_URL + `/images/logo.png`
            }
        },
        "description": `Read about ${PageData.title} here and subscribe to our newsletter to stay up-to-date about everything going on at ${process.env.GATSBY_SITE_NAME}.`
    }

    return (
        <Seo title={PageData.title} description={`Read about ${PageData.title} here and subscribe to our newsletter to stay up-to-date about everything going on at ${process.env.GATSBY_SITE_NAME}.`}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
            />
        </Seo>
    )
}

export default NewsDetail


export const query = graphql`
query ($page_id: Int) {
    strapiBlog(strapi_id: {eq: $page_id}) {
        ...BlogFragment
        banner_image {
          alternativeText
          url
        }
        author {
          slug
          title
        }        
        publishedAt(formatString: "YYYY-MM-DD")
        updatedAt(formatString: "YYYY-MM-DD")
        add_blog_content {
            ... on STRAPI__COMPONENT_PAGE_MODULES_PLAIN_CONTENT {
                ...PlainContentFragment
            }
            ... on STRAPI__COMPONENT_PAGE_MODULES_IMAGE {
                ...ImageFragment
            }
            ... on STRAPI__COMPONENT_PAGE_MODULES_ACCORDION {
                ...AccordionFragment
            }
        }
    }
    
    allStrapiBlog(filter: {publish: {eq: true}, strapi_id: {ne: $page_id}}) {
        edges {
            node {
                ...BlogFragment
                tile_image {
                    alternativeText
                    url
                }
            }
        }
    }
  }
`