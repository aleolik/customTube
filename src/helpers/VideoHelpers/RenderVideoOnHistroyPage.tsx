import React, { FC } from 'react'
import { Card } from '../../components/Card'
import { IVideo } from '../../types/VideoTypes'

interface RenderVideosOnHistroyPageProps{
    videos : IVideo[]
}
const RenderVideosOnHistroyPage : FC<RenderVideosOnHistroyPageProps> = ({videos}) => {
  return (
    <div className='row'>
        {videos.map((video) => {
            return(
             <div className='col-lg-12 col-md-12 col-sm-12' key={video.id}>
                <Card video={video}/>
             </div>
            )
        })}
    </div>
  )
}

export default RenderVideosOnHistroyPage