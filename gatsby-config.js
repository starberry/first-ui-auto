/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */
require("dotenv").config({
  path: `.env`,
});
/**
 * @type {import('gatsby').GatsbyConfig}
 */
const strapiConfig = {
  apiURL: process.env.GATSBY_STRAPI_SRC,
  accessToken: process.env.GATSBY_STRAPI_API_TOKEN,
  collectionTypes: ["property","new-developments", "menu" , "area", 
  {
    singularName: "page",
    queryParams: {
      // Populate media and relations
      // Make sure to not specify the fields key so the api always returns the updatedAt
      populate: {
        seo: '*',
        choose_menu: '*',
        select_popular_search: '*',
        banner: {
          populate: {
            image: '*',
            cta_1_link:'*',
            cta_2_link:'*',
          }
        },
        Add_Page_Modules: {
          populate: {
            text_module: '*',
            Statistics: '*',
            image: '*',
            cta_link:'*',
            cta_1_link:'*',
            cta_2_link:'*',
            add_new:{
              populate: {
                link:'*',
                tile_image:'*',
              },
            },
            add_details: {
              populate: {
                cta_link:'*',
                image: '*',
              },
            },
            add: {
              populate: {
                image: '*',
              },
            },
          }
        }
      },
    },
  }, 
  {
    singularName: "burger-menu",
    queryParams: {
      // Populate media and relations
      // Make sure to not specify the fields key so the api always returns the updatedAt
      populate: {
        link: '*',
        external_link: '*',
        add_new: {
          populate: {
            link: '*',
            external_link: '*',
          },
        },
      },
    },
  }, 
  {
    singularName: "blog",
    queryParams: {
      // Populate media and relations
      // Make sure to not specify the fields key so the api always returns the updatedAt
      populate: {
        tile_image: '*',
        banner_image: '*',
        author: '*',
        add_blog_content: {
          populate: {
            image: '*',
            plain_content: '*',
            add:'*',
          },
        },
      },
    },
  }, 
  {
    singularName: "area-guide",
    queryParams: {
      // Populate media and relations
      // Make sure to not specify the fields key so the api always returns the updatedAt
      populate: {
        tile_image: '*',
        banner_image: '*',
        areas: "*",
        add_content: {
          populate: {
            image: '*',
            plain_content: '*',
            add:'*',
          },
        },
      },
    },
  }, 
  {
    singularName: "team",
    queryParams: {
      // Populate media and relations
      // Make sure to not specify the fields key so the api always returns the updatedAt
      populate: {
        image: '*',
        seo: '*',
      },
    },
  }, 
  {
    singularName: "career",
    queryParams: {
      // Populate media and relations
      // Make sure to not specify the fields key so the api always returns the updatedAt
      populate: {
        image: '*',
        seo: '*',
      },
    },
  }, 
  {
    singularName: "office",
    queryParams: {
      // Populate media and relations
      // Make sure to not specify the fields key so the api always returns the updatedAt
      populate: {
        image: '*',
        select_team: '*',
      },
    },
  }, 
  {
    singularName: "popular-search",
    queryParams: {
      // Populate media and relations
      // Make sure to not specify the fields key so the api always returns the updatedAt
      populate: {
        new_column: {
          populate: {
            add_new_link: {
              populate: {
                link: '*',
              },
            },
          },
        },
        pages:'*',
      },
    },
  }],
  singleTypes: [{
    singularName: "site-config",
    queryParams: {
      populate: {
        Top_Navigation: {
          populate: {
            link: '*',
          },
        },
        Bottom_Navigation: {
          populate: {
            link: '*',
          },
        },
        add_contact_details: '*',
        sidebar_cta_link: '*',
        global_footer_module: {
          populate: {
            image: '*',
            cta_link: '*',
          },
        },
        Footer_Links: {
          populate: {
            add_link: {
              populate: {
                link: '*',
              },
            },
          },
        },
      },
    },
  },{
    singularName: "theme-config",
    queryParams: {
      populate: {
        logo_dark: '*',
        logo_light: '*',
      },
    },
  }],
  skipFileDownloads: true,
};
module.exports = {
  siteMetadata: {
    title: process.env.GATSBY_SITE_NAME,
    description: `${process.env.GATSBY_SITE_NAME} have a true passion for selling & letting houses.`,
    author: `@starberry`,
    siteUrl: process.env.GATSBY_SITE_URL,
    env: `development`,//production, stage
    liveChat: false,
    footerContact: "default",
    footerLogo: true,
    youtubeLink: "https://www.youtube.com/channel/UCpxl2y_uqREjWR9kB74eEjQ",
    featured: "cms",
    content: {
      feature_property_content: "",
      footer_content: ""
    },
    pageLinks: {
      news: "property-news-and-insights",
      areaguide: "about/area-guides",
      team: "about/our-team",
      career: "about/careers",
      office: "contact",
    },
    mailVars: {
      contact_email: "sales@petergreatorex.co.uk",
      company_phone: "01225 904999",
      available_time: "9.00 am - 5.30 pm Monday - Friday",
      available_days: "9.30 am - 1.30 pm Saturday",
      address: "Queen Street, Bath, BA1 1HE",
      primary_color: "#BFBBAC",
      enquiry: '/contact/general-enquiry/',
      valuation: '/property-valuation/'
    },
    elfSight: {
      review: false,
      review_carousel : "",
      review_badge : "",
      review_page : "",
      social_wall: ""
    },
    allAgent: {
      review: false,
      id: 1
    },
    estasReviews: {
      review: false,
      estas_key: "" 
    }
  },
  trailingSlash: `always`,
  plugins: [
    `gatsby-plugin-netlify`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-theme-starberry-sirius`,
        short_name: `sirius`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `${__dirname}/src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: require.resolve(`./plugins/gatsby-source-stb-strapi`),
      options: strapiConfig,
    },
    {
      resolve: `gatsby-plugin-advanced-sitemap`,
      options: {
          exclude: [
              `/404`,
              `/404.html`,
              `/property/`,
              `/home/`,
              `/terms-and-conditions/`,
              `/privacy-policy/`,
              `/cookie-policy/`,
              `/sitemap/`,
          ],
          additionalSitemaps: [ 
            // optional: add additional sitemaps, which are e. g. generated somewhere else, but need to be indexed for this domain
            // {
            //   url: `${process.env.GATSBY_SITE_URL}/properties.xml`,
            // }
            {
              url: `${process.env.GATSBY_SITE_URL}/search.xml`,
            }
        ],
      }
    },
    {
      resolve: `gatsby-plugin-force-trailing-slashes`,
      options: {
        excludedPaths: [`/404.html`],
      },
    }
  ],
}
