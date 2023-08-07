import React from 'react'
import { Form } from "react-bootstrap"
import Col from "react-bootstrap/Col"

const TextAreaField = ({name, rows, placeholder, required, handlechange, fieldClass, label, grpmd, className}) => (
  <Form.Group as={Col} className={className} md={grpmd} controlId="validation{name}">
    <div className="custom-float">
    { label
      ? <Form.Label>{label}{required ? '*' : ''}</Form.Label>
      : ''
    }
    <Form.Control
      className={fieldClass}
      name={name}
      required={required}
      as="textarea"
      rows={rows}
      onChange={handlechange}
      placeholder={placeholder} 
    />
    </div>
  </Form.Group>
);

export default TextAreaField;