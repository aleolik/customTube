import { ref, getDownloadURL, } from 'firebase/storage'
import React, { FC, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { RenderTimeAgo } from '../helpers/VideoHelpers/RenderTimeAgo'
import { useAppSelector } from '../hooks/TypedHooks'
import { storage } from '../index'
import { IVideo } from '../types/VideoTypes'

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

  const cardNavigate = () => {
    navigate(`/${video.name}/${video.user.username}`)
  }

  const avatarNavigate = (e : React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    navigate(`/user/${video.user.username}`)
  }

  const onMouseEnter = () => {
    setImageFocus(true)
  }
  const onMouseLeave = () => {
    setImageFocus(false)
  }
  return (
  <div className="card mx-auto" style={{'width':'18rem'}} onClick={cardNavigate}>
    <img style={{'width':285,'height':230}} className="card-img-top img-thumbnail" src={photo} alt=".../"/>
    <div className="card-body">
      <h5 className="card-title">{video.name}</h5>
    </div>
    <RenderTimeAgo video={video}/>
    <div className="card-body"
    onClick={avatarNavigate}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}>
        {video.user.photoUrl && (
            <img style={{'width':60,'height':45,'borderRadius':30+'px','border':imageFocus ? '2px solid aqua' : '2px solid gray'}} src={video.user.photoUrl} alt=''></img>
        )}
        <h6>{video.user.username}</h6>
    </div>
  </div>
  )
}

