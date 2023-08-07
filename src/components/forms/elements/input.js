import React, { useState, useEffect } from "react"
import { Form } from "react-bootstrap"
import Col from "react-bootstrap/Col"
import loadable from "@loadable/component";
//import Calendar from 'react-calendar';
//import 'react-calendar/dist/Calendar.css';
// import moment from "moment/src/moment";
// import Moment from 'react-moment';
import setMinutes from "date-fns/setMinutes";
import setHours from "date-fns/setHours";
import "react-datepicker/dist/react-datepicker.css";
const DatePicker = loadable(() => import("react-datepicker"));

const isWeekday = (date) => {
  const day = date.getDay();
  return day !== 0 && day !== 7;
};


const InputField = ({ startDate, setStartDate, startTime, setStartTime, fieldClass, labelClass, type, name, value, required, placeholder, handlechange, pattern, label, grpmd, step, inputlabel, className }) => {

  const [date_value, onChange] = useState(new Date());
  if (type == 'datetime' && date_value) {
    var month = date_value.getMonth() + 1
    var date = date_value.getDate() + '/' + month + '/' + date_value.getFullYear()
  }

  useEffect(() => {
    var input = document.getElementById('validationtelephone');
    if (input) {
      input.onkeydown = function (e) {
        var k = e.which;
        /* numeric inputs can come from the keypad or the numeric row at the top */
        if ((k < 48 || k > 57) && (k < 96 || k > 105) && (k != 8) && (k != 9)) {
          e.preventDefault();
          return false;
        }
      };
    }

  }, []);


  return (

    <Form.Group as={Col} md={grpmd} className={`${type ? type : ''} ${className ? className : ''} ${step ? step : ''}`} controlId={"validation" + name}>
      <div className="custom-float">
        {label
          ? <Form.Label className="form-label">{label}{required ? '' : ''}</Form.Label>
          : ''
        }
        {type === 'timePicker' ?
          <>
            <div className="input_wrap">
              <i className="icon-time"></i>
              <DatePicker
                placeholderText={placeholder}
                className={fieldClass}
                name={name}
                value={startTime}
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                autoComplete="off"
                showTimeSelect
                minTime={setHours(setMinutes(new Date(), 0), 9)}
                maxTime={setHours(setMinutes(new Date(), 0), 18)}
                // excludeTimes={[
                //   setHours(setMinutes(new Date(), 0), 0),
                //   setHours(setMinutes(new Date(), 15), 0),
                //   setHours(setMinutes(new Date(), 30), 0),
                // ]}
                showTimeSelectOnly
                timeIntervals={15}
                dateFormat="h:mm aa"
                required={required}
              />
            </div>
          </> : type === 'datePicker' ?
            <>
              <div className="input_wrap">
                <i className="icon-date"></i>
                <DatePicker
                  renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                  }) => (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} className="picker-previous" type="button">

                      </button>

                      <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} className="picker-next" type="button">

                      </button>
                    </div>
                  )}
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  minDate={new Date()}
                  placeholderText={placeholder}
                  dateFormat="dd/MM/yyyy"
                  className={fieldClass}
                  required={required}
                  autocomplete="off"
                  name={name}
                  id="datePicker"
                  autoComplete={'' + Math.random()}
                  // onChange={handlechange}
                  value={startDate}
                />
              </div>
            </>

            : type === 'date_time' ?
              <>
                <DatePicker

                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  // showTimeSelect
                  minDate={new Date()}
                  placeholderText={placeholder}
                  dateFormat="yyyy-MM-dd"
                  className={fieldClass}
                  required={required}
                  filterDate={isWeekday}
                  autocomplete="off"
                  name={name}
                  autoComplete={'' + Math.random()}
                  // onChange={handlechange}
                  value={startDate}

                />
              </>

              :
              <Form.Control
                className={fieldClass}
                required={required}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={handlechange}
                pattern={pattern}
                autocomplete="off"
              />}

      </div>
    </Form.Group>
  )
}

export default InputField;