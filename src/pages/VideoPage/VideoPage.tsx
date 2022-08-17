import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAddVideoToWatched } from '../../hooks/useAddVideoToWatched'

const VideoPage = () => {

  const {videoname,username} = useParams()
  

  useAddVideoToWatched('video1')

  return (
    <div>
      <div className="btn-group">
      <button type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        Action
      </button>
      <ul className="dropdown-menu">
        <li><a className="dropdown-item" href="#">Action</a></li>
        <li><a className="dropdown-item" href="#">Another action</a></li>
        <li><a className="dropdown-item" href="#">Something else here</a></li>
        <li><hr className="dropdown-divider"/></li>
        <li><a className="dropdown-item" href="#">Separated link</a></li>
      </ul>
    </div>
    </div>
    
  )
}

export default VideoPage