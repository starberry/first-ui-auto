import React from "react";
import { Link, navigate } from "gatsby";
import ScrollAnimation from 'react-animate-on-scroll';
import './assets/styles/_index.scss';

const TeamDetailIntro = (props) => {
    return (
        <div className="team-detail-intro-wrapper">
            <ScrollAnimation animateIn="animate__slideInUp" animateOnce offset={10}>{props?.title && <h1>{props.title}</h1>}</ScrollAnimation>

            <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={200} offset={10}>{props.designation && <div className="team-detail-position">{props.designation}</div>}</ScrollAnimation>

            <ul className="list-inline d-md-block d-none">
                <li className="list-inline-item">
                    <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={400} offset={10}>
                        <a className="button button-primary" onClick={() => navigate('/about/our-team/contact/', { state: { name: props?.title, email: props.email } })}><i className="icon icon-email-white"></i> Email me</a>
                    </ScrollAnimation>
                </li>
                {props.phone && <li className="list-inline-item">
                    <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={500} offset={10}>
                        <a href={`tel:${props.phone}`} className="button button-teritary-outline"><i className="icon icon-team-phone"></i> {props.phone}</a>
                    </ScrollAnimation>
                </li>}
            </ul>
        </div>
    )
}

export default TeamDetailIntro