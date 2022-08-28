
import  {useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/TypedHooks'
import LoginForm from '../LoginForm'
import ModalWindow from '../MyModal/ModalWindow'
import FAQ from '../FAQ'
import { LogoHeader } from './HeaderElements/LogoHeader'
import { UserAvatar } from './HeaderElements/UserAvatar'
import BurgerMenu from '../BurgerMenu/BurgerMenu'
import { DeviceReducer } from '../../reducers/DeviceReducer'
import { useDevice } from '../../helpers/useDevice'
import { useGetWatchedForUser } from '../../hooks/useAddVideoToWatched'
import {modalReducer} from '../../reducers/ModalReducer'
import { HistoryReducer } from '../../reducers/HistoryReducer'
import { UserReducer } from '../../reducers/User'
import { IUser } from '../../types/userTypes'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import RegisterForm from '../RegisterForm'
const Header = () => {
  const user = useAppSelector(state => state.user.user)
  const showModal = useAppSelector(state => state.modal.showModal)
  const {showModalWindow,closeModalWindow} = modalReducer.actions
  const [avatarOnFocus,setAvatarOnFocus] = useState(false)
  const showSideBar = useAppSelector(state => state.modal.show_side_bar)
  const {showFAQ,showLogin,showRegister} = useAppSelector(state =>  state.modal)
  const closeSideBar = modalReducer.actions.CloseSideBar
  // set current device(helps with ui stuff)
  const {setDevice} = DeviceReducer.actions
  const getDevice = useDevice()
  const loading = useAppSelector(state => state.video.loading)
  const dispatch = useAppDispatch()
  const GET_WATCHED_LIST = useGetWatchedForUser()
  // history settings
  const saveHistory = localStorage?.getItem('history')
  const SET_HISTORY = HistoryReducer.actions.CHANGE_HISTORY_STATE

  const login = UserReducer.actions.login

  const auth = getAuth()
  const OpenModalWindow = () => {
    dispatch(showModalWindow())
  }
  useEffect(() => {
    onAuthStateChanged(auth,(user) => {

      const username = user?.displayName
      let photoURL = user?.photoURL
      const email = user?.email
      if (photoURL === undefined){
        photoURL = null
      }
      if (username && email){
        const madeUser : IUser = {
          username : username,
          photoUrl : photoURL,
          email : email
        }
        dispatch(login(madeUser))
        GET_WATCHED_LIST()
      }
    })
  },[auth.currentUser])
  useEffect(() => {
    dispatch(setDevice(getDevice))
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
  // make scroll unavailable when sideBar on
  useEffect(() => {
    if (showSideBar || showModal){
      document.body.style.overflow = 'hidden'
    }
    else{
      document.body.style.overflow = ''
    }
  },[showSideBar,showModal])

  const closeSideBarIfOpen = () => {
    if (showSideBar){
      dispatch(closeSideBar())
    }
  }
  // works 1 time - loads user watched list from backend
  return (
      <nav onClick={closeSideBarIfOpen} className="navbar sticky-sm-top sticky-md-top sticky-lg-top sticky-xl-top navbar-light bg-dark" style={{'height':75+'px','zIndex':1}}>
        {showSideBar && (
            <BurgerMenu/>
        )}
        <LogoHeader />
        {showModal && (
          <ModalWindow>
            {showLogin
            && (<LoginForm/>)} 
            {showFAQ
            && (<FAQ/>)} 
             {showRegister
            && (<RegisterForm/>)} 
          </ModalWindow>
        )}
         {user && !loading
          ?(
              <UserAvatar avatarOnFocus={avatarOnFocus} setAvatarOnFocus={setAvatarOnFocus}/>
            )
          :(
            <div>{loading
            ? (
              <div style={{'border':'gray 2px solid','width':80+'px','height':60+'px','borderRadius':40+'px','marginRight':30,'backgroundColor':'lightgray'}} ></div>
            )
            : (
              <div>
                  <button style={{'marginRight':30+'px'}}  className='btn btn-light' onClick={OpenModalWindow}>Sign In</button>
              </div>
            )}</div>
          )
          }
    </nav>
  )
}

export default Header

