import React, { FC, useEffect } from 'react'
import { Card } from '../../components/Card'
import { IVideo } from '../../types/VideoTypes'
import { isDesktop } from 'react-device-detect'

interface RenderVideosProps{
    videos : IVideo[]
}

const RenderVideos : FC<RenderVideosProps> = ({videos}) => {

  useEffect(() => {
    console.log(window.innerWidth)
  },[])

  return (
    <div className='row'>
        {videos.map((video) => {
            return(
             <div className={`col-lg-3 col-md-4 col-sm-6'`} key={video.id}>
                <Card video={video}/>
             </div>
            )
        })}
    </div>
  )
}

export default RenderVideos