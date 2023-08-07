import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
// import CareerForm from "../../components/forms/career-form"
// import TeamContact from "../../components/forms/team-contact-form"
// import PropertyEnquiry from "../../components/forms/property-enquiry-form"

const ModalPopup = ({ children, classname, heading,formName }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //('CareerForm',formName)
    return (
        <React.Fragment>

            <a href="javascript:;" variant="primary" className={classname} onClick={handleShow}>
                {children}
            </a>

            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{heading}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {/* { "CareerForm" === formName  &&  <CareerForm/> }   
                    { "TeamContact" === formName  &&  <TeamContact/> }                                   
                    { "PropertyEnquiry" === formName  &&  <PropertyEnquiry/> }                                      */}
                </Modal.Body>
            </Modal>
        </React.Fragment>
    )
}

export default ModalPopup