import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import loadable from "@loadable/component";
import { Link } from "gatsby";
import "react-datepicker/dist/react-datepicker.css";
import './assets/styles/_index.scss';
const DatePicker = loadable(() => import("react-datepicker"));
const Select = loadable(() => import("react-select"));

const InstantValuationForm = (props) => {

    // Date picker
    const [startDate, setStartDate] = useState(new Date());
    // Date picker

    // Dropdown react select styles
    const customStyles = {
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isSelected ? "#081D3C" : "null",
                color: isSelected ? "#ffffff" : "#34373D",
                "&:hover": {
                    color: "#ffffff",
                    cursor: "pointer",
                    backgroundColor: "#081D3C",
                }
            }
        },
        control: styles => ({
            ...styles,
            backgroundColor: null,
            border: 0,
            paddingLeft: 0,
            outline: 0,
            boxShadow: "none",
            color: "#fff",
            fontSize: "1rem",
        }),
        valueContainer: styles => ({
            ...styles,
            fontSize: "1rem",
            paddingLeft: 0,
            lineHeight: "21px",
            cursor: "pointer",
        }),
        dropdownIndicator: styles => ({
            ...styles,
            color: "#fff",
        }),
        indicatorsContainer: styles => ({
            ...styles,
            color: "#fff",
            cursor: "pointer",
        }),
        indicatorSeparator: () => null,
        placeholder: defaultStyles => {
            return {
                ...defaultStyles,
                color: "#34373D",
                marginLeft: 0,
            }
        },
    }
    // Dropdown react select styles

    const options = [
        { value: 'sell', label: 'Sell' },
        { value: 'rent', label: 'Rent' },
    ]

    return (
        <div className="enquiry-form-wrapper">
            <Container>
                <Row className="d-flex justify-content-center">
                    <Col xl={7}>
                        <Form>
                            <Form.Group className="theme-form-group">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Name" />
                            </Form.Group>

                            <Form.Group className="theme-form-group">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type="email" placeholder="Enter Email Address" />
                            </Form.Group>

                            <Form.Group className="theme-form-group">
                                <Form.Label>Telephone Number</Form.Label>
                                <Form.Control type="text" placeholder="Enter Telephone Number" />
                            </Form.Group>

                            <Form.Group className="theme-form-group">
                                <Form.Label>Proeprty Postcode</Form.Label>
                                <Form.Control type="text" placeholder="Enter Proeprty Postcode" />
                            </Form.Group>

                            <Form.Group className="theme-form-group">
                                <Form.Label>Do you want to Sell or Let the property</Form.Label>
                                <div className="dropdown-select d-flex align-items-center">
                                    <Select
                                        options={options}
                                        isSearchable={false}
                                        placeholder={"Sell"}
                                        className={"select-control"}
                                        classNamePrefix={"react-select"}
                                        styles={customStyles}
                                        components={{ DropdownIndicator:() => <i className="icon icon-select-dropdown-dark"></i>, IndicatorSeparator:() => null }}
                                    />
                                </div>
                            </Form.Group>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="theme-form-group date-picker">
                                        <Form.Label>Preferred Date</Form.Label>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={date => setStartDate(date)}
                                            minDate={new Date()}
                                            placeholderText={`Select your preferred date`}
                                            className={"form-control"}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="theme-form-group time-picker">
                                        <Form.Label>Preferred Time</Form.Label>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={15}
                                            timeCaption="Time"
                                            dateFormat="h:mm aa"
                                            className={"form-control"}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Button variant="" className="button button-primary" type="submit">Submit Details</Button>

                            <div className="enquiry-term-text text-center">By clicking Subscribe, you agree to our <Link to="">Terms & Conditions</Link> and <Link to="">Privacy Policy</Link>.</div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default InstantValuationForm