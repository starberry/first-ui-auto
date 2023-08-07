import React from "react";
import sbLogo from "../../images/sb-logo.svg";
import './assets/styles/_index.scss';

const FooterSiteBy = (props) => {
    return (
        <div className="siteby-logo d-flex align-items-center">
            Site by
            <a href="https://starberry.tv/" className="d-flex" target={"_blank"} rel="noreferrer">
                <img src={sbLogo} alt="Starberry Logo" />
            </a>
        </div>
    )
}

export default FooterSiteBy