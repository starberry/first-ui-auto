/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
const path = require("path")
const fs = require('fs');
const axios = require('axios').default;
const { toXML } = require('jstoxml');

const { PageLinks } = require('./src/common/site/page-static-links.js');
const { createResultsUrl } = require('./src/utils/property-results/createResultsUrl.js');

let search_type;
let areas;
let bedrooms;
let min_price;
let max_price;
let property_type;
let sortby_opt;

if (fs.existsSync('./src/gatsby-theme-starberry-sirius/search_config/search_type.json')) {
  search_type = JSON.parse(fs.readFileSync('./src/gatsby-theme-starberry-sirius/search_config/search_type.json', 'utf8'));
} else {
  search_type = JSON.parse(fs.readFileSync('./src/search_config/search_type.json', 'utf8'));
}

areas = JSON.parse(fs.readFileSync('./static/areas.json', 'utf8'));

if (fs.existsSync('./src/gatsby-theme-starberry-sirius/search_config/bedrooms.json')) {
  bedrooms = JSON.parse(fs.readFileSync('./src/gatsby-theme-starberry-sirius/search_config/bedrooms.json', 'utf8'));
} else {
  bedrooms = JSON.parse(fs.readFileSync('./src/search_config/bedrooms.json', 'utf8'));
}

if (fs.existsSync('./src/gatsby-theme-starberry-sirius/search_config/min_price.json')) {
  min_price = JSON.parse(fs.readFileSync('./src/gatsby-theme-starberry-sirius/search_config/min_price.json', 'utf8'));
} else {
  min_price = JSON.parse(fs.readFileSync('./src/search_config/min_price.json', 'utf8'));
}

if (fs.existsSync('./src/gatsby-theme-starberry-sirius/search_config/max_price.json')) {
  max_price = JSON.parse(fs.readFileSync('./src/gatsby-theme-starberry-sirius/search_config/max_price.json', 'utf8'));
} else {
  max_price = JSON.parse(fs.readFileSync('./src/search_config/max_price.json', 'utf8'));
}

if (fs.existsSync('./src/gatsby-theme-starberry-sirius/search_config/property_type.json')) {
  property_type = JSON.parse(fs.readFileSync('./src/gatsby-theme-starberry-sirius/search_config/property_type.json', 'utf8'));
} else {
  property_type = JSON.parse(fs.readFileSync('./src/search_config/property_type.json', 'utf8'));
}

sortby_opt = [process.env.GATSBY_ALGOLIA_INDEX_NAME + "_price_asc",process.env.GATSBY_ALGOLIA_INDEX_NAME + "_price_desc"]

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type STRAPI_PROPERTY implements Node {
      featured: Boolean      
    }
  `
  createTypes(typeDefs)
}
//this already implemented in the followings:
//https://github.com/starberry/tempocasa-gatsby/blob/master/gatsby-node.js#L310
//https://github.com/starberry/cruxcareers-gatsby/blob/master/gatsby-node.js#L38

// even we use DSG for the search filters we still need this to generate
// free text search pages
exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions
  // Property search results
  if (page.path === `/property//`) {
    page.matchPath = `/property/*`
    createPage(page)
  } else if (page.path.match(/^\/property\//)) {
    page.matchPath = "/property/*"
    createPage(page)
  }
}

exports.onPreBuild = async () => {
  const propAreajson = () => axios.get(`${process.env.GATSBY_STRAPI_SRC}/json/areas.json`);
  const allpropareajsondata = await propAreajson();

  if (allpropareajsondata) {
    fs.writeFileSync("./static/areas.json", JSON.stringify(allpropareajsondata.data), { flag: 'w+' })
  }

  areas = JSON.parse(fs.readFileSync('./static/areas.json', 'utf8'));

  const themeCss = () => axios.get(`${process.env.GATSBY_STRAPI_SRC}/api/theme-config`);
  const allthemedatacss = await themeCss();

  if (allthemedatacss) {
    fs.writeFileSync("./static/sitevariable.css", (allthemedatacss.data?.data?.attributes.config).replace( /(<([^>]+)>)/ig, '').replace(/\&nbsp;/g, ''), { flag: 'w+' })
  }

}

