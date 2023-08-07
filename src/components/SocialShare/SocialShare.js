import React from "react";
import {
	FacebookShareButton,
	LinkedinShareButton,
	TwitterShareButton,
	WhatsappShareButton,
	FacebookIcon,
	LinkedinIcon,
	TwitterIcon,
	WhatsappIcon
} from "react-share";
// import {Link}  from "gatsby"
import './assets/styles/_index.scss';

const SocialShare = (props) => {

    // Social share
	const shareurl = typeof window !== 'undefined' ? window.location.href : ''
	
	const [Shareicons,setShareicons] = React.useState(false);
	
	const openShareicons = () => {
	    setShareicons(true);
        if(Shareicons === true) {
            setShareicons(false);
        }
	}

	const trackerShare = (event) => {    
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({
		'event': 'Share - social icons',
		'formType': event + ' - ' +shareurl,
		'formId': 'Share',
		'formName': 'Social Share',
		'formLabel': 'Social Share'
	});    
	}
	// Social share

    return (
        <div className={"share social-share-wrapper"}>
            <button className="d-flex align-items-center property-share-btn" onClick={openShareicons}><i className={props.iconClass}></i> {props.shareText}</button>
            {
                Shareicons &&
                <div onClick={openShareicons} className="property-share-social-icons mobile-details-socila-share">
                    <FacebookShareButton onClick={()=>trackerShare('FacebookShareButton')} url={shareurl} className="my-share-button facebook-share">
                        <FacebookIcon size={32} round={false} borderRadius={`10`} />
                    </FacebookShareButton>
                    <TwitterShareButton onClick={()=>trackerShare('TwitterShareButton')} url={shareurl} className="my-share-button twitter-share">
                        <TwitterIcon size={32} round={false} borderRadius={`10`} />
                    </TwitterShareButton>
                    <LinkedinShareButton onClick={()=>trackerShare('LinkedinShareButton')} url={shareurl} className="my-share-button linkedin-share">
                        <LinkedinIcon size={32} round={false} borderRadius={`10`} />
                    </LinkedinShareButton>
                    <WhatsappShareButton onClick={()=>trackerShare('WhatsappShareButton')} url={shareurl} className="my-share-button whatsapp-share">
                        <WhatsappIcon size={32} round={false} borderRadius={`10`} />
                    </WhatsappShareButton>
                </div>
            }
        </div>
    )
}

export default SocialShare