import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import { Nav, Navbar, Container, Offcanvas } from "react-bootstrap";
import useHasScrolled from "../../hooks/useHasScrolled";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Menu from "../Header/Menu/Menu";
import LogoImg from "../../images/logo.svg";
import './assets/styles/_index.scss';

const HeaderTwo = (props) => {

    // Scroll
    const scrolled = useHasScrolled()
    // Scroll

    //
    const [showBurger, setShowBurger] = useState(false);

    const handleCloseBurger = () => setShowBurger(false);
    const handleShowBurger = () => setShowBurger(true); 
    //

    return (
        <>
            <header className={`header-two ${props.tag} ${scrolled ? "header-scrolled" : ""} ${props.headerDubai === "header-dubai" ? "header-dubai" : ""}`}>
                <Menu handleShowBurger={handleShowBurger} bg="light" name="two" headerDubai={props.headerDubai} />
            </header>
            <Offcanvas show={showBurger} onHide={handleCloseBurger} placement="top" className={`burger-menu-wrapper ${props.headerDubai === "header-dubai" ? "header-dubai" : ""}`}>
                <Offcanvas.Header closeButton>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <BurgerMenu />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default HeaderTwo