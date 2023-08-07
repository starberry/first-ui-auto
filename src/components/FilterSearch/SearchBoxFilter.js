import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
//import area from "../../../static/areas.json"
//import area from "../../search_config/areas.json";
import './assets/styles/_index.scss';
import './assets/styles/autocomplete.scss';

export default function App(props) {
  const [ area, setArea ] = useState(null);
  const [input, setInput] = useState("");
  const [areaval, setAreaval] = useState(props?.areaVal);
  const [suggestion, setSuggestions] = useState([]);
  const [select, setSelect] = useState("");

  let area_sugg = []
  if(props?.areaVal) {
    let area_sugg_filt = props?.areaVal.replaceAll("-"," ");
    area_sugg = area_sugg_filt.split(" ");
    for (var i = 0; i < area_sugg.length; i++) {
      area_sugg[i] = area_sugg[i].charAt(0).toUpperCase() + area_sugg[i].slice(1);
    }
  }

  useEffect(() => {
    setInput(area_sugg.join(" "))
    fetch("/areas.json").then(res => res.json().then(areas => setArea(areas)));
  },[]);

  const handleChange = (e) => {
    let value = e.target.value;
    let matches = [];

    if (value.length >= 1) {
      const regex = new RegExp(`${value}`, "gi");
      matches = area.filter((item) => regex.test(item.name));
    }

    setSuggestions(matches);
    setInput(value);
    setAreaval(value.replaceAll(/ /g,"-").toLowerCase())
  };

  const selectValue = (item) => {
    setSelect(item);
    setSuggestions("");
    setInput(item);
    setAreaval(item.replaceAll(/ /g,"-").toLowerCase())
  };

  const clearSearch = () => {
    setInput("");
    setSuggestions("");
    setSelect("");
    setAreaval("")
  };

  return (
    <div className="App">
      <div className="mysuggestform-wrapper">
        <Form.Control
          type="text"
          placeholder="Street, area or postcode"
          value={input}
          defaultValue={input}
          name={"area_suggestion"}
          onChange={handleChange}
        />
        <Form.Control
          type="hidden"
          value={areaval}
          defaultValue={areaval}
          name={"area"}
        />
        <div className="mysuggesticon" onClick={clearSearch}>
          {suggestion.length > 0 ? (
            <i className="fa fa-times"></i>
          ) : (
            <i className="fa fa-search"></i>
          )}
        </div>
        {suggestion?.length > 0 ? (
          <div className="mysuggestsuggestion-wrapper">
            {suggestion.map((item) => {
              return (
                <div
                  className="mysuggestsuggestions"
                  key={item.slug}
                  onClick={() => selectValue(item.name)}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
