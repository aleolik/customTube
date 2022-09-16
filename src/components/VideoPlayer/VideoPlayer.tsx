import * as React from "react";
import videojs from "video.js";
import { useEffect } from "react";
// Styles
import "video.js/dist/video-js.css";

interface IVideoPlayerProps {
  options: videojs.PlayerOptions;
}

const initialOptions: videojs.PlayerOptions = {
  controls: true,
  fluid: true,
  controlBar: {
    volumePanel: {
      inline: false
    }
  }
};

const VideoPlayer: React.FC<IVideoPlayerProps> = ({ options }) => {
  const videoNode = React.useRef<HTMLVideoElement>(null);
  const player = React.useRef<videojs.Player>();

  useEffect(() => {
    if (videoNode.current !== undefined && videoNode.current !== null){
      player.current = videojs(videoNode.current, {
        ...initialOptions,
        ...options
      }).ready(function() {
      });
      return () => {
        if (player.current) {
          player.current.dispose();
        }
      };
    }
  },[options]);
  return(
      <video className="video-js vjs-big-play-centered" ref={videoNode}/>
  )
};
export default VideoPlayer;




