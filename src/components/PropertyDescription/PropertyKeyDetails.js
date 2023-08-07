import React, { useState }  from "react";
import { Link } from "gatsby";
import { Row, Col } from "react-bootstrap";
import loadable from "@loadable/component";
import './assets/styles/_index.scss';

const FsLightbox = loadable(() => import("fslightbox-react"));
const { Site_Vars } = require("../../common/site/config");

const PropertyKeyDetails = (props) => {
    const [propertyImage, setPropertyImage] = useState(false);
    let propertyEPCImg = [];
    //if((data?.strapiProperty?.images).length > 0) {
    if(props?.epc?.strapi_json_value) {
        for (let i = 0; i < props?.epc?.strapi_json_value.length; i++) {
            propertyEPCImg.push(props?.epc?.strapi_json_value[i].srcUrl);
        }
    }

    return (
        <>
            <Row>
                <Col lg={12}>
                    <div className="property-desc-title">Key Information</div>
                </Col>
            </Row>

            <Row>
                <Col xs={6}>
                    <div className="desc-key-wrapper">
                        <div className="desc-key-title">Price</div>
                        <div className="desc-key-text">{Site_Vars.default_currency}{props?.price.toLocaleString()}</div>
                    </div>
                </Col>
                {props?.building && props?.building?.strapi_json_value && props?.building?.strapi_json_value?.length > 0 &&
                    <Col xs={6}>
                        <div className="desc-key-wrapper">
                            <div className="desc-key-title">Property Type</div>
                            <div className="desc-key-text">{(props?.building?.strapi_json_value).join(", ")}</div>
                        </div>
                    </Col>
                }
                <Col xs={6}>
                    <div className="desc-key-wrapper">
                        <div className="desc-key-title">Bedrooms</div>
                        <div className="desc-key-text">{props?.bedroom}</div>
                    </div>
                </Col>
                <Col xs={6}>
                    <div className="desc-key-wrapper">
                        <div className="desc-key-title">Bathrooms</div>
                        <div className="desc-key-text">{props?.bathroom}</div>
                    </div>
                </Col>
                {props?.selling_info?.tenure?.type && <Col xs={6}>
                    <div className="desc-key-wrapper">
                        <div className="desc-key-title">Tenure</div>
                        <div className="desc-key-text">{props?.selling_info?.tenure?.type}</div>
                    </div>
                </Col> }
                {propertyEPCImg.length > 0 && <Col xs={6}>
                    <div className="desc-key-wrapper">
                        <div className="desc-key-title">EPC Rating</div>
                        <div className="desc-key-text"><Link to="#" className="link-underline" onClick={ () => setPropertyImage(!propertyImage) }>Energy Performance Certificate</Link></div>
                    </div>
                </Col>}
                {props?.floorarea_min != '0' && <Col xs={6}>
                    <div className="desc-key-wrapper last-key-wrapper">
                        <div className="desc-key-title">Build/Unit</div>
                        <div className="desc-key-text">{props?.floorarea_min.toLocaleString()} {props?.floorarea_type}</div>
                    </div>
                </Col> }
                <Col xs={6}>
                    <div className="desc-key-wrapper last-key-wrapper">
                        <div className="desc-key-title">Reference</div>
                        {/* <div className="desc-key-text">rps_tuh-{props.crm_id}</div> */}
                        <div className="desc-key-text">{props.crm_id}</div>
                    </div>
                </Col>
            </Row>
            {/* Property Lightbox popup */}
            <FsLightbox
                toggler={ propertyImage }
                sources={ propertyEPCImg }
                type="image"
                types={[null]}
            />
            {/* Property Lightbox popup */}
        </>
    )
}

export default PropertyKeyDetails