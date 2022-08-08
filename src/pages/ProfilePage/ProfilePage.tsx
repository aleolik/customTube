import React, { useEffect, useState,useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/TypedHooks'
import { LOAD_VIDEOS } from '../../reducers/asyncActions/LOAD_VIDEOS'
import { IVideo } from '../../types/VideoTypes'
import css from './ProfilePage.module.css'
import bg from '../../media/bg.jpeg'
import defaultUserAvatar from '../../media/defaultUserAvatar.png'
import { useParams } from 'react-router-dom'
import VideoForm from '../../components/VideoForm/VideoForm'
const ProfilePage = () => {
  const dispatch = useAppDispatch()
  const username = useParams()
  // create video
  const user = useAppSelector(state => state.user.user)
  // load videos
  const {error,loading,videos} = useAppSelector(state => state.video)
  useEffect(() => {
   dispatch(LOAD_VIDEOS())
  },[])
  return (
    <div className={css.center}>
        <h4 style={{'marginTop':20+'px','border':'black 5px solid'}}>{user?.username}</h4>
        {user?.photoUrl === null
        ? (
          <img src={defaultUserAvatar} style={{'width':100+'px','height':60+'px','borderRadius' : 60+'px','marginTop':10+'px','border':'2px solid gray'}}></img>
        )
        : (
          <img src={user?.photoUrl} style={{'width':100+'px','height':60+'px','borderRadius' : 60+'px','marginTop':10+'px','border':'2px solid gray'}} ></img>
        )}
        <VideoForm/>
         {loading
         ? (<div>Загрузка...</div>)
         : (
          <div>
            {videos.length
            ? (
              <div className='videos'>
                {videos.map((video,index) => {
                  return(
                    <div className='video' key={video.id}>
                      <h3>
                          {video.name} - {video.created} - {video.description}
                       </h3>
                    </div>
                  )
                })}
              </div>
            )
            : (
              <div>Ошибка</div>
            )}
          </div>
         )}
    </div>
  )
}

export default ProfilePage