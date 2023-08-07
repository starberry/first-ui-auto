import { Script } from 'gatsby';
import React, { useEffect, useState } from 'react'


const EstasReview = ({ estas_key }) => {
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
        }, 2000);
    }, [])

    if (typeof window !== "undefined") {
        (function (w, d, s, o, f, estas) {
            w['ESTAS-Widget'] = o; w[o] = w[o] || function () { (w[o].q = w[o].q || []).push(arguments) };
            let js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];
            js.id = o; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs);
        }
            (window, document, 'script', 'estas', 'https://www.theestas.com/assets/js/min/widget.bundle.js'));
    }

    return (
        <React.Fragment>
            {renderComponent &&
                <Script type='text/javascript' strategy='idle'>
                    {`
                    (function (w, d, s, o, f, js, fjs) {w['ESTAS-Widget'] = o; w[o] = w[o] || function () {(w[o].q = w[o].q || []).push(arguments)};js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];js.id = o; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs);}(window, document, 'script', 'estas', 'https://www.theestas.com/assets/js/min/widget.bundle.js'));estas('init', {el: 'estas-widget', key: '${estas_key}', showComments: true, showPhil: false, floatingWidget: false, minimumRating: 4, name: 'name' });
                    `}
                </Script>
            }
            <div id="estas-widget"></div>
        </React.Fragment>
    )
}

export default EstasReview