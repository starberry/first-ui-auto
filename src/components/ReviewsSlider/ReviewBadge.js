import React, { useEffect, useState } from "react";
import { Script } from "gatsby"

const ReviewsBadge = (props) => {
    const [renderComponent, setRenderComponent] = useState(false);
    useEffect(() => {
        window.addEventListener("mousemove", () => {
            if (renderComponent === false) {
                setRenderComponent(true)
            }
        })
        window.addEventListener("touchmove", () => {
            if (renderComponent === false) {
                setRenderComponent(true)
            }
        })
        window.addEventListener("keypress", () => {
            if (renderComponent === false) {
                setRenderComponent(true)
            }
        })

        setTimeout(() => {
            if (renderComponent === false) {
                setRenderComponent(true)
            }
        }, 5000);

    }, [])
    return (
        <React.Fragment>
            {renderComponent &&
                <Script src="https://apps.elfsight.com/p/platform.js" strategy="idle" />
            }
            <div className={props.code} data-elfsight-app-lazy></div>
        </React.Fragment>
    )
}

export default ReviewsBadge