import React, { useState } from "react";
import loadable from "@loadable/component";
import axios from 'axios';
import { Form } from "react-bootstrap"
import Col from "react-bootstrap/Col"
import _ from "lodash"
const Autosuggest = loadable(() => import("react-autosuggest"));

const PostcodeField = (props) => {

  const [suggestions, setSuggestions] = useState([]);

  const [location, setLocation] = useState('');

  const renderSuggestion = suggestion => {

    var address = resultFormation(suggestion);
    return (
      <div className="post-code-suggestion">
        <p className="mb-0"> {address}</p>
      </div>
    )
  };

  const onChangeLocation = (event, { newValue }) => {
    setLocation(newValue);
    props.selectHandelChange('postcode', newValue)
  };

  const getSuggestionSelected = (event, { suggestion }) => {
    props.postcodeChange(suggestion);

  };

  const resultFormation = (suggestion) => {
    var address = `${suggestion.line_1}`;
    if (suggestion.line_2) {
      address += ` ${suggestion.line_2}`;
    }
    if (suggestion.line_3) {
      address += `, ${suggestion.line_3}`;
    }
    if (suggestion.post_town) {
      address += `, ${_.capitalize(suggestion.post_town)}`;
    }
    if (suggestion.postal_county) {
      address += `, ${_.capitalize(suggestion.postal_county)}`;
    }
    return address;
  }

  const getSuggestionValue = suggestion => {
    var address = resultFormation(suggestion);
    return address;
  }

  const onSuggestionsClearRequested = () => {
    setSuggestions([])
  };

  const onSuggestionsFetchRequested = ({ value }) => {

    var headers =  { Authorization: '94a8c481-d2f4-4a10-a82e-639e746703b8' }
    axios.get('https://leadpro-backend-production.herokuapp.com/ivt/addresses', {
      headers: headers,
      params: { postcode: value }
    })
    .then(function (response) {
      //console.log("response success 1 =>", response);
      if (response.status === 200) {
        if(response?.data?.data?.length > 0){
          //cb(response.data);
          props.setPostCodeError(false);
          setSuggestions(response.data.data)
          //console.log("response success =>", response);
        } else{
          //cb(response.data);
          props.setPostCodeError(true);
          setSuggestions([])
          //console.log("response success =>", response);
        }
      }
    })
    .catch(function (error) {
      props.setPostCodeError(true);
      console.log("response error =>", error);
    })

  };

  const inputProps = {
    value: location,
    onChange: onChangeLocation,
    type: "search",
    placeholder: props.placeholder,
    className: "form-control",
    required: true,
    id: "leadpro_postcode",
  };

  const { inlineIcon = '', className, label, startDate, setStartDate, fieldClass, labelClass, type, name, value, required, placeholder, handlechange, pattern, grpmd, step, inputlabel, max, maxlength, divclass, errorMsg, startTime, setStartTime } = props;

  return (
    <div className={`postcode-field-wrapper  ${className || ''}`}>
      {label
        ? <Form.Label crequiredlassName="form-label">{label}{required ? ' *' : ''}</Form.Label>
        : ''
      }
      <Form.Group as={Col} md={grpmd} className={`${type} ${step} ${fieldClass}`} controlId={"validation" + name}>
        <div className="custom-float">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            onSuggestionSelected={getSuggestionSelected}
            inputProps={inputProps}

          />
        </div>
      </Form.Group>


    </div>
  )
}

export default PostcodeField