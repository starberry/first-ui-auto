import React from 'react'
import ReCAPTCHA from 'reaptcha'

const RecaptBox = ({fieldClass, captRef, /*handleonError, handleonExpire,*/ handleonVerify}) => (
  <div className="">
      <div className={fieldClass}>
			<ReCAPTCHA
				data-netlify-recaptcha="true" 
				//onError={handleonError}
				//onExpire={handleonExpire}
				onVerify={handleonVerify}
				ref={captRef}
				size="invisible"
				sitekey={process.env.GATSBY_RECAPTCHA_KEY} //
			/>{/*this suppose to be env*/}
          {/*<small>This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy">Privacy Policy</a> and <a href="https://policies.google.com/terms">Terms of Service</a> apply.</small>*/}
      </div>
  </div>
);

export default RecaptBox