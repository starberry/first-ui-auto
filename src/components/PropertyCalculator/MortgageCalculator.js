import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import { Row, Col, Form } from "react-bootstrap";
import { PageLinks } from "../../common/site/page-static-links";
import { StaticImage } from "gatsby-plugin-image";
// import { filterNumber, numberFormat, pmt } from "./utils"
// import { defaultValues } from "./config"
import { calculateMonthlyPayment } from "./mortgage"
import './assets/styles/_index.scss';
const { filterNumber, numberFormat, pmt } = require("@starberry/gatsby-theme-utils/Common/Utils")

const { Site_Vars } = require("../../common/site/config");

// User project specific const
const durationOptions = [25, 30, 35]

const MortgageCalculator = (props) => {

  const {
    propertyPrice,
    depositAmount,
    loadDuration,
    interestRate,
    currency,
    defaultResult,
    pricePrefix,
  } = props

  const prefix = ""
  const [validated, setValidated] = useState(false)
  const [showerror, setShowerror] = useState(false)
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  const [purchasePrice, setPurchasePrice] = useState(
    prefix + numberFormat(propertyPrice)
  )
  let dep_price = (propertyPrice / 100) * 10
  const [deposit, setDeposit] = useState(prefix + numberFormat(dep_price))
  const [duration, setDuration] = useState(25)
  // const [duration, setDuration] = useState(loadDuration)
  const [interest, setInterest] = useState(3)
  const [loan, setLoan] = useState("")
  const [result, setResult] = useState("")
  const [depositError, setDepError] = useState(false)

  const handlePrice = event => {
    let val = filterNumber(event.target.value)
    if (event.target.value !== "£" && event.target.value !== "£0" && event.target.value !== "0" && event.target.value !== "") {
      setPurchasePrice(prefix + numberFormat(val))
      if (parseInt(filterNumber(deposit)) && parseInt(val)) {
        let loan = parseInt(val) - parseInt(filterNumber(deposit))
        setLoan(prefix + numberFormat(loan))
      } else {
        setLoan(prefix + 0)
      }
      setMonthlyPayment(
        calculateMonthlyPayment(
          parseInt(filterNumber(event.target.value)),
          parseFloat(interest),
          parseInt(filterNumber(deposit)),
          duration
        )
      );
      setShowerror(false)
    }
    else {
      setPurchasePrice('')
      setLoan()
      setMonthlyPayment(0)
    }
  }

  const handleDeposit = event => {
    let d = filterNumber(event.target.value)
    if (event.target.value !== '£' && event.target.value !== "£0" && event.target.value !== '0' && event.target.value !== "") {
      setDeposit(prefix + numberFormat(d))

      if (parseInt(filterNumber(purchasePrice)) && parseInt(d)) {
        let loan2 = parseInt(filterNumber(purchasePrice)) - parseInt(d)
        setLoan(prefix + numberFormat(loan2))
      } else {
        setLoan(prefix + 0)
      }
      var par = purchasePrice.replace('£', '').replace(/,/g, '')
      var dep = event.target.value.replace('£', '').replace(/,/g, '')
      var par1 = parseInt(par)
      var dep1 = parseInt(dep)
      if (par1 < dep1 || par1 === dep1) {
        setDepError(true)
        setMonthlyPayment(0)
      }
      else {
        setDepError(false)
        // setMonthlyPayment(
        //   calculateMonthlyPayment(
        //     parseInt(filterNumber(purchasePrice)),
        //     parseFloat(interest),
        //     parseInt(filterNumber(event.target.value)),
        //     duration
        //   )
        // );

      }
      setShowerror(false)
    }
    else {
      setLoan('')
      setDeposit('')
      setMonthlyPayment(0)
    }
  }

  const handleDuration = event => {
    setDuration(filterNumber(event.target.value))
    // setMonthlyPayment(
    //   calculateMonthlyPayment(
    //     parseInt(filterNumber(purchasePrice)),
    //     parseFloat(interest),
    //     parseInt(filterNumber(deposit)),
    //     event.value
    //   )
    // );
  }

  const handleInterest = event => {
    setInterest(event.target.value.replace(/[^\d.]/g, ""))
    // setMonthlyPayment(
    //   calculateMonthlyPayment(
    //     parseInt(filterNumber(purchasePrice)),
    //     parseFloat(event.target.value),
    //     parseInt(filterNumber(deposit)),
    //     duration
    //   )
    // );
  }

  const handleLoan = event => {
    setLoan(prefix + numberFormat(filterNumber(event.target.value)))
  }

  const getResult = (interest, duration, loan) => {
    let result = -pmt(
      interest / 100 / 12,
      filterNumber(duration) * 12,
      filterNumber(loan),
      0,
      1
    )
    setResult(numberFormat(Math.round(result)))
  }

  const handleSubmit = event => {
    const form = event.currentTarget
    event.preventDefault()
    event.stopPropagation()

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'formSubmit',
      'formType': "Mortage calculator",
      'formId': "Mortage calculator",
      'formName': "Mortage calculator",
      'formLabel': "Mortage calculator"
    });

    setMonthlyPayment(
      calculateMonthlyPayment(
        parseInt(filterNumber(purchasePrice)),
        parseFloat(interest),
        parseInt(filterNumber(deposit)),
        duration
      )
    );
  }

  useEffect(() => {
    if (defaultResult) {
      if (
        parseInt(filterNumber(purchasePrice)) &&
        parseInt(filterNumber(deposit))
      ) {
        let loan =
          parseInt(filterNumber(purchasePrice)) -
          parseInt(filterNumber(deposit))
        setLoan(prefix + numberFormat(loan))
      }
      getResult(interest, duration, loan)
      setMonthlyPayment(
        calculateMonthlyPayment(
          parseInt(filterNumber(purchasePrice)),
          parseFloat(interest),
          parseInt(filterNumber(deposit)),
          duration
        )
      );

    }
  }, [defaultResult, purchasePrice, deposit, loan, interest, duration, prefix])

  useEffect(() => {
    if (
      parseInt(filterNumber(purchasePrice)) &&
      parseInt(filterNumber(deposit))
    ) {
      let loan =
        parseInt(filterNumber(purchasePrice)) -
        parseInt(filterNumber(deposit))
      setLoan(prefix + numberFormat(loan))
    }
    getResult(interest, duration, loan)
    setMonthlyPayment(
      calculateMonthlyPayment(
        parseInt(filterNumber(purchasePrice)),
        parseFloat(interest),
        parseInt(filterNumber(deposit)),
        duration
      )
    );
  }, [])

  // DO NOT DO ANY CHNAGES - END
  var monthly_payment = Math.round(monthlyPayment);
  var selectvalues = []
  { durationOptions.map(val => selectvalues.push({ value: val, label: val })) }

  return (
    <>
      <Row>
        <Col>
          <div className="property-desc-title">Mortgage Calculator</div>
        </Col>
      </Row>


      <Form
        name="MortgageCalc"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        autoComplete="off"
        className="calculator"
      >
      {showerror && (
        <div className="alert alert-danger">
          <p>Highlighted fields are required</p>
        </div>
      )}
      {depositError && (
        <div className="alert alert-danger">
          <p>Please enter deposit amount less than the property amount.</p>
        </div>
      )}
        <Row>
          <Col md={3} xs={6}>
            <Form.Group className="calc-form-group">
              <Form.Label for="property_price">Property Price</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder=""
                value={purchasePrice}
                onChange={handlePrice}
                maxLength={13}
                disabled
                id="property_price"
              />
            </Form.Group>
          </Col>
          <Col md={3} xs={6}>
            <Form.Group className="calc-form-group">
              <Form.Label for="property_deposit">Deposit</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder=""
                value={deposit}
                onChange={handleDeposit}
                maxLength={13}
                id="property_deposit"
              />
            </Form.Group>
          </Col>
          <Col md={3} xs={6}>
            <Form.Group className="calc-form-group">
              <Form.Label for="property_mortgage_term">Mortgage Term (Years)</Form.Label>

              <Form.Control
                as="select"
                className="form-control"
                required
                name="duration"
                value={duration}
                placeholder="Duration (Years)"
                onChange={handleDuration}
                id="property_mortgage_term"
              >
                {durationOptions.map((value, key) => {
                  return (
                    <option value={value} key={key}>
                      {value} Years
                    </option>
                  )
                })}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={3} xs={6}>
            <Form.Group className="calc-form-group">
              <Form.Label for="property_interest_rate">Interest Rate (%)</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder=""
                value={interest}
                maxLength={4}
                onChange={handleInterest}
                id="property_interest_rate"
              />
            </Form.Group>
            <Form.Group controlId="loan_amount" className="d-none">
              <Form.Label>Loan Amount</Form.Label>
              <div className="form-addon-input-left form-border-input readonly-loan">
                <Form.Control
                  required
                  type="text"
                  name="loan_amount"
                  value={loan}
                  placeholder="Loan Amount"
                  onChange={handleLoan}
                  disabled="disabled"
                />
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col xl={3} lg={12}>
            <button className="button button-primary calc-btn" type="submit">Calculate</button>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="estimate-card">
              <div className="property-desc-title-sm">Mortgage Estimate</div>
              <div className="property-desc-calc-price">{Site_Vars.default_currency}{numberFormat(monthly_payment)} per month.</div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="d-flex align-items-center calc-nego-wrapper">
              <div className="calc-nego-img">
                <StaticImage src="../../images/property_detail_nego_img.png" layout="fullWidth" placeholder="blurred" formats={["webp"]} alt="banner" quality="90" className="img-fluid" />
              </div>
              <div className="calc-nego-text-card">
                <div className="calc-nego-text">Are you ready to take the next step?</div>
                <div className="calc-nego-text-sm">Speak with <Link to={`/${PageLinks.team}/`} className="link-underline">one of our team</Link> and we can help you find out your affordability:</div>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default MortgageCalculator