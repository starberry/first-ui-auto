import React from 'react'
import { Form } from "react-bootstrap"
import { Row, Col, Container } from 'react-bootstrap';


function myplaceholder(props) {
  return <div>{props.html}</div>;
}

function createMarkup(props) {
  return { __html: (props.html) };
}

function MyComponent(props) {
  return <div dangerouslySetInnerHTML={createMarkup(props)} />;
}
const RadioboxField = ({ fieldClass, name, value, required, placeholder, handlechange, checked, lastchild, step, type, grpmd, label }) => (
  <div className={`form-group radio-wrap ${lastchild} ${step}`}>
    <input type="radio" id={value} name={name} value={value} checked={checked} />
    <label className="radio-label" for={value}>
      {label}
    </label>
    <span className="radio-ico"></span>
  </div>
);

export default RadioboxField;