exports.onPostBuild = async (gatsbyNodeHelpers) => {

  // const propAreajson = () => axios.get(`${process.env.GATSBY_STRAPI_SRC}/json/areas.json`);
  // const allpropareajsondata = await propAreajson();

  // if (allpropareajsondata) {
  //   fs.writeFileSync("./static/areas.json", JSON.stringify(allpropareajsondata.data), { flag: 'w+' })
  // }

  areas = JSON.parse(fs.readFileSync('./static/areas.json', 'utf8'));

  //robots.txt update when its production
  let robotsTxt = "";
  robotsTxt = "User-agent: *" + "\n";
  if ("production" == process.env.MY_SERVER_ENV && (process.env.GATSBY_SITE_URL).indexOf("starberry") < 0 ) { // live site
    robotsTxt += "Disallow: /email/" + "\n";
  } else {// dev site
    robotsTxt += "Disallow: /" + "\n";
  }
  robotsTxt += "Sitemap: " + process.env.GATSBY_SITE_URL + "/sitemap.xml" + "\n";
  robotsTxt += "Host: " + process.env.GATSBY_SITE_URL;
  fs.writeFileSync('./public/robots.txt', robotsTxt);
  //end robots txt

  // create results.xml
  let myproparr = []
  let now = new Date();
  now.setSeconds(0, 0);
  let datetime = now.toISOString();//.replace(/T/, " ").replace(/:00.000Z/, "");

  search_type.map((ptype) => {
    let ptypestr = ""
    if(ptype.value == "buy"){
      ptypestr = "for-sale"
    } else if(ptype.value == "rent"){
      ptypestr = "to-rent"
    }
    areas.map((area) => {

      let uriStr = ""
      if(area.slug != "") {
        uriStr = "property/"+ptypestr+"/in-"+area.slug

        myproparr.push( {"url": {"loc": `${process.env.GATSBY_SITE_URL}/${uriStr}/`, "lastmod": `${datetime}`} } );

        property_type.map((building, index) => {

          if(building.value != "") {

            uriStr = "property/"+ptypestr+"/in-"+area.slug+"/type-"+building.value

            myproparr.push( {"url": {"loc": `${process.env.GATSBY_SITE_URL}/${uriStr}/`, "lastmod": `${datetime}`} } );

          }

        })
      }

    })

  })

  if (myproparr.length > 0) {
    const xmlOptions = {
      header: true,
      indent: '  ',
    };

    const feed = toXML({
        _name: 'urlset',
        _content: myproparr,
        _attrs: {
          xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'
        }
    }, xmlOptions);

    try {
      // if(fs.existsSync('./public/search.xml')) {
      //   fs.unlinkSync('./public/search.xml')
      // }
      fs.writeFileSync('./public/search.xml', feed, { encoding: 'utf8' });
    
    } catch (err) {
      console.log('Cannot write file!!!', err);
    }
  }
  // done results.xml

  // create redirects.txt, it must prepand followed by proj specific 1-1, custom rules
  const propAllRedirectFeed = () => axios.get(`${process.env.GATSBY_STRAPI_SRC}/property_redirect`);
  const allpropredirectdata = await propAllRedirectFeed();

  if (allpropredirectdata) {
    fs.writeFileSync("./public/_redirects", allpropredirectdata.data, { flag: "a+" })
  }
  // done redirects.txt
}

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  areas = JSON.parse(fs.readFileSync('./static/areas.json', 'utf8'));

  // Query for markdown nodes to use in creating pages.
  const result = await graphql(
    `
      {
        site {
          siteMetadata {
            pageLinks {
              career
              news
              team
              office
              areaguide
            }
          }
        }
          
      allStrapiProperty(
        sort: {fields: createdAt, order: DESC}
        filter: {publish: {eq: true}}
      ) {
          edges {
            node {
              slug
              strapi_id
              search_type
            }
          }
        }
        
        allStrapiNewDevelopments(filter: {publish: {eq: true}}) {
          edges {
            node {
              slug
              strapi_id
            }
          }
        }
        
        allStrapiBlog(filter: {publish: {eq: true}}) {
          edges {
            node {
              slug
              strapi_id
            }
          }
        }

        allStrapiAreaGuide(filter: {publish: {eq: true}}) {
          edges {
            node {
              slug
              strapi_id
            }
          }
        }
        
        allStrapiTeam(filter: {publish: {eq: true}}) {
          edges {
            node {
              slug
              strapi_id
            }
          }
        }

        allStrapiCareer(filter: {publish: {eq: true}}) {
          edges {
            node {
              slug
              strapi_id
            }
          }
        }

        allStrapiOffice(filter: {publish: {eq: true}}) {
          edges {
            node {
              slug
              strapi_id
            }
          }
        }

        allStrapiMenu(
          filter: {publish: {eq: true}, link_type: {eq: "internal"}, page: {layout: {ne: null}}}
        ) {
          edges {
            node {
              title
              slug
              strapi_id
              page {
                layout
                id
              }
              strapi_parent {
                slug
              }
            }
          }
        }
      }
    `
  )

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const landingPageTemplate = require.resolve(`./src/templates/landing-template.js`)
  const homePageTemplate = require.resolve(`./src/templates/home-template.js`)
  const staticPageTemplate = require.resolve(`./src/templates/static-template.js`)
  const newsLandingPageTemplate = require.resolve(`./src/templates/news-landing-template.js`)
  const propertyDetailsTemplate = require.resolve(`./src/templates/property-details.js`)
  const newDevelopmentDetailsTemplate = require.resolve(`./src/templates/new-development-details`)
  const newsDetailsTemplate = require.resolve(`./src/templates/news-details.js`)
  const teamLandingPageTemplate = require.resolve(`./src/templates/team-landing-template.js`)
  const careerLandingPageTemplate = require.resolve(`./src/templates/career-landing-template.js`)
  const contactPageTemplate = require.resolve(`./src/templates/contact-template.js`)
  const valuationPageTemplate = require.resolve(`./src/templates/valuation-template.js`)
  const teamDetailsTemplate = require.resolve(`./src/templates/team-details.js`)
  const careerDetailsTemplate = require.resolve(`./src/templates/career-details.js`)
  const reviewsTemplate = require.resolve(`./src/templates/reviews-template.js`)
  const formTemplate = require.resolve(`./src/templates/form-template.js`)
  const officeDetailsTemplate = require.resolve(`./src/templates/office-details.js`)
  const areaGuideDetailsTemplate = require.resolve(`./src/templates/areaguide-details.js`)

  const menus_data = result.data.allStrapiMenu.edges;
  const news_data = result.data.allStrapiBlog.edges;
  const team_data = result.data.allStrapiTeam.edges;
  const jobs_data = result.data.allStrapiCareer.edges;
  const office_data = result.data.allStrapiOffice.edges;
  const areaguide_data = result.data.allStrapiAreaGuide.edges;
  const site_data = result.data.site.siteMetadata?.pageLinks;

