import React, { useRef, useState, useEffect } from "react"
import { Form, Button } from "react-bootstrap";
import { useStaticQuery, graphql } from "gatsby"
import { navigate } from "@reach/router"
import loadable from "@loadable/component";
import InputField from './elements/input'
import SelectField from './elements/select'
import TextAreaField from './elements/textarea'
import CheckboxField from './elements/checkbox'
import FileField from './elements/file'
import RadioField from './elements/radio'
import ButtonField from './elements/button'
import HtmlBox from './elements/html'
import PostcodeField from './elements/leadpro_postcode'
//import ReCaptchaBox from './elements/recaptcha'
import { postFormData } from "./api/Api"
// import $ from 'jquery/dist/jquery.min.js'
import axios from "axios"
import * as qs from "query-string"
import './assets/styles/_index.scss';

if(process.env.GATSBY_CAPTCHA_SERVICE === ""){
  const ReCaptchaBox = loadable(() => import("./elements/recaptcha"));
}

function FormComponent(props) {


  const [validated, setValidated] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [showerror, setShowerror] = useState(false);
  const [ctaDisable, setctaDisable] = useState(false);
  const [showthankyou, setThankyou] = useState(false);
  const [formvalues, setFormvalues] = useState("");
  const [token, setToken] = useState("");
  const [postcode, setPostcode] = useState("");
  const [address, setAddress] = useState("");
  const [postCodeError, setPostCodeError] = useState(false);
  const [postCodeAddress, setPostCodeAddress] = useState(true);
  const [file, setFile] = useState(""); // storing the uploaded file
  // storing the recived file from backend
  const [] = useState({ name: "", path: "" });
  const [] = useState(0); // progess bar
  const myRef = React.createRef();

  const recaptchaRef = React.createRef();
  const fields = (props.fields);

  const handlechange = event => {
    // remove initial empty spaces 
    event.target.value = event.target.value.trimStart()
  }

  const handleAttachment = event => {
    const fileItem = event.target.files[0]; // accesing file
    var d = document.getElementById('custom-file');
    //alert(d.value);
    // $('.form-control-browsefile .custom-file-label').html(d.value.replace(/C:\\fakepath\\/, ''));
    setFile(fileItem); // storing file

    // $('.form-control-browsefile').addClass("validated");

  };

  const selectHandelChange = (name, value) => {
    setPostcode(value);
    setPostCodeAddress(true)
  }
  const postcodeChange = (suggestion) => {
    setPostcode(suggestion.postcode)
    var selected_address = suggestion.line_1 ? suggestion.line_1 + ", " : "";
    selected_address += suggestion.line_2 ? suggestion.line_2 + ", " : "";
    selected_address += suggestion.line_3 ? suggestion.line_3 + ", " : "";
    selected_address += suggestion.postcode ? suggestion.postcode + ", " : "";

    setAddress(`${selected_address}`)

    setPostCodeAddress(false);
  }

  useEffect(() => {

    if (token !== '') {

      const processFromData = async () => {

        formvalues['g-recaptcha-response'] = token;
        const page_url = typeof window !== 'undefined' ? window.location.href : ''


        let formData = new FormData();
        if (formvalues?.files) {
          formData.append('files.attachment', formvalues.files, formvalues.files.name); // appending file
        }

        setctaDisable(true)
        formvalues['first_name'] = formvalues.first_name ? formvalues.first_name : formvalues.name ? formvalues.name : formvalues.email
        formvalues['last_name'] = formvalues.last_name ? formvalues.last_name : ' '
        formvalues['name'] = formvalues.first_name ? formvalues.first_name : formvalues.name + ' ' + formvalues.last_name ? formvalues.last_name : ''
        formvalues['postcode'] = postcode ? postcode : "N/A"
        formvalues['advert_postcode'] = postcode ? postcode : "N/A"
        formvalues['address'] = address.length > 0 ? address : (props?.prop_address && props?.prop_address != 'undefined') ? props?.prop_address : "N/A"
        formvalues['lead_type'] = formvalues.form_name != "Book a Valuation" ? "leads" : "";
        formvalues['advert_url'] = page_url;
        if(formvalues.property_type) {
        formvalues['property_type'] = formvalues.property_type;
        }
        if(formvalues.department) {
          formvalues['department'] = formvalues.department
        }
        formvalues['type'] = formvalues.property_type === "Sell" ? 'vendor' : formvalues.property_type === "Rent" ? "landlord" : "sale";
        formvalues['debug'] = true
        formvalues['search_type'] = formvalues.property_type === "Sell" ? 'vendor' : formvalues.property_type === "Rent" ? "landlord" : "sale"
        formvalues['company_email'] = props.siteData.contact_email;
        formvalues['company_phone'] = props.siteData.company_phone;
        formvalues['company_address'] = props.siteData.address;
        formvalues['enquiry_url'] = props.siteData.enquiry;
        formvalues['company_available_time'] = props.siteData.available_time;
        formvalues['company_available_days'] = props.siteData.available_days;
        formvalues['primary_color'] = props.siteData.primary_color;
        formvalues['valuation_url'] = props.siteData.valuation;
        formvalues['form_name'] = fields[0].formname;
        formvalues['email_subject_user'] = fields[0].email_subject_user;
        formvalues['email_subject_admin'] = fields[0].email_subject_admin;
        formvalues['referrer'] = page_url;
        formvalues['extra'] = JSON.stringify(formvalues);
        if (props?.prop_address && props?.prop_address != 'undefined') {
          formvalues["property_address"] = props?.prop_address
          formvalues["advert_address"] = props?.prop_address
        } else {
          formvalues["advert_address"] = "N/A"
        }
        if (props?.prop_url) {
          formvalues["property_url"] = props?.prop_url
        } else {
          formvalues["property_url"] = page_url
        }
        if (props?.prop_img_url) {
          formvalues["property_img_url"] = props?.prop_img_url
        }
        formData.append('data', JSON.stringify(formvalues));
        var formSubmitData = formvalues
        if (fields[0].formname === "Careers") {
          formSubmitData = formData
        }
        postFormData(formSubmitData).then(async apiRes => {
          if(process.env.GATSBY_CAPTCHA_SERVICE === ""){
            window.grecaptcha.reset()
          }
          if (apiRes?.data?.form?.attachment && apiRes?.data?.form?.attachment[0]?.url) {
            let cvUrl = apiRes?.data?.form?.attachment[0]?.url
            // If image from externall url, use that
            if (cvUrl.match(/(http|https):\/\//g)) {
              formvalues['file'] = `${cvUrl}`;
              formvalues['cvname'] = `${cvUrl}`;
            } else { // or we consider it is loading from api url
              formvalues['file'] = `${process.env.GATSBY_STRAPI_FORM_URL}${cvUrl}`;
              formvalues['cvname'] = `${process.env.GATSBY_STRAPI_FORM_URL}${cvUrl}`;
            }
          }

          // console.log("apiRes", apiRes)
          if (apiRes.success) {
            setctaDisable(false)
            if (apiRes?.data?.leadpro_response?.status && formvalues.form_name == "Book a Valuation") {
              sessionStorage.setItem('valuationResult', JSON.stringify(apiRes?.data?.leadpro_response?.data));
              navigate('/property-valuation/instant-valuation-result/')
            }
            setShowerror(false);
            setThankyou(true);
            setTimeout(() => {
              const element = document.querySelector(".alert-success");
              if (element) {
                window.scrollTo({
                  behavior: 'smooth',
                  top:
                    element.getBoundingClientRect().top -
                    document.body.getBoundingClientRect().top -
                    200,
                })
              }
            }, 100);
            setTimeout(() => {
              setThankyou(false)
            }, 3000);
          }
          // lets send mail
          let url = '/api/gatsby-theme-starberry-sirius/functions';
          await window.fetch(`${url}`, {
            method: `POST`,
            mode: "no-cors",
            headers: {
              'Access-Control-Allow-Origin': '*',
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: qs.stringify(formvalues),
          })
        });

        const url = typeof window !== 'undefined' ? window.location.href : ''
        if (props.title != "") {
          fields[0].formname = props.title
        }
        // tracking event
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'formSubmit',
          'formType': formvalues.property_type ? formvalues.property_type : '',
          'formId': 'form - ' + fields[0].event_tracking,
          'formName': fields[0].event_tracking,
          'formLabel': fields[0].event_tracking
        });
      }
      processFromData();

    }
  }, [token]);

  const handleonVerify = token => {
    console.log("captcha verified");
    setToken(token);
  };

  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setShowerror(true);
      setValidated(true);
      setThankyou(false);
      setTimeout(() => {
        const element = document.querySelector(".alert-danger");
        if (element) {
          window.scrollTo({
            behavior: 'smooth',
            top:
              element.getBoundingClientRect().top -
              document.body.getBoundingClientRect().top -
              200,
          })
        }
      }, 100);
    }
    else {
      if (postCodeError) {
        document.getElementById('leadpro_postcode').value = '';
        setShowerror(true);
        setValidated(true);
        setThankyou(false);
        event.preventDefault();
        event.stopPropagation();
        setTimeout(() => {
          document.getElementById('leadpro_postcode').value = '';
          const element = document.querySelector(".alert-danger");
          if (element) {
            window.scrollTo({
              behavior: 'smooth',
              top:
                element.getBoundingClientRect().top -
                document.body.getBoundingClientRect().top -
                200,
            })
          }
        }, 100);
      }
      else {
        event.preventDefault();
        setShowerror(false);
        const formsdata = (event.target);
        const json = {}
        Object.keys(formsdata).map(key => (
          json[formsdata[key].name] = (formsdata[key].checked) ? 'yes' : formsdata[key].value
        ))
        if( json['admin_company_website'] == "" && json['user_company_website'] == "") {
          json['email_temp_user'] = fields[0].email_temp_user;
          json['email_temp_admin'] = fields[0].email_temp_admin;
          json['formname'] = fields[0].formname;
          json['g-recaptcha-response'] = token;
          json['files'] = file;
          setFile(file);
          setFormvalues(json);

          if(process.env.GATSBY_CAPTCHA_SERVICE === ""){
            recaptchaRef.current.execute();
          }

          if(process.env.GATSBY_CAPTCHA_SERVICE !== ""){
            setToken("honeypot")
          }
          setValidated(false);

          // reset form
          const form = event.target
          form.reset();
        }
      }
    }
  };

  const url = typeof window !== 'undefined' ? window.location.href : ''
  return (
    <div className={props.classname}>
      <div ref={myRef} />
      <Form className={`form stb-form ${props.formtagclassname}`} id="contact-form" name={fields[0].formname} action="/thank-you/" method="post" noValidate validated={validated} onSubmit={handleSubmit}>

        {showerror && <div className="alert alert-danger">
          {fields[0].error_text}
        </div>}

        {showthankyou && <div className="alert alert-success">
          {fields[0].success_text}
        </div>}
        <input type="hidden" name="form_name" value={fields[0].formname} />
        <input type="hidden" name="form_type" value={fields[0].form_type} />
        <input type="hidden" name="to_email_id" value={props.to_email_id ? props.to_email_id : fields[0].email_to} />
        <input type="hidden" name="admin_company_website" value="" />
        <input type="text" name="user_company_website" value="" className="invisible" style={{ width: "1px", height: "1px" }} />
        <input type="hidden" name="form_page" value={url} />
        <div className="step-block row">
          {fields.map((field, index) => {
            if ("input" === field.element) {
              return (
                <InputField
                  name={field.name}
                  grpmd={field.grpmd}
                  ref={field.ref}
                  type={field.type}
                  startDate={field.type === 'date_time' ? startDate : ''}
                  setStartDate={field.type === 'date_time' ? setStartDate : ''}
                  startTime={field.type === 'timePicker' ? startTime : ''}
                  setStartTime={field.type === 'timePicker' ? setStartTime : ''}
                  fieldClass={field.class}
                  placeholder={field.placeholder}
                  label={field.label}
                  labelClass={field.labelClass}
                  required={field.required}
                  key={`${field.element}~${index}`}
                  pattern={field.patternchk}
                  handlechange={handlechange}
                  defaultValue={field.defaultValue}
                  className={field.className}
                  step={field.step}
                />
              );
            }
            if ("select" === field.element) {
              return (
                <SelectField
                  name={field.name}
                  grpmd={field.grpmd}
                  label={field.label}
                  ref={field.ref}
                  required={field.required}
                  fieldClass={field.class}
                  placeholder={field.placeholder}
                  values={field.values}
                  key={`${field.element}~${index}`}
                  handlechange={handlechange}
                  componentprops={props}
                  className={field.className}
                />
              );
            }
            if ("textarea" === field.element) {
              return (
                <TextAreaField
                  name={field.name}
                  grpmd={field.grpmd}
                  ref={field.ref}
                  rows={field.rows}
                  fieldClass={field.class}
                  labelClass={field.labelClass}
                  placeholder={field.placeholder}
                  label={field.label}
                  required={field.required}
                  key={`${field.element}~${index}`}
                  handlechange={handlechange}
                  className={field.className}
                />
              );
            }
            if ("checkbox" === field.element) {
              return (
                <CheckboxField
                  name={field.name}
                  ref={field.ref}
                  value={field.value}
                  fieldClass={field.class}
                  placeholder={field.placeholder}
                  required={field.required}
                  key={`${field.name}~${index}`}
                  handlechange={handlechange}
                  className={field.className}
                />
              );
            }
            if ("file" === field.element) {
              return (
                <FileField
                  name={field.name}
                  grpmd={field.grpmd}
                  ref={field.ref}
                  type={field.type}
                  fieldClass={field.fieldClass}
                  label={field.label}
                  labelClass={field.labelClass}
                  placeholder={field.placeholder}
                  key={`${field.element}~${index}`}
                  accept={field.accept}
                  handlechange={handleAttachment}
                  required={field.required}
                  className={field.className}
                  file={file}
                />
              );
            }
            if ("radio" === field.element) {
              return (
                <RadioField
                  name={field.name}
                  ref={field.ref}
                  value={field.value}
                  fieldClass={field.class}
                  checked={field.checked}
                  placeholder={field.placeholder}
                  required={field.required}
                  key={`${field.name}~${index}`}
                  handlechange={handlechange}
                  lastchild={field.lastchild}
                  className={field.className}
                />
              );
            }

            if ("postcode" === field.element) {
              return (
                <PostcodeField
                  name={field.name}
                  divclass={field.divclass}
                  grpmd={field.grpmd}
                  label={field.label}
                  ref={field.ref}
                  type={field.type}
                  fieldClass={field.class}
                  placeholder={field.placeholder}
                  labelClass={field.labelClass}
                  required={field.required}
                  key={`${field.element}~${index}`}
                  pattern={field.patternchk}
                  handlechange={handlechange}
                  errorMsg={field.errorMsg}
                  selectHandelChange={selectHandelChange}
                  postcodeChange={postcodeChange}
                  setPostCodeError={setPostCodeError}
                  className={field.className}
                />
              );
            }
            if ("html" === field.element) {
              return (
                <HtmlBox
                  text={field.text}
                  fieldClass={field.class}
                  key={`${field.element}~${index}`}
                  className={field.className}
                />
              );
            }
            if ("captcha" === field.element && process.env.GATSBY_CAPTCHA_SERVICE === "") {
              return (
                <ReCaptchaBox
                  fieldClass={field.class}
                  captRef={recaptchaRef}
                  key={`${field.element}~${index}`}
                  handleonVerify={handleonVerify}
                  className={field.className}
                />
              );
            }
            if ("button" === field.element) {
              return (
                <ButtonField
                  name={field.name}
                  fieldClass={field.class}
                  step={field.step}
                  formclass={field.formclass}
                  disable={ctaDisable}
                  type={field.type}
                  value={field.value}
                  key={`${field.element}~${index}`}
                  className={field.className}
                />
              );
            }
          })
          }
        </div>
      </Form>
    </div>
  );
}

const DefaultForm = (props) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            mailVars {
              contact_email
              company_phone
              available_time
              available_days
              address
              primary_color
              enquiry
              valuation
            }
          }
        }
      }
    `
  )

  const siteData = site.siteMetadata?.mailVars

  return (
    <FormComponent fields={props.fields} classname={props.classname} to_email_id={props.to_email_id} title={props.title} formtagclassname={props.formtagclassname} prop_url={`${props?.prop_url}`} prop_address={`${props?.prop_address}`} prop_img_url={`${props?.prop_img_url}`}
      email_template_type={`${props?.email_template_type}`} siteData={siteData} />
  )
}

export default DefaultForm
