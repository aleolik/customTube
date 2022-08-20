import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ADD_VIDEO} from '../../hooks/useAddVideoToWatched'
import { IVideo } from '../../types/VideoTypes'

const VideoPage = () => {

  let {videoname,username} = useParams()
  
  if (!videoname){
    videoname = 'error'
  }
  if (!username){
    username = 'error'
  }
  ADD_VIDEO(videoname,username)
  return (
    <div>
      videopage
    </div>
    
  )
}

export default VideoPage