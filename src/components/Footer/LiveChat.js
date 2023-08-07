import React, { useEffect, useState } from "react";
import { Script } from "gatsby"

const LiveChat = (props) => {
    const pageurl = typeof window !== 'undefined' ? window.location.href : ''
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
                <Script src={`https://clients.yomdel.com/tools/chat_script.js?url=${pageurl}`} strategy="idle" />
            }
        </React.Fragment>
    )
}

export default LiveChat