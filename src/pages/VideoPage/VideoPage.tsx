import React, { useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useADD_VIDEO} from '../../hooks/useAddVideoToWatched'

const VideoPage = () => {

  let {videoname,username} = useParams()

  const ADD_VIDEO = useADD_VIDEO()

  if (!videoname){
    videoname = 'error'
  }
  if (!username){
    username = 'error'
  }
  useEffect(() => {
    if (videoname && username){
      ADD_VIDEO(videoname,username)
    }
  },[videoname,username])
  return (
    <div>
      videopage
    </div>
    
  )
}

export default VideoPage