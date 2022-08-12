import { ref, getDownloadURL, } from 'firebase/storage'
import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { storage } from '../index'
import { IVideo } from '../types/VideoTypes'

interface CardProps{
    video : IVideo
}
export const Card : FC<CardProps> = ({video}) => {
  const imageRef = ref(storage,`${video.user.email}/${video.user.username}/${video.photoUrl}`)
  const navigate  = useNavigate()
  const [photo,setPhoto] = useState('')

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
  return (
  <div className="card" style={{"width":"18rem",'cursor':'pointer','margin':5}} onClick={cardNavigate}>
    <img style={{'width':270,'height':230}} className="card-img-top" src={photo} alt=".../"/>
    <div className="card-body">
      <h1 className="card-title">{video.name}</h1>
      <hr></hr>
      <p className="card-text">{video.description}</p>
    </div>
    <ul className="list-group list-group-flush">
      <li className="list-group-item">{video.created}</li>
    </ul>
    <div className="card-body" onClick={avatarNavigate}>
        {video.user.photoUrl && (
            <img style={{'width':60,'height':45}} src={video.user.photoUrl} alt=''></img>
        )}
        <h4>{video.user.username}</h4>
    </div>
  </div>
  )
}

