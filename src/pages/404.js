import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "gatsby";
import LayoutTwo from "../components/layoutTwo";
import Seo from "../components/seo"

const NotFoundPage = () => (
  <LayoutTwo>
    <div className="layout-padding-top">
      <div className="grey-bg">
        <div className="error-page-wrapper d-flex align-items-center">
          <Container>
            <Row className="d-flex justify-content-center">
              <Col xl={7} className="text-center">
                <h1>Something’s gone wrong!</h1>
                <p>The page you are trying to access cannot be found. It may have been moved or deleted. Please check the URL and try again.</p>
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <Link to="/" className="button button-primary">Homepage</Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="/contact/" className="button button-secondary-outline">Contact us</Link>
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  </LayoutTwo>
)

export const Head = () => <Seo title="404: Not Found" />

export default NotFoundPage
