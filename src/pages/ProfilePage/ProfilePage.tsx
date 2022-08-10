import React, { useEffect, useState,useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/TypedHooks'
import { LoadUserVideos } from '../../reducers/asyncActions/LOAD_VIDEOS'
import { IVideo } from '../../types/VideoTypes'
import css from './ProfilePage.module.css'
import defaultUserAvatar from '../../media/defaultUserAvatar.png'
import { useParams } from 'react-router-dom'
import VideoForm from '../../components/VideoForm/VideoForm'
import { IUser, userState } from '../../types/userTypes'
import {useGetUserData} from '../../hooks/useGetUserData'
import NotFoundPage from '../NotFoundPage/NotFoundPage'
import { useLoading } from '../../hooks/useLoading'
const ProfilePage = () => {
  const dispatch = useAppDispatch()
  const {username} = useParams<string>()

  const getUsersPage = useGetUserData(username)
  const [usersPage,setUsersPage] = useState<IUser | null | undefined>(null)

  const user = useAppSelector(state => state.user.user)

  // load videos
  const {error,loading,videos} = useAppSelector(state => state.video)
  // load usersPage
  const useLoad = useLoading()

  useEffect(() => {
    if (username){
      dispatch(LoadUserVideos(username))
      const data = getUsersPage.then((res) => {
        setUsersPage(res?.user)
      })
    }
  },[username])

  return (
    <div className={css.center}>
      {usersPage !== null && usersPage!== undefined ? (
            <div>
                <div style={{'display':'flex'}}>
                  <h4 style={{'marginTop':20+'px','border':'black 5px solid'}}>{usersPage?.username}</h4>
                </div>
                {usersPage?.photoUrl === null
                ? (
                  <img alt='avatar' src={defaultUserAvatar} style={{'width':100+'px','height':60+'px','borderRadius' : 60+'px','marginTop':10+'px','border':'2px solid gray'}}></img>
                )
                  : (
                    <img  alt='avatar' src={usersPage?.photoUrl} style={{'width':100+'px','height':60+'px','borderRadius' : 60+'px','marginTop':10+'px','border':'2px solid gray'}} ></img>
                )}
                {user?.username === username && (
          <VideoForm/>
        )}
         {loading
         ? (<div>Загрузка...</div>)
         : (
          <div>
            {videos.length
            ? (
              <div className={css.videos}>
                {videos.map((video,index) => {
                  return(
                    <div className={css.video} key={video.id}>
                      <h3>
                          {video.name}
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
    : (
      <NotFoundPage/>
    )}
    </div>
  )
}

export default ProfilePage

