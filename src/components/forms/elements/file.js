import React, { useState, useEffect } from "react"
import { Form } from "react-bootstrap"
import Col from "react-bootstrap/Col"


const FileField = ({ fieldClass, labelClass, type, name, value, required, placeholder, handlechange, accept, label, grpmd, file,className }) => {
 // const [file, setFile] = React.useState(null);
  const fileRef = React.createRef(null);

  return (
    <Form.Group controlId={"validation" + name} className={`${grpmd} ${className ? className : ''}`} >
      {label
        ? <Form.Label className={labelClass}>{label}{required ? '' : ''}</Form.Label>
        : ''
      }
      <div className={fieldClass} onClick={() => fileRef.current.click()}> 
      <span>{file ? file.name : placeholder}</span></div>
        <Form.Control
          controlId="custom-file"
          required={required}
          type={type}
          name={name}
          value={value}
          className="d-none" 
          onChange={handlechange}
          accept={accept}
          ref={fileRef}
          id="custom-file"
        /> 
    </Form.Group>
  );
}

export default FileField;
