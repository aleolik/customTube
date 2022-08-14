import { ref, getDownloadURL, } from 'firebase/storage'
import React, { FC, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDevice } from '../helpers/useDevice'
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
    navigate(`${video.name}/${video.user.username}`)
  }

  const avatarNavigate = (e : React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    navigate(`user/${video.user.username}`)
  }

  const onMouseEnter = () => {
    setImageFocus(true)
  }
  const onMouseLeave = () => {
    setImageFocus(false)
  }
  return (
  <div className="card mx-auto" style={{'width':'18rem'}} onClick={cardNavigate}>
    <img style={{'width':285,'height':230}} className="card-img-top" src={photo} alt=".../"/>
    <div className="card-body">
      <h1 className="card-title">{video.name}</h1>
      <hr></hr>
      <p className="card-text">{video.description}</p>
    </div>
    <ul className="list-group list-group-flush">
      <li className="list-group-item">{video.created}</li>
    </ul>
    <div className="card-body"
    onClick={avatarNavigate}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}>
        {video.user.photoUrl && (
            <img style={{'width':60,'height':45,'borderRadius':30+'px','border':imageFocus ? '2px solid aqua' : '2px solid gray'}} src={video.user.photoUrl} alt=''></img>
        )}
        <h4>{video.user.username}</h4>
    </div>
  </div>
  )
}

