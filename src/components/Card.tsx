import { ref, getDownloadURL, } from 'firebase/storage'
import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RenderTimeAgo } from '../helpers/VideoHelpers/RenderTimeAgo'
import { storage } from '../index'
import { IVideo } from '../types/VideoTypes'
import RenderUserAvatar from '../helpers/RenderUserAvatar'
interface CardProps{
    video : IVideo
}
export const Card : FC<CardProps> = ({video}) => {
  const nameMaxLength = 45
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

  const cardNavigate = () => {
    navigate(`/${video.id}/${video.user.username}`)
  }
  return (
  <div className="card mx-auto" style={{'width':'18rem','height':'30rem','cursor':'pointer'}} onClick={cardNavigate}>
    <img style={{'width':285,'height':230}} className="card-img-top img-thumbnail" src={photo} alt=".../"/>
    <div className="card-body">
      {video.name.length >= nameMaxLength
      ? (      <h5 style={{'height':40}} className="card-title">{video.name.substring(0,nameMaxLength)}...</h5>)
      : (      <h5 style={{'height':40}} className="card-title">{video.name}</h5>)}
    </div>
    <RenderTimeAgo video={video}/>
    <div className="card-body">  
      <RenderUserAvatar givenUser={video.user}/>     
    </div>
  </div>
  )
}

