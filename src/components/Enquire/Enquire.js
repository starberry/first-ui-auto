import React, { useEffect, useState } from "react";
import { Link, navigate } from "gatsby";
import { PageLinks } from "../../common/site/page-static-links";
import { Mail_Vars } from "../../common/site/config";
import './assets/styles/_index.scss';

const Enquire = (props) => {

    // Sticky scroll
    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 750)
        })
        if (scroll) {
            document.body.classList.add('chat-with-button-scroll');
        } else {
            document.body.classList.remove('chat-with-button-scroll');
        }
    }, [scroll])
    // Sticky scroll


    const omitArray = ["Sold", "Sold STC", "Let Agreed"]
    let isSoldRule = omitArray.includes(props?.status)

    return (
        <>
            {
                scroll ? 
                <section className={`enquire-wrapper ${props.tag === "career" ? "career" : props.tag === "property-details" ? "property-details" : ""}`}>
                    {
                        props.tag === "career" ?
                            <a onClick={() => navigate('/about/careers/apply/', { state: { id: props?.crm_id, address: props?.display_address } })} className="button button-primary">Apply for this Job</a>
                            :
                            <ul className="list-inline d-flex justify-content-between">
                                {props.tag === "property-details" ?
                                    <>
                                        {!isSoldRule &&
                                            <li className="list-inline-item">
                                                <a className="button button-primary" onClick={() => navigate('/book-a-viewing', { state: { id: props.crm_id, address: props?.display_address, pageurl: props.pageurl, propImage: props.propImg && props.propImg.length > 0 ? props.propImg[0] : '' } })}>Enquire</a>
                                            </li>
                                        }
                                    </>
                                    :
                                    <li className="list-inline-item">
                                        <Link to={`/${PageLinks.enquiry}`} className="button button-primary">{props.cta_1_label ? props.cta_1_label : "Enquire"}</Link>
                                    </li>
                                }
                                <li className="list-inline-item">
                                    <a href={`tel:${Mail_Vars.company_phone}`} className="button button-secondary-outline">{props.cta_2_label ? props.cta_2_label : "Call Us"}</a>
                                </li>
                                {props.tag === "property-details" && <li className="list-inline-item">
                                    <a href={`tel:${Mail_Vars.company_phone}`} className="button button-secondary-outline"><i className="icon icon-whatsapp" /></a>
                                </li>}
                            </ul>
                    }
                </section>
                : ""
            }
        </>
    )
}

export default Enquire