import React from "react";
import { useStaticQuery, graphql } from "gatsby"
import './assets/styles/_index.scss';

const FooterMenuListSocial = (props) => {
    const data = useStaticQuery(graphql`
        query {
            strapiSiteConfig {
              facebook_link
              twitter_link
              instagram_link
              linkedin_link
            }
        }
    `);

    const links = data.strapiSiteConfig;
    const shareurl = typeof window !== 'undefined' ? window.location.href : ''

    const trackerShare = (event) => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'click',
            'formType': event + ' - ' + shareurl,
            'formId': 'Share',
            'formName': 'Social Icon Click',
            'formLabel': 'Social Icon Click'
        });
    }


    return (
        <ul className="footer-menu-list-social list-inline d-flex align-items-center">
            {links.facebook_link.length > 5 && <li className="list-inline-item">
                <a href={links.facebook_link} target="_blank" aria-label="facebook" onClick={() => trackerShare('Facebook')}>
                    <div className="social-circle d-flex align-items-center justify-content-center">
                        <i className="icon icon-fb"></i>
                    </div>
                </a>
            </li>}
            {links.twitter_link.length > 5 && <li className="list-inline-item">
                <a href={links.twitter_link} target="_blank" aria-label="twitter" onClick={() => trackerShare('Twitter')}>
                    <div className="social-circle d-flex align-items-center justify-content-center">
                        <i className="icon icon-twitter"></i>
                    </div>
                </a>
            </li>}
            {links.instagram_link.length > 5 && <li className="list-inline-item">
                <a href={links.instagram_link} target="_blank" aria-label="instagram" onClick={() => trackerShare('Instagram')}>
                    <div className="social-circle d-flex align-items-center justify-content-center">
                        <i className="icon icon-insta"></i>
                    </div>
                </a>
            </li>}
            {links.linkedin_link.length > 5 && <li className="list-inline-item">
                <a href={links.linkedin_link} target="_blank" aria-label="linkedin" onClick={() => trackerShare('Linkedin')}>
                    <div className="social-circle d-flex align-items-center justify-content-center">
                        <i className="icon icon-linkedin"></i>
                    </div>
                </a>
            </li>}
            {props.youtubeLink && props.youtubeLink.length > 5 && <li className="list-inline-item">
                <a href={props.youtubeLink} target="_blank" aria-label="youtube" onClick={() => trackerShare('Youtube')}>
                    <div className="social-circle d-flex align-items-center justify-content-center">
                        <i className="icon icon-youtube"></i>
                    </div>
                </a>
            </li>}
        </ul>
    )
}

export default FooterMenuListSocial