import React, { useEffect, useId, useState, } from 'react'
import {collection,addDoc} from 'firebase/firestore'
import {database} from '../../config'
import css from './Main.module.css'
import {IVideo} from '../../types/VideoTypes'
import { useAppSelector } from '../../hooks/TypedHooks'
import { useBurgerMenuOptions } from '../../helpers/useBurgerMenuOptions'
import { RenderNavigationOptions } from '../../helpers/VideoHelpers/RenderNavigationOptions'
import { Link } from 'react-router-dom'
const Main = () => {
  const collectionRef = collection(database,'videos')
  const [video,setVideo] = useState<IVideo>()
  const items = useBurgerMenuOptions()
  const user = useAppSelector(state => state.user.user?.photoUrl)
  /* useEffect(() => {
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

  } */
  return (
    <div className={css.container}>
      <div className='row' style={{'height':100+'%','width':100+'%'}}>
        <div className={[css.sidebar,'col-1'].join(' ')}>
          <RenderNavigationOptions/>
        </div>  
        <div className={['col-11',css.video_container].join(' ')}>
                  <div className={['col-2',css.item].join(' ')}>a</div>
                  <div className={['col-2',css.item].join(' ')}>a</div>
                  <div className={['col-2',css.item].join(' ')}>a</div> 
                  <div className={['col-2',css.item].join(' ')}>a</div> 
                  <div className={['col-2',css.item].join(' ')}>a</div> 

                  <div className={['col-2',css.item].join(' ')}>a</div> 
                  <div className={['col-2',css.item].join(' ')}>a</div> 
                  <div className={['col-2',css.item].join(' ')}>a</div> 
        </div>
        </div>
    </div>
  )
}

export default Main



