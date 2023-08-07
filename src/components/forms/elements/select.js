import React from 'react'
import { Form } from "react-bootstrap"
import Col from "react-bootstrap/Col"


const SelectField = ({name, required, placeholder, values, handlechange, fieldClass, label, grpmd, componentprops, step, type, id,className}) => (
  <Form.Group as={Col} md={grpmd} className={`${type} ${step } theme-form-group` } controlId={"validation" + name}>
    { label
      ? <Form.Label className="form-label">{label}{required ? '' : ''}</Form.Label>
      : ''

    }
    <Form.Control
    controlId={id}
		className={fieldClass ?fieldClass + ' form-select' :' form-select'}
		required={required}
		name={name}
		onChange={handlechange}
		as="select"
    value={componentprops ? componentprops[name] : ''}
		>
    <option value="" key="">{placeholder}</option>
		{values.map((val, i) =>{ return (<option value={val.trim()} key={i}>{val}</option>) })}
    </Form.Control>
  </Form.Group>

);

export default SelectField;