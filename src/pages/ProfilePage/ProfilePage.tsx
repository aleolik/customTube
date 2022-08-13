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
import RenderVideos from '../../helpers/VideoHelpers/RenderVideos'
import RenderAlert from '../../helpers/RenderAlert'
const ProfilePage = () => {
  const dispatch = useAppDispatch()
  const {username} = useParams<string>()

  const getUsersPage = useGetUserData(username)

  const user = useAppSelector(state => state.user.user)

  // load videos
  const {error,loading,videos} = useAppSelector(state => state.video)
  // load usersPage
  const [usersPage,setUsersPage] = useState<null | undefined | IUser>(null)
  const [fetchData,fetchError,fetchLoading] = useLoading(async() => {
    await getUsersPage.then((res) => setUsersPage(res?.user))
  })

  useEffect(() => {
    if (username){
      dispatch(LoadUserVideos(username))
      fetchData()
    }
  },[username])

  return (
    <div className='container-fluid'>
      {error && (
        <RenderAlert error={error}></RenderAlert>
      )}
      {fetchError && (
        <RenderAlert error={fetchError}></RenderAlert>
      )}
      {(fetchLoading || loading) && !fetchError && !error
      ? (
        <div>Загрузка</div>
      )
      : (
        <div>
            {usersPage !== null && usersPage!== undefined ? (
                <div>
                    <div className={css.center}>
                      <h4 style={{'marginTop':20+'px','border':'black 5px solid'}}>{usersPage?.username}</h4>
                      {usersPage?.photoUrl === null
                      ? (
                        <img alt='avatar' src={defaultUserAvatar} className={css.image}></img>
                      )
                        : (
                          <img alt='avatar' src={usersPage?.photoUrl}  className={css.image} ></img>
                      )}
                    </div>
                    {user?.username === username && (
                      <VideoForm/>
                    )}
              <div>
                <RenderVideos videos={videos}/>
              </div>
            </div>
        )
        : (
          <NotFoundPage/>
        )}    
        </div>
      )}
    </div>
  )
}

export default ProfilePage

