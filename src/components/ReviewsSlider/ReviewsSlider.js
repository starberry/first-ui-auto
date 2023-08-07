import React from "react";
import { useStaticQuery, graphql } from "gatsby"
import { Script } from "gatsby"
import { Container, Row, Col } from "react-bootstrap";
import { StaticImage } from "gatsby-plugin-image";
import './assets/styles/_index.scss';

const ReviewsSlider = (props) => {

    const { site } = useStaticQuery(
      graphql`
        query {
          site {
            siteMetadata {
                elfSight {
                  review
                  review_badge
                  review_carousel
                  review_page
                }
            }
          }
        }
      `
    )
  
    const elfData = site.siteMetadata?.elfSight
    return (
        <React.Fragment>
        {elfData.review && <section className="reviews-slider-wrapper">
            <Container>
                <Row>
                    <Col>
                        <h2 className="text-center">Don’t just take our word for it...</h2>
                        <div className="review-rating text-center">Rated <span>4.9/5</span> by 348 of our valued customers.</div>
                        <Script src="https://apps.elfsight.com/p/platform.js" strategy="idle" />
                        <div className={elfData.review_carousel} data-elfsight-app-lazy></div>
                        {/* <div className="d-flex align-items-center justify-content-center reviews-from">
                            <div className="reviews-text">Reviews from</div>
                            <StaticImage src="../../images/google_reviews_dark.svg" alt="review" className="img-fluid" />
                        </div> */}
                    </Col>
                </Row>
            </Container>
        </section> }
        </React.Fragment>
    )
}

export default ReviewsSlider