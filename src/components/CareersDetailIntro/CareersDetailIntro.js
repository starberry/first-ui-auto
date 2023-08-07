import React from "react";
import { Link, navigate } from "gatsby";
import SocialShare from "../SocialShare/SocialShare";
import ScrollAnimation from 'react-animate-on-scroll';
import './assets/styles/_index.scss';

const CareersDetailIntro = (props) => {
    return (
        <div className="career-detail-intro-wrapper">
            <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={100} offset={10}><h1>{props.data.title}</h1></ScrollAnimation>

            <ul className="list-inline d-flex align-items-center">
                {props.data.location &&
                    <li className="list-inline-item">
                        <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={200} offset={10}>
                            <div className="career-detail-position">{props.data.location}</div>
                        </ScrollAnimation>
                    </li>}
                <li className="list-inline-item">
                    <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={300} offset={10}>
                        <SocialShare
                            iconClass="icon icon-share"
                            shareText="Share"
                        />
                    </ScrollAnimation>
                </li>
            </ul>

            <div className="d-md-block d-none">
                <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={400} offset={10}>
                    <a className="button button-primary" onClick={() => navigate('/about/careers/apply/', { state: { id: props.crm_id, address: props?.display_address } })}>Apply for this Job</a>
                </ScrollAnimation>
            </div>
        </div>
    )
}

export default CareersDetailIntro