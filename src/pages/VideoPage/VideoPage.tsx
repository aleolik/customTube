import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer'
import { useDevice } from '../../helpers/useDevice'
import { useAppDispatch, useAppSelector } from '../../hooks/TypedHooks'
import { useADD_VIDEO } from '../../hooks/useAddVideoToWatched'
import {store} from '../../index'
const VideoPage = () => {

  let {videoID,username} = useParams()
  const ADD_VIDEO_TO_FIREBASE_AND_STATE =  useADD_VIDEO()
  const video = store.getState().video.video
  useEffect(() => {
    if (!videoID){
      videoID = 'error'
    }
    if (!username){
      username = 'error'
    }
    ADD_VIDEO_TO_FIREBASE_AND_STATE(username,videoID)
  },[videoID,username])



  // options for videoPlayer(currently disabled)
  /* const [videoOptions,setVideoOptions] = useState({
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: `${sourceFile}`,
        type: "video/mp4"
      }
    ]
  }) */


  

  return (
    <div style={{'justifyContent':'center','display':'flex','alignItems':'center'}}>
      {video?.file && (
        <div>
          {/* <VideoPlayer options={videoOptions}/> - error,source file not working with it */} 
          <h6 style={{'border':'2px solid black','marginTop':10+'px'}}>{video?.name}</h6>
          <h6 style={{'border':'2px solid black'}}>Description : {video?.description}</h6>
          <video autoPlay style={{'width':100+'%','height':100+'%'}} controls>
            <source type="video/mp4" src={video?.file}/>
          </video>
        </div>
      )}
    </div>
    
  )
}

export default VideoPage