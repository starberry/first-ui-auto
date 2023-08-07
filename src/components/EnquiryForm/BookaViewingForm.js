// import React, { useState } from "react";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import { Link } from "gatsby";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import './assets/styles/_index.scss';

// const BookaViewingForm = (props) => {

//     // Date picker
//     const [startDate, setStartDate] = useState(new Date());
//     // Date picker

//     return (
//         <div className="enquiry-form-wrapper">
//             <Container>
//                 <Row className="d-flex justify-content-center">
//                     <Col xl={7}>
//                         <Form>
//                             <Form.Group className="theme-form-group">
//                                 <Form.Label>Name</Form.Label>
//                                 <Form.Control type="text" placeholder="Enter Name" />
//                             </Form.Group>

//                             <Form.Group className="theme-form-group">
//                                 <Form.Label>Email Address</Form.Label>
//                                 <Form.Control type="email" placeholder="Enter Email Address" />
//                             </Form.Group>

//                             <Form.Group className="theme-form-group">
//                                 <Form.Label>Telephone Number</Form.Label>
//                                 <Form.Control type="text" placeholder="Enter Telephone Number" />
//                             </Form.Group>

//                             <Row>
//                                 <Col md={6}>
//                                     <Form.Group className="theme-form-group date-picker">
//                                         <Form.Label>Preferred Date</Form.Label>
//                                         <DatePicker
//                                             selected={startDate}
//                                             onChange={date => setStartDate(date)}
//                                             minDate={new Date()}
//                                             placeholderText={`Select your preferred date`}
//                                             className={"form-control"}
//                                         />
//                                     </Form.Group>
//                                 </Col>
//                                 <Col md={6}>
//                                     <Form.Group className="theme-form-group time-picker">
//                                         <Form.Label>Preferred Time</Form.Label>
//                                         <DatePicker
//                                             selected={startDate}
//                                             onChange={(date) => setStartDate(date)}
//                                             showTimeSelect
//                                             showTimeSelectOnly
//                                             timeIntervals={15}
//                                             timeCaption="Time"
//                                             dateFormat="h:mm aa"
//                                             className={"form-control"}
//                                         />
//                                     </Form.Group>
//                                 </Col>
//                             </Row>

//                             <Button variant="" className="button button-primary" type="submit">Submit Details</Button>

//                             <div className="enquiry-term-text text-center">By clicking Subscribe, you agree to our <Link to="">Terms & Conditions</Link> and <Link to="">Privacy Policy</Link>.</div>
//                         </Form>
//                     </Col>
//                 </Row>
//             </Container>
//         </div>
//     )
// }

// export default BookaViewingForm