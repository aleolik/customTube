import { ref, getDownloadURL, } from 'firebase/storage'
import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RenderTimeAgo } from '../helpers/VideoHelpers/RenderTimeAgo'
import { storage } from '../index'
import { IVideo } from '../types/VideoTypes'
import RenderUserAvatar from '../helpers/RenderUserAvatar'
import { RenderCardTitle } from '../helpers/VideoHelpers/RenderCardTitle'
import { useGetLinkToVideo } from '../hooks/useGetNavigationLinks'
import { useAppSelector } from '../hooks/TypedHooks'
interface CardProps{
    video : IVideo
}
export const Card : FC<CardProps> = ({video}) => {
  const imageRef = ref(storage,`${video.user.email}/${video.user.username}/${video.photoUrl}`)
  const navigate  = useNavigate()
  const [photo,setPhoto] = useState('')
  const [imageFocus,setImageFocus] = useState<boolean>(false)
  useEffect(() => {
    const getPhoto = async() => {
       const url = await getDownloadURL(ref(imageRef))
       setPhoto(url)
    }
    getPhoto()
  },[])

  const link = useGetLinkToVideo(video)
  const cardNavigate = () => {
    navigate(link)
  }
  const darkMode = useAppSelector(state => state.state.darkMode)
  return (
  <div className="card mx-auto" style={{'width':'18rem','height':'30rem','cursor':'pointer','backgroundColor':darkMode ? '#292b2c' : 'white',color:darkMode ? 'white' : 'black'}} onClick={cardNavigate}>
    <img style={{'width':285,'height':230}} className="card-img-top img-thumbnail" src={photo} alt=".../"/>
    <div className="card-body">
        <RenderCardTitle title={video.name}/>
    </div>
    <RenderTimeAgo video={video}/>
    <div className="card-body">  
      <RenderUserAvatar withBackgroundColor={true} givenUser={video.user}/>     
    </div>
  </div>
  )
}

