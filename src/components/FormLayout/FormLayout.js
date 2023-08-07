import * as React from "react"
import { Container, Row, Col } from "react-bootstrap";

const LayoutTwo = ({ children, popularSearch }) => {

    return (
        <Container>
            <Row className="d-flex justify-content-center">
                <div className="col-xl-7">
                    {children}
                </div>
            </Row>
        </Container>
    )
}

export default LayoutTwo