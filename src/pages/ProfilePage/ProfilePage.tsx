import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/TypedHooks'
import { LoadUserVideos } from '../../reducers/asyncActions/LOAD_VIDEOS'
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
import { Loader } from '../../components/Loader/Loader'
import { getAuth } from 'firebase/auth'
import { ErrorHandler, ErrorHandlerReturn } from '../../helpers/ErrorHandler'

const ProfilePage = () => {
  const dispatch = useAppDispatch()
  const {username,email} = useParams()

  const auth = getAuth()

  // load videos
  const {error,loading,videos} = useAppSelector(state => state.video)
  // load usersPage
  const [usersPage,setUsersPage] = useState<null | undefined | IUser>(null)
  const getUsersPage = useGetUserData(email)

  const [fetchData,fetchError,fetchLoading] = useLoading(async() => {
    await getUsersPage.then((res) => {
      if (res){
        setUsersPage(res)
      }
    })})


  useEffect(() => {
    try{
      if (email && username){
        console.log('loading')
        dispatch(LoadUserVideos(email))
        fetchData()
      }
    }
    catch(e){
      ErrorHandler(e)
    }
  },[username,email])


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
        <div><Loader/></div>
      )
      : (
        <div>
            {usersPage !== null && usersPage!== undefined ? (
                <div>
                    <div className={css.center}>
                      <h4 style={{'marginTop':20+'px','border':'black 5px solid'}}>{usersPage?.username}</h4>
                      {usersPage?.photoUrl === null
                      ? (
                        <img alt='avatar'  src={defaultUserAvatar} style={{'width':90,'height':60}} className={css.image}></img>
                      )
                        : (
                          <img alt='avatar' src={usersPage?.photoUrl}  style={{'width':90,'height':60}}  className={css.image} ></img>
                      )}
                    </div>
                    {email === auth.currentUser?.email && (
                      <VideoForm videos={videos}/>
                    )}
              <hr></hr>
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