// search results pages
    // generate high level pages for for-sale and to-rent;  rest pages can serve as DSG
    const propertyResultsTemplate = require.resolve(`./src/pages/property/index.js`)
    let myUrlArr = []
    search_type.map((ptype_val) => {
      myUrlArr['search_type'] = ptype_val.value
      areas.forEach((area_val) => {
        myUrlArr['area'] = ptype_val.slug
        createPage({
          path: createResultsUrl(myUrlArr),
          component: propertyResultsTemplate,
          context: {},
          //defer: true,
        })
      })
      delete myUrlArr['area'];
      bedrooms.forEach((bed_val) => {
        myUrlArr['bedrooms'] = bed_val.value
        createPage({
          path: createResultsUrl(myUrlArr),
          component: propertyResultsTemplate,
          context: {},
          defer: true,
        })
      })
      delete myUrlArr['bedrooms'];
      property_type.forEach((prop_val) => {
        myUrlArr['building_type'] = prop_val.value
        createPage({
          path: createResultsUrl(myUrlArr),
          component: propertyResultsTemplate,
          context: {},
          defer: true,
        })
      })
      delete myUrlArr['building_type'];
      // sortby_opt.forEach((sort_val) => {
      //   myUrlArr['sortby'] = sort_val
      //   createPage({
      //     path: createResultsUrl(myUrlArr),
      //     component: propertyResultsTemplate,
      //     context: {},
      //     defer: true,
      //   })
      // })
      // delete myUrlArr['sortby'];
      //map view page
      myUrlArr['layout'] = "map"
      createPage({
        path: createResultsUrl(myUrlArr),
        component: propertyResultsTemplate,
        context: {},
        defer: true,
      })
      delete myUrlArr['layout'];
      //map view
      for (const [key, minp_type] of Object.entries(min_price)) {
        minp_type.forEach((minp_val) => {
          if(minp_val.value != ""){
            myUrlArr['min_price'] = minp_val.value
            createPage({
              path: createResultsUrl(myUrlArr),
              component: propertyResultsTemplate,
              context: {},
              defer: true,
            })
          }
        })
      }
      delete myUrlArr['min_price'];
      for (const [key, maxp_type] of Object.entries(max_price)) {
        maxp_type.forEach((maxp_val) => {
          if(maxp_val.value != ""){
            myUrlArr['max_price'] = maxp_val.value
            createPage({
              path: createResultsUrl(myUrlArr),
              component: propertyResultsTemplate,
              context: {},
              defer: true,
            })
          }
        })
      }
      for (const [key, minp_type] of Object.entries(min_price)) {
        minp_type.forEach((minp_val) => {
          if(minp_val.value != ""){
            for (const [key, maxp_type] of Object.entries(max_price)) {
              maxp_type.forEach((maxp_val) => {
                if(maxp_val.value != ""){
                  myUrlArr['min_price'] = minp_val.value
                  myUrlArr['max_price'] = maxp_val.value
                  createPage({
                    path: createResultsUrl(myUrlArr),
                    component: propertyResultsTemplate,
                    context: {},
                    defer: true,
                  })
                }
              })
            }
          }
        })
      }
      delete myUrlArr['min_price'];
      delete myUrlArr['max_price'];
      // combinations
      // area+bedroom
      areas.forEach((area_val) => {
        myUrlArr['area'] = ptype_val.slug
        bedrooms.forEach((bed_val) => {
          myUrlArr['bedrooms'] = bed_val.value
          createPage({
            path: createResultsUrl(myUrlArr),
            component: propertyResultsTemplate,
            context: {},
            //defer: true,
          })
          delete myUrlArr['bedrooms'];
        })
      })
      delete myUrlArr['area'];
      // area+building
      areas.forEach((area_val) => {
        myUrlArr['area'] = ptype_val.slug
        property_type.forEach((prop_val) => {
          myUrlArr['building_type'] = prop_val.value
          createPage({
            path: createResultsUrl(myUrlArr),
            component: propertyResultsTemplate,
            context: {},
            //defer: true,
          })
          delete myUrlArr['building_type'];
        })
      })
      delete myUrlArr['area'];
      // bedroom+building
      bedrooms.forEach((bed_val) => {
        myUrlArr['bedrooms'] = bed_val.value
        property_type.forEach((prop_val) => {
          myUrlArr['building_type'] = prop_val.value
          createPage({
            path: createResultsUrl(myUrlArr),
            component: propertyResultsTemplate,
            context: {},
            //defer: true,
          })
          delete myUrlArr['building_type'];
        })
      })
      delete myUrlArr['bedrooms'];
      // area+bedroom+building
      areas.forEach((area_val) => {
        myUrlArr['area'] = ptype_val.slug
        bedrooms.forEach((bed_val) => {
          myUrlArr['bedrooms'] = bed_val.value
          property_type.forEach((prop_val) => {
            myUrlArr['building_type'] = prop_val.value
            createPage({
              path: createResultsUrl(myUrlArr),
              component: propertyResultsTemplate,
              context: {},
              //defer: true,
            })
            delete myUrlArr['building_type'];
          })
          delete myUrlArr['bedrooms'];
        })
      })
      delete myUrlArr['area'];
    })
    // search results pages - END

  menus_data.forEach(({ node }) => {
    let page_url = node.slug
    let page_layout = ''
    if (node.strapi_parent) {
      page_url = node.strapi_parent.slug + '/' + node.slug
    }
    if (node.page?.layout == 'landing_page') {
      page_layout = landingPageTemplate
    }
    if (node.page?.layout == 'home_page') {
      page_layout = homePageTemplate
    }
    if (node.page?.layout == 'static_page') {
      page_layout = staticPageTemplate
    }
    if (node.page?.layout == 'news_landing_page') {
      page_layout = newsLandingPageTemplate
    }
    if (node.page?.layout == 'people_landing_page') {
      page_layout = teamLandingPageTemplate
    }
    if (node.page?.layout == 'careers_landing_page') {
      page_layout = careerLandingPageTemplate
    }
    if (node.page?.layout == 'careers_landing_page') {
      page_layout = careerLandingPageTemplate
    }
    if (node.page?.layout == 'contact_page') {
      page_layout = contactPageTemplate
    }
    if (node.page?.layout == 'valuation_landing_page') {
      page_layout = valuationPageTemplate
    }
    if (node.page?.layout == 'reviews_page') {
      page_layout = reviewsTemplate
    }
    if (node.page?.layout == 'form_page') {
      page_layout = formTemplate
    }
    if (page_url === 'home') {
      createPage({
        path: `/`,
        component: page_layout,
        context: {
          page_id: node.page.id,
        },
      })
    }
    else {
      createPage({
        path: page_url,
        component: page_layout,
        context: {
          page_id: node.page.id,
        },
      })
    }
  })

  news_data.forEach(({ node }) => {
    createPage({
      path: `/${site_data.news}/${node.slug}/`,
      component: newsDetailsTemplate,
      context: {
        page_id: node.strapi_id,
      },
    })
  })

  areaguide_data.forEach(({ node }) => {
    createPage({
      path: `/${site_data.areaguide}/${node.slug}/`,
      component: areaGuideDetailsTemplate,
      context: {
        page_id: node.strapi_id,
      },
    })
  })

  team_data.forEach(({ node }) => {
    createPage({
      path: `/${site_data.team}/${node.slug}/`,
      component: teamDetailsTemplate,
      context: {
        page_id: node.strapi_id,
      },
    })
  })

  jobs_data.forEach(({ node }) => {
    createPage({
      path: `/${site_data.career}/${node.slug}/`,
      component: careerDetailsTemplate,
      context: {
        page_id: node.strapi_id,
      },
    })
  })

  office_data.forEach(({ node }) => {
    createPage({
      path: `/${site_data.office}/${node.slug}/`,
      component: officeDetailsTemplate,
      context: {
        page_id: node.strapi_id,
      },
    })
  })

  result.data.allStrapiProperty.edges.forEach(({ node }) => {
    let details_path = '/property-for-sale'
    if (node.search_type == "lettings") {
      details_path = '/property-to-rent'
    }
    createPage({
      path: details_path + '/' + node.slug + '/' + (node.strapi_id),
      component: propertyDetailsTemplate,
      context: {
        strapi_id: node.strapi_id
      },
    })
  })

  result.data.allStrapiNewDevelopments.edges.forEach(({ node }) => {
    let details_path = '/new-home-for-sale'
    createPage({
      path: details_path + '/' + node.slug + '-' + (node.strapi_id),
      component: newDevelopmentDetailsTemplate,
      context: {
        strapi_id: node.strapi_id
      },
    })
  })
}