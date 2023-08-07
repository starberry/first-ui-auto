import React, { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import useHasScrolled from "../../hooks/useHasScrolled";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Menu from "./Menu/Menu";
import './assets/styles/_index.scss';

const Header = (props) => {

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
            <header className={`header ${scrolled ? "header-scrolled" : ""} ${props.headerDubai === "header-dubai" ? "header-dubai" : ""}`}>
                <Menu handleShowBurger={handleShowBurger} headerDubai={props.headerDubai} />
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

export default Header