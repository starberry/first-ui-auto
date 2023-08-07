import React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { Row, Col } from "react-bootstrap";
import './assets/styles/_index.scss';
import ImageModule from "../../modules/image-render";
const { Site_Vars } = require("../../common/site/config");

const NewHomesCard = (props) => {
    let details_path = '/new-home-for-sale'
    var imagename = "new-developments.images.results";
    let propid = ''
    if (props?.data?.strapi_id)
        propid = props.data.strapi_id
    else if (props?.data?.objectID)
        propid = props.data.objectID
    return (
        <div className="new-homes-card-wrapper">
            <Row className="g-0">
                <Col xl={5}>
                    <div className="new-homes-card-img-zoom">
                        <Link to={details_path + '/' + props.data.slug + '-' + (propid) + '/'}>

                            {props.tag == "no-result" && props.data.images?.strapi_json_value.length > 0 &&
                                <ImageModule ImageSrc={props.data.images?.strapi_json_value[0]} altText={""} imagetransforms={props.processedImages} renderer="srcSet" imagename={imagename} strapi_id={props.data?.strapi_id} classNames="img-fluid" />
                            }

                            {props.tag != "no-result" && props.data?.images.length > 0 &&
                                <img fetchpriority={props.myindexval == 0 ? "low" : "low"} loading={props.myindexval < 6 ? "eager" : "lazy"} src={props.data?.images[0]['416x300']} alt="banner" className="img-fluid" />
                            }
                            {props.tag != "no-result" && props.data?.images.length == 0 &&
                                <StaticImage src="../../images/no-image.png" layout="fullWidth" placeholder="blurred" formats={["webp"]} alt="banner" quality="90" className="img-fluid" />
                            }
                        </Link>
                    </div>
                </Col>
                <Col xl={7}>
                    <div className="new-homes-card-text-wrapper">
                        <div className="display-address">{props.data.display_address}</div>
                        <p className="price-details">{props.data.price_qualifier} {Site_Vars.default_currency}{props.data?.price?.toLocaleString()} {props.data?.max_price ? ` - ${Site_Vars.default_currency}${props.data?.max_price?.toLocaleString()}` : ''}</p>
                        <div className="property-title">{props.data.title}</div>
                        {props.data.description && <p>{props.data.description}</p>}
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default NewHomesCard