import React, { useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/TypedHooks'
import { useADD_VIDEO } from '../../hooks/useAddVideoToWatched'

const VideoPage = () => {

  let {videoname,username} = useParams()


  const ADD_VIDEO_TO_FIREBASE_AND_STATE =  useADD_VIDEO()

  useEffect(() => {
    if (!videoname){
      videoname = 'error'
    }
    if (!username){
      username = 'error'
    }
    ADD_VIDEO_TO_FIREBASE_AND_STATE(username,videoname)
  },[videoname,username])
  return (
    <div>
      videopage
    </div>
    
  )
}

export default VideoPage