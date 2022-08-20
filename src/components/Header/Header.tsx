
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
const Header = () => {
  const user = useAppSelector(state => state.user.user)
  const [showModal,setShowModal] = useState(false)
  const [avatarOnFocus,setAvatarOnFocus] = useState(false)
  const showSideBar = useAppSelector(state => state.modal.show_side_bar)
  const show_login_or_faq = useAppSelector(state =>  state.modal.show_login_or_faq)
  const closeSideBar = modalReducer.actions.CloseSideBar
  // set current device(helps with ui stuff)
  const {setDevice} = DeviceReducer.actions
  const getDevice = useDevice()
  const loading = useAppSelector(state => state.video.loading)
  const dispatch = useAppDispatch()
  const GET_WATCHED_LIST = useGetWatchedForUser()
  useEffect(() => {
    if (user){
      dispatch(setDevice(getDevice))
      GET_WATCHED_LIST(user.username)
    }

  },[user?.username]) // if dependency array is empty,then doesen't work
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
          <ModalWindow showModal={showModal} setShowModal={setShowModal}>
            {show_login_or_faq === 'login'
            ? (<LoginForm setShowModal={setShowModal}/>    )
            : (<FAQ/>    )}     
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
                  <button style={{'marginRight':30+'px'}}  className='btn btn-light' onClick={() => setShowModal(true)}>Sign In</button>
              </div>
            )}</div>
          )
          }
    </nav>
  )
}

export default Header

