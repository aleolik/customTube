
import './App.css';
import {Routes,Route, useLocation} from 'react-router-dom'
import Layout from './components/Layout';
import Main from './pages/MainPage/Main';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import VideoPage from './pages/VideoPage/VideoPage';
import { useAppDispatch, useAppSelector } from './hooks/TypedHooks';
import HistoryPage from './pages/HistoryPage/HistoryPage';
import { useEffect, useReducer, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { IUser } from './types/userTypes';
import { WHEN_AUTH_STATE_CHANGED } from './reducers/asyncActions/WHEN_AUTH_STATE_CHANGED';
import { DeviceReducer } from './reducers/DeviceReducer';
import { useDevice } from './helpers/useDevice';
import { HistoryReducer } from './reducers/HistoryReducer';
import {LOAD_ALL_VIDEOS} from './reducers/asyncActions/LOAD_ALL_VIDEOS'
import SearchPage from './pages/SearchPage/SearchPage';
import { videoReducer } from './reducers/VideoReducer';
import { useGetPhotoUrlFromFirestorage } from './hooks/useGetPhotoUrlFromFirestorage';
import FAQPage from './pages/FAQPage/FAQPage';
import {Helmet} from "react-helmet";
import { useGetLinkToProfile, useGetLinkToVideo } from './hooks/useGetNavigationLinks';
import { useSelector } from 'react-redux';
import { darkModeConst } from './hooks/useDarkModeChange';
import { StateSlice } from './reducers/StateRedcuer';

export const defaultPlatfromName : string = 'darkTub'

const App = () => {

  // routes + global useEffects
  const auth = getAuth()
  const dispatch = useAppDispatch()
  const UrlToFirestorage = useGetPhotoUrlFromFirestorage()
  // for darkMode
  const {SetDarkModeOff,SetDarkModeOn} = StateSlice.actions
  const darkMode =  useAppSelector(state => state.state.darkMode)
  // changing the auth state
  useEffect(() => {
    const darkModeFromLocalStorage = localStorage.getItem(darkModeConst)
    onAuthStateChanged(auth,(user) => {
      const username = user?.displayName
      let photoURL = user?.photoURL
      const email = user?.email
      if (username && email){
        if (!photoURL){
          photoURL = null
        }
        UrlToFirestorage({
          username : username,
          photoUrl : photoURL,
          email : email,
        }).then((res) => {
          if (photoURL && (photoURL.endsWith('jpg') || photoURL.endsWith('.png') || photoURL.endsWith('jpeg'))){
            photoURL = null
          }
          const madeUser : IUser = {
            username : username,
            photoUrl : photoURL ? photoURL : res,
            email : email,
          }
          dispatch(WHEN_AUTH_STATE_CHANGED(madeUser))
        })
      }
    })
    if (darkModeFromLocalStorage){
      // darkModeFromLocalStorage can be only false(true by default)
      if (darkModeFromLocalStorage === 'false'){
        dispatch(SetDarkModeOff())
      }
    }
  },[])
  const setDevice = DeviceReducer.actions.setDevice
  const device = useDevice()
  const saveHistory = localStorage?.getItem('history')
  const SET_HISTORY = HistoryReducer.actions.CHANGE_HISTORY_STATE
  //
  
  useEffect(() => {
    dispatch(setDevice(device))
    // if item in localStorage then
    if (saveHistory !== undefined){
      if (saveHistory === 'false'){
        dispatch(SET_HISTORY(false))
      }
      else{
        dispatch(SET_HISTORY(true))
      }
    }
  },[])


  const location = useLocation()
 // pages names
 const [title,setTitle ] = useState<string>(defaultPlatfromName)
 const video = useAppSelector(state => state.video.video)
 const titles = [
  {
    'path':'/',
    'title':defaultPlatfromName
  },
  {
    'path':'/history',
    'title' : 'Your History',
  },
  {
    'path':'/FAQ',
    'title' : 'About_Platform'
  },
]
const videoLink = useGetLinkToVideo(video)
if (video){
  titles.push({
    'path' : `${videoLink}`,
    'title' : `${video.name.slice(0,19)+'...'}`
  })
}
  useEffect(() => {
    let foundPath = false
    for (let i = 0;i<titles.length;i++){
      const obj = titles[i]
      console.log(obj.path)
      if (obj.path == location.pathname){
        setTitle(obj.title)
        foundPath = true
        break;
      }
    }
    if (!foundPath){
      console.log(location.pathname)
    }
    if (!foundPath) setTitle(defaultPlatfromName)
  },[location,video])
  return (
    <div className="app" style={{'backgroundColor':darkMode ? 'lightgray' : 'white'}}>
      <Helmet>
        <title>{title}</title>
        <meta charSet='utf-8'></meta>
        <link rel='canocical'></link>

      </Helmet>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Main/>}></Route>
           <Route path='user/:username/:email' element={<ProfilePage/>}></Route>
           <Route path='video=:videoID/user=:username' element={<VideoPage/>}></Route>
           <Route path='search=:search' element={<SearchPage/>}></Route>
           <Route path='/FAQ' element={<FAQPage/>}></Route>
           <Route element={<ProtectedRoute/>}>
              <Route path='/history' element={<HistoryPage/>}></Route>
           </Route>
           <Route path='*' element={<NotFoundPage/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}
export default App

