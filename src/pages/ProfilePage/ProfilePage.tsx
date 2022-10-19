import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/TypedHooks'
import { LoadUserVideos } from '../../reducers/asyncActions/LOAD_VIDEOS'
import css from './ProfilePage.module.css'
import defaultUserAvatar from '../../media/defaultUserAvatar.png'
import { useParams } from 'react-router-dom'
import VideoForm from '../../components/VideoForm/VideoForm'
import { IUser } from '../../types/userTypes'
import {useGetUserData} from '../../hooks/useGetUserData'
import NotFoundPage from '../NotFoundPage/NotFoundPage'
import { useLoading } from '../../hooks/useLoading'
import RenderVideos from '../../helpers/VideoHelpers/RenderVideos'
import RenderAlert from '../../helpers/RenderAlert'
import { Loader } from '../../components/Loader/Loader'
import { getAuth } from 'firebase/auth'
import { ErrorHandler, ErrorHandlerReturn } from '../../helpers/ErrorHandler'
import { videoReducer } from '../../reducers/VideoReducer'
import SearchBar from '../../components/Header/HeaderElements/SearchBar'
import { RenderNoDataFound } from '../../helpers/RenerNoDataFound'
import RenderUserAvatar from '../../helpers/RenderUserAvatar'
import { useScroll } from '../../hooks/useScroll'
import { BottomLoader } from '../../components/BottomLoader/BottomLoader'

const ProfilePage = () => {
  const dispatch = useAppDispatch()
  const {username,email} = useParams()

  const user = useAppSelector(state => state.user.user)

  const auth = getAuth()
  // load videos
  const {error,loading,videos,uploading,uploadingError,loadingDynamically} = useAppSelector(state => state.video)
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
        dispatch(LoadUserVideos(email))
        fetchData()
      }
    }
    catch(e){
      ErrorHandler(e)
    }
  },[username,email])

  useScroll(email)


  return (
    <div className='container-fluid'>
      {error && (
        <RenderAlert type='danger' text={error}></RenderAlert>
      )}
      {fetchError && (
        <RenderAlert type='danger' text={fetchError}></RenderAlert>
      )}
      {(fetchLoading && !fetchError) || (loading && !error) || (uploading && !uploadingError)
      ? (
        <div>
          <Loader/>
          {uploading &&
          (<RenderAlert type='info' text='uploadng video,it can take to 1min...'/>)}
        </div>
      )
      : (
        <div>
            {usersPage !== null && usersPage!== undefined ? (
                <div>
                    <div className={css.center}>
                      <h4 style={{'marginTop':20+'px','border':'rgba(0,0,0,0.8) 2px solid','fontFamily':'sans-serif'}}>{usersPage?.username}</h4>
                      <RenderUserAvatar withBackgroundColor={true} withUsername={false} givenUser={usersPage}/>
                    </div>
                    {email === auth.currentUser?.email && (
                      <VideoForm videos={videos}/>
                    )}
              <hr></hr>
              <div style={{'display':'flex','justifyContent':'center','alignItems':'center','marginBottom':10}}>
                    <SearchBar videos={videos} email={usersPage.email}/>
              </div>
              {videos.length
              ? (
                  <RenderVideos videos={videos}/>
              )
              : (
                <div>
                  <RenderNoDataFound/>
                </div>
              )}
            </div>
        )
        : (
          <NotFoundPage/>
        )}    
        </div>
      )}
       {loadingDynamically && (
          <BottomLoader/>
        )}
    </div>
  )
}

export default ProfilePage

