
import './App.css';
import {Routes,Route, useLocation} from 'react-router-dom'
import Layout from './components/Layout';
import Main from './pages/MainPage/Main';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import VideoPage from './pages/VideoPage/VideoPage';
import { useAppDispatch } from './hooks/TypedHooks';
import HistoryPage from './pages/HistoryPage/HistoryPage';
import { useEffect, useReducer } from 'react';
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
const App = () => {

  // routes + global useEffects
  const auth = getAuth()
  const dispatch = useAppDispatch()
  const UrlToFirestorage = useGetPhotoUrlFromFirestorage()
  // changing the auth state
  useEffect(() => {
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
          email : email
        }).then((res) => {
          if (photoURL && (photoURL.endsWith('jpg') || photoURL.endsWith('.png') || photoURL.endsWith('jpeg'))){
            photoURL = null
          }
          const madeUser : IUser = {
            username : username,
            photoUrl : photoURL ? photoURL : res,
            email : email
          }
          dispatch(WHEN_AUTH_STATE_CHANGED(madeUser))
        })
      }
    })
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
  const titles = [
    {
      'path':'/',
      'title':'Home'
    },
    {
      'path':'/history',
      'title' : 'Your History'
    },
  ]

  useEffect(() => {
    titles.map((obj) => {
      if (obj.path == location.pathname){
        document.title = obj.title
      }
      else{
        document.title = 'React'
      }
    })
  },[location.pathname])
  return (
    <div className="app">
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

