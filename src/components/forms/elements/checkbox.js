import React from 'react'
import { Form } from "react-bootstrap"
import { Row, Col, Container, Breadcrumb } from 'react-bootstrap';

function myplaceholder(props) {
  return <div>{props.html}</div>;
}

function createMarkup(props) {
  return { __html: (props.html) };
}

function MyComponent(props) {
  return <div dangerouslySetInnerHTML={createMarkup(props)} />;
}

const CheckboxField = ({ fieldClass, name, value, required, placeholder, handlechange, label, type, step, grpmd }) => (
  <>
    <Form.Group md={grpmd} className={`${type} ${step} ${fieldClass}`} controlId={"validation" + name}>
      {label
        ? <p className="label"><Form.Label className="form-label">{label}{required ? '*' : ''}</Form.Label></p>
        : ''
      }
      <label className="check-card mb-4 pb-2 checkbox-div">
        <input required={required} className="" type="checkbox" id={name} name={name} value={value} /><MyComponent html={placeholder} />
        <span className="check-mark"></span>
      </label>
    </Form.Group>
  </>
);

export default CheckboxField