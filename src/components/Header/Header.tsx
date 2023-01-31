
import  {useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/TypedHooks'
import LoginForm from '../LoginForm/LoginForm'
import ModalWindow from '../MyModal/ModalWindow'
import FAQ from '../FAQ'
import { LogoHeader } from './HeaderElements/LogoHeader'
import { UserAvatar } from './HeaderElements/UserAvatar'
import BurgerMenu from '../BurgerMenu/BurgerMenu'
import {modalReducer} from '../../reducers/ModalReducer'
import RegisterForm from '../RegisterForm'
import SearchBar from './HeaderElements/./SearchBar/SearchBar'
import { useDevice } from '../../helpers/useDevice'
import { isMobile } from 'react-device-detect'
import { useDarkModeChange } from '../../hooks/useDarkModeChange'
import {MdDarkMode} from 'react-icons/md'
const Header = () => {
  const CHAGE_COLOR_MODE = useDarkModeChange()
  const user = useAppSelector(state => state.user.user)
  const showModal = useAppSelector(state => state.modal.showModal)
  const {showModalWindow,closeModalWindow} = modalReducer.actions
  const [avatarOnFocus,setAvatarOnFocus] = useState(false)
  const showSideBar = useAppSelector(state => state.modal.show_side_bar)
  const {showFAQ,showLogin,showRegister} = useAppSelector(state =>  state.modal)
  const closeSideBar = modalReducer.actions.CloseSideBar
  const {loading,AllLoading} = useAppSelector(state => state.video)
  const dispatch = useAppDispatch()
  const GlobalSearchBarFocused = useAppSelector(state => state.searchBar.GlobalSearchBarFocused)
  const OpenModalWindow = () => {
    dispatch(showModalWindow())
  }


  // make scroll unavailable when sideBar on
  useEffect(() => {
    if (showSideBar || showModal || (avatarOnFocus && isMobile)){
      document.body.style.overflow = 'hidden'
    }
    else{
      document.body.style.overflow = ''
    }
  },[showSideBar,showModal,avatarOnFocus])

  const closeSideBarIfOpen = () => {
    if (showSideBar){
      dispatch(closeSideBar())
    }
  }
  const darkMode = useAppSelector(state => state.state.darkMode)
  return (
      <nav onClick={closeSideBarIfOpen} className={`navbar sticky-sm-top sticky-md-top sticky-lg-top sticky-xl-top navbar-light ${darkMode ? 'bg-dark' : 'bg-light'}`} style={{'height':75+'px','zIndex':1000,'display':'flex'}}>
        {showSideBar && (
            <BurgerMenu/>
        )}
        {GlobalSearchBarFocused && isMobile
        ? (<></>)
        : (<LogoHeader />)}
        <SearchBar/>
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
          <>
            {(AllLoading || loading) && !user
            ?(
                <div style={{'border':'gray 2px solid','width':80+'px','height':60+'px','borderRadius':40+'px','marginRight':30,'backgroundColor':'lightgray'}} ></div>
              )
            :(
              <div>{user
              ? (
                <>
                  {isMobile && GlobalSearchBarFocused
                  ? (<></>)
                  : (<UserAvatar avatarOnFocus={avatarOnFocus} setAvatarOnFocus={setAvatarOnFocus}/>)}
                </>    
              )
              : (
                <div>
                    {GlobalSearchBarFocused && isMobile
                      ? (<></>)
                      : (
                      <div>
                        <button style={{'marginRight':15}} className={`${darkMode ? 'btn btn-light' : 'btn btn-primary'}`}><MdDarkMode color={`${darkMode ? 'black' : 'white'}`} onClick={CHAGE_COLOR_MODE} size={25}/></button>
                        <button style={{'marginRight':30+'px'}}  className='btn btn-light' onClick={OpenModalWindow}>Sign In </button>
                        
                      </div>)
            
                    }
                </div>
              )}</div>
            )
            }
          </>
    </nav>
  )
}

export default Header

