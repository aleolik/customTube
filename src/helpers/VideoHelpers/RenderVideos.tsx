import React, { FC } from 'react'
import { Card } from '../../components/Card'
import { IVideo } from '../../types/VideoTypes'

interface RenderVideosProps{
    videos : IVideo[]
}
const RenderVideos : FC<RenderVideosProps> = ({videos}) => {
  return (
    <div className='row'>
        {videos.map((video) => {
            return(
             <div  className='col-lg-2 col-md-6 col-sm-6' key={video.id}>
                <Card video={video}/>
             </div>
            )
        })}
    </div>
  )
}

export default RenderVideos