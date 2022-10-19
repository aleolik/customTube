import React, { FC, useEffect } from 'react'
import { CardOnHistoryPage } from '../../components/CardOnHistoryPage'
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
                <CardOnHistoryPage video={video}/>
             </div>
            )
        })}
    </div>
  )
}

export default RenderVideosOnHistroyPage