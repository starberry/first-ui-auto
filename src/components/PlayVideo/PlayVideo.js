import React, { useState, useRef } from "react";
import loadable from "@loadable/component";
import { Modal } from "react-bootstrap";
import "react-modal-video/scss/modal-video.scss";
import getVideoId from "get-video-id";
import "./assets/styles/_index.scss";

//const ReactPlayer = loadable(() => import("react-player"));

const PlayVideo = (props) => {
  const [fullscreen, setFullscreen] = useState(true)
  const vidRef = useRef(null)

  var video_url = ""
  const videoid = props.videourl && getVideoId(props.videourl)
  if (videoid) {
    // video_url = "https://www.youtube-nocookie.com/embed/" + videoid.id
    video_url = "https://www.youtube.com/embed/" + videoid.id + "?autoplay=1"
  }

  if (props.videourl) {
    return (
      <React.Fragment>
        <Modal
          show={props.isOpen}
          onHide={() => props.isCloseFunction(false)}
          dialogClassName="modal-fullscreen modal-video"
          aria-labelledby="example-custom-modal-styling-title"
          backdropClassName="video-backdrop"
          fullscreen={fullscreen}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <iframe
              src={video_url}
              title={props.title}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              frameBorder="0"
              webkitallowfullscreen="true"
              mozallowfullscreen="true"
              allowFullScreen
            />
            {/* <ReactPlayer
              onEnded={() => {
                props.isCloseFunction(false)
              }}
              frameborder="0"
              webkitallowfullscreen
              mozallowfullscreen
              allowfullscreen
              ref={vidRef}
              url={video_url}
              modestbranding="1"
              controls={true}
              autoplay={true}
              muted={true}
              playsinline={true}
              playing={props.isOpen}
              width="100%"
              height="100%"
            /> */}
          </Modal.Body>
        </Modal>
      </React.Fragment>
    )
  } else if (props.htmlink) {
    return (
      <React.Fragment>
        <Modal
          show={props.isOpen}
          onHide={() => props.isCloseFunction(false)}
          dialogClassName="modal-fullscreen modal-video"
          aria-labelledby="example-custom-modal-styling-title"
          backdropClassName="video-backdrop"
          fullscreen={fullscreen}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <iframe title="video_frame" src={props.htmlink} width="100%" height="100%" />
          </Modal.Body>
        </Modal>
      </React.Fragment>
    )
  } else {
    return <empty></empty>
  }
}

export default PlayVideo
