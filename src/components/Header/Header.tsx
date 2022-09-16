
import  {useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/TypedHooks'
import LoginForm from '../LoginForm'
import ModalWindow from '../MyModal/ModalWindow'
import FAQ from '../FAQ'
import { LogoHeader } from './HeaderElements/LogoHeader'
import { UserAvatar } from './HeaderElements/UserAvatar'
import BurgerMenu from '../BurgerMenu/BurgerMenu'
import {modalReducer} from '../../reducers/ModalReducer'
import RegisterForm from '../RegisterForm'
import SearchBar from './HeaderElements/SearchBar'
import { useDevice } from '../../helpers/useDevice'
const Header = () => {
  const user = useAppSelector(state => state.user.user)
  const showModal = useAppSelector(state => state.modal.showModal)
  const {showModalWindow,closeModalWindow} = modalReducer.actions
  const [avatarOnFocus,setAvatarOnFocus] = useState(false)
  const showSideBar = useAppSelector(state => state.modal.show_side_bar)
  const {showFAQ,showLogin,showRegister} = useAppSelector(state =>  state.modal)
  const closeSideBar = modalReducer.actions.CloseSideBar
  const loading = useAppSelector(state => state.video.loading)
  const dispatch = useAppDispatch()
  const device = useDevice()
  const [searchBarOnFocus,setSearchBarOnFocus] = useState<boolean>(false)
  const OpenModalWindow = () => {
    dispatch(showModalWindow())
  }


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
        {searchBarOnFocus && device === 'mobile'
        ? (<></>)
        : (<LogoHeader />)}
        <SearchBar setSearchBarOnFocus={setSearchBarOnFocus} searchBarOnFocus={searchBarOnFocus}/>
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
        {device !== 'mobile'
        ? (
          <>
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
          </>
        )
        : (
          <></>
        )}
    </nav>
  )
}

export default Header

