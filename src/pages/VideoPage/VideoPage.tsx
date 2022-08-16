import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAddVideoToWatched } from '../../hooks/useAddVideoToWatched'

const VideoPage = () => {

  const {videoname,username} = useParams()
  

  useAddVideoToWatched('video1')

  return (
    <div>VideoPage</div>
  )
}

export default VideoPage