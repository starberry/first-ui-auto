import React from "react";
import { Link } from "gatsby";
import { Table, Container, Row, Col } from "react-bootstrap";
import './assets/styles/_index.scss';

const NewHomesDetailsAvailability = (props) => {
    return (
        <div className="property-desc-wrapper new-homes-details-availability-wrapper">
            <Container>
                <Row>
                    <Col>
                        <h2 className="new-homes-details-heading">Availability</h2>

                        <div className="new-homes-details-availability-table-wrapper">
                            <Table bordered responsive>
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Bedrooms</th>
                                        <th>Bathrooms</th>
                                        <th>Sq ft.</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                        <th>Details</th>
                                        <th>Brochure</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Apartment</td>
                                        <td>3</td>
                                        <td>2</td>
                                        <td>1839</td>
                                        <td>Asking Price £3,500,000	</td>
                                        <td>Available</td>
                                        <td><Link to="" className="link-underline">View Details</Link></td>
                                        <td><Link to="" className="link-underline">Download</Link></td>
                                    </tr>
                                    <tr>
                                        <td>Apartment</td>
                                        <td>3</td>
                                        <td>2</td>
                                        <td>1839</td>
                                        <td>Asking Price £3,500,000	</td>
                                        <td>Available</td>
                                        <td><Link to="" className="link-underline">View Details</Link></td>
                                        <td><Link to="" className="link-underline">Download</Link></td>
                                    </tr>
                                    <tr>
                                        <td>Apartment</td>
                                        <td>3</td>
                                        <td>2</td>
                                        <td>1839</td>
                                        <td>Asking Price £3,500,000	</td>
                                        <td>Available</td>
                                        <td><Link to="" className="link-underline">View Details</Link></td>
                                        <td><Link to="" className="link-underline">Download</Link></td>
                                    </tr>
                                    <tr>
                                        <td>Apartment</td>
                                        <td>3</td>
                                        <td>2</td>
                                        <td>1839</td>
                                        <td>Asking Price £3,500,000	</td>
                                        <td>Available</td>
                                        <td><Link to="" className="link-underline">View Details</Link></td>
                                        <td><Link to="" className="link-underline">Download</Link></td>
                                    </tr>
                                    <tr>
                                        <td>Apartment</td>
                                        <td>3</td>
                                        <td>2</td>
                                        <td>1839</td>
                                        <td>Asking Price £3,500,000	</td>
                                        <td>Available</td>
                                        <td><Link to="" className="link-underline">View Details</Link></td>
                                        <td><Link to="" className="link-underline">Download</Link></td>
                                    </tr>
                                    <tr>
                                        <td>Apartment</td>
                                        <td>3</td>
                                        <td>2</td>
                                        <td>1839</td>
                                        <td>Asking Price £3,500,000	</td>
                                        <td>Available</td>
                                        <td><Link to="" className="link-underline">View Details</Link></td>
                                        <td><Link to="" className="link-underline">Download</Link></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default NewHomesDetailsAvailability