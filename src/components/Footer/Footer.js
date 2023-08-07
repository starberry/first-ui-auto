import React, { useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby"
// import CTALink from "../../modules/cta_link"
import { Link } from "gatsby"
import { Container, Row, Col } from "react-bootstrap";
import loadable from "@loadable/component";
import FooterPopularSearches from "../FooterPopularSearches/FooterPopularSearches";
import FooterMenuListSocial from "../FooterMenuListSocial/FooterMenuListSocial";
import FooterSiteByList from "../FooterSiteByList/FooterSiteByList";
import FooterSiteBy from "../FooterSiteBy/FooterSiteBy";
import FooterLogos from "./FooterLogos";
import LiveChat from "./LiveChat";
import { PageLinks } from "../../common/site/page-static-links";
import './assets/styles/_index.scss';
const { CTALink } = require("@starberry/gatsby-theme-utils/Modules/CTALinkModule")
const { ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")

const Footer = (props) => {
    const data = useStaticQuery(graphql`
        query {
            strapiSiteConfig {
                footer_contact_details {
                  data {
                    footer_contact_details
                  }
                }
                Footer_Links {
                  title
                  add_link {
                    title
                    link {
                      ...MenuFragment
                    }
                  }
                }
            }
            site {
              siteMetadata {
                liveChat
                footerContact
                footerLogo
                youtubeLink
                content {
                    footer_content
                }
              }
            }
            allStrapiOffice(filter: {publish: {eq: true}}) {
                edges {
                  node {
                    title
                    address
                    phone
                    email
                  }
                }
            }
        }
    `);

    const contactdetails = data.strapiSiteConfig?.footer_contact_details?.data?.footer_contact_details;
    const footerLinks = data.strapiSiteConfig?.Footer_Links;
    const showChat = data.site.siteMetadata
    const Offices = data?.allStrapiOffice.edges
    const contentData = data?.site?.siteMetadata?.content

    // Cookie Trigger
    useEffect(() => {
        setTimeout(function () {
            if (!localStorage.getItem('CookieAcceptVal')) {
                document.querySelector('.cookie-popup').classList.remove('d-none');
            }
            else {
                document.querySelector('.cookie-popup').classList.add('d-none');
            }
        }, 1000);

        document.body.classList.remove('chat-with-button-scroll');
    }, [])
    // 

    function CookieAccept() {
        localStorage.setItem('CookieAcceptVal', true)
        document.querySelector('.cookie-popup').classList.add('d-none');
    }

    return (
        <footer className={`footer ${props.footerContact} ${props.footerDubai === "footer-dubai" ? "footer-dubai" : ""}`}>
            <Container>
                <Row>
                    {footerLinks.map((item, index) => (
                        <Col xl={3} md={6}>
                            <div className="footer-menu">
                                {item.title && <div className="footer-menu-title">{item.title}</div>}
                                <ul className="footer-menu-list list-unstyled">
                                    {item.add_link.map((child, index) => (
                                        <li>
                                            <CTALink {...child} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Col>
                    ))}
                    <Col xl={3} md={6}>
                        <div className="footer-menu">
                            <ContentModule Content={contactdetails} />
                        </div>
                    </Col>
                    <Col xl={3} md={6}>
                        <div className="footer-menu">
                            <div className="footer-menu-title">Social</div>
                            <FooterMenuListSocial youtubeLink={showChat.youtubeLink} />
                        </div>
                    </Col>
                </Row>

                <Row className="d-xl-block d-none">
                    <Col>
                        <FooterPopularSearches popularSearch={props.popularSearch} />
                    </Col>
                </Row>

                <Row className="footer-siteby">
                    <Col xl={showChat.footerLogo ? "5" : "6"}>
                        <FooterSiteByList />
                        {contentData?.footer_content && 
                            <p className="footer-copyright">{contentData?.footer_content}</p>
                        }
                        <FooterSiteBy />
                    </Col>
                    {showChat.footerLogo &&
                        <Col xl="7">
                            <FooterLogos />
                        </Col>
                    }
                    {/* <Col xl={showChat.footerLogo ? "2" : "6"}>
                        <FooterSiteBy />
                    </Col> */}
                </Row>
            </Container>
            <section className="cookie-popup d-none">
                <div className="CookieConsent">
                    <div className="topbar-block">
                        <p>We have placed cookies on your device to help make this website better. By continuing, you agree to our <Link to='/cookie-policy/'>Cookie Policy</Link>. <a href="javascript:void(0);" class="cookieok" onClick={() => { CookieAccept() }}>Accept Cookies</a></p>
                    </div>
                </div>
            </section>
            {showChat.liveChat && <LiveChat />}
        </footer >
    )
}

export default Footer