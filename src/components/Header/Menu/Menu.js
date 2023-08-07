import React, { useState } from "react";
import { Link } from "gatsby";
import { useStaticQuery, graphql } from "gatsby"
import { Nav, Navbar, Container, Offcanvas } from "react-bootstrap";
import { PageLinks } from "../../../common/site/page-static-links"
import useHasScrolled from "../../../hooks/useHasScrolled";
// import CTALink from "../../../modules/cta_link"
import LogoImg from "../../../images/logo.svg";
import LogoWhiteImg from "../../../images/logo-white.svg";
import '../assets/styles/_index.scss';
const { CTALink } = require("@starberry/gatsby-theme-utils/Modules/CTALinkModule")

const Header = (props) => {

    // Scroll
    const scrolled = useHasScrolled()
    // Scroll

    const data = useStaticQuery(graphql`
        query {
            strapiSiteConfig {
                Top_Navigation {
                  title
                  link {
                    ...MenuFragment
                  }
                }
                mobile_device_phone
            }
            strapiThemeConfig {
              logo_dark {
                url
              }
              logo_light {
                url
              }
            }
        }
    `);

    const menus = data.strapiSiteConfig?.Top_Navigation;
    const phone = data.strapiSiteConfig?.mobile_device_phone;
    const logopath = data.strapiThemeConfig;

    return (
        <Navbar bg={props.bg ? props.bg : ''} expand="lg" fixed="top">
            <Container fluid>
                {props.name !== "two" ?
                    <Link to="/" className="navbar-brand">
                        {
                            scrolled ?
                                <img src={logopath.logo_dark.url} alt={`${process.env.GATSBY_SITE_NAME} logo`} width="200" height="100" className="logo-img" />
                                :
                                <img src={logopath.logo_light.url} alt={`${process.env.GATSBY_SITE_NAME} logo`} width="200" height="100" className="logo-img" />
                        }
                    </Link> :

                    <Link to="/" className="navbar-brand">
                        <img src={logopath.logo_dark.url} width="200" height="100" alt={`${process.env.GATSBY_SITE_NAME} logo`} className="logo-img" />
                    </Link>}
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {menus && menus.slice(0, (menus.length - 1)).map((item, i) => (
                            <CTALink {...item} class={`nav-link`} target_window={item.link.target_window}/>
                        ))}
                    </Nav>
                </Navbar.Collapse>
                {
                    props.headerDubai === "header-dubai" ?
                    ""
                    :
                    <div className="contact d-lg-block d-none">
                        {menus && menus.slice((menus.length - 1), (menus.length)).map((item, i) => (
                            <CTALink {...item} class={`button button-secondary-outline-bg`} target_window={item.link.target_window}/>
                        ))}
                    </div>
                }
                <div className="d-lg-none ms-auto contact-wrapper">
                    <ul className="list-inline">
                        <li className="list-inline-item">
                            <Link to={`/${PageLinks.results_sales}/`} aria-label="search" ><i className="icon icon-search"></i></Link>
                        </li>
                        {phone && <li className="list-inline-item">
                            <a href={`tel:${phone}`} aria-label="phone" ><i className="icon icon-phone"></i></a>
                        </li> }
                    </ul>
                </div>
                {
                    props.headerDubai === "header-dubai" ?
                    <div className="header-whatsapp d-lg-block d-none">
                        <Link to="" className="d-flex align-items-center"><i className="icon icon-header-whatsapp"></i> <span>WhatsApp</span></Link>
                    </div>
                    :
                    ""
                }
                <div className={`burger-menu ${props.headerDubai === "header-dubai" ? "d-lg-none" : ""}`}>
                    <button onClick={() => props.handleShowBurger()} role="button" aria-label="open"><i className="icon icon-burger-menu"></i></button>
                </div>
            </Container>
        </Navbar>
    )
}

export default Header