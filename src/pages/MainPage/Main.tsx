import React, { useEffect, useId, useState, } from 'react'
import {collection,addDoc} from 'firebase/firestore'
import {database} from '../../config'
import css from './Main.module.css'
import {IVideo} from '../../types/VideoTypes'
import { useAppSelector } from '../../hooks/TypedHooks'
const Main = () => {
  const collectionRef = collection(database,'videos')
  const [video,setVideo] = useState<IVideo>()
  const user = useAppSelector(state => state.user.user)

  useEffect(() => {
    if (user !== null){
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0')
      const yyyy = today.getFullYear();
      setVideo({
        id : 5,
        description : 'video',
        name : 'video',
        link : '/video.mp3',
        user : user,
        created : mm + '/' + dd + '/' + yyyy,
        views : 0
      })
    }
  },[])
  const addVideo = () => {
    addDoc(collectionRef,{
        video : video
    })

  }
  return (
    <div className={css.main_page}>
       <div className='border_menu'>
          first
       </div>
       <div>
            second
       </div>
    </div>
  )
}

export default Main