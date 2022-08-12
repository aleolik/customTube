
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
const Header = () => {
  const user = useAppSelector(state => state.user.user)
  const [showModal,setShowModal] = useState(false)
  const [avatarOnFocus,setAvatarOnFocus] = useState(false)
  const [avatarOnHover,setAvatarOnHover] = useState(false)
  const showSideBar = useAppSelector(state => state.modal.show_side_bar)
  const show_login_or_faq = useAppSelector(state =>  state.modal.show_login_or_faq)

  // set current device(helps with ui stuff)
  const {setDevice} = DeviceReducer.actions
  const getDevice = useDevice()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setDevice(getDevice))
  },[])
  // make scroll unavailable when sideBar on
  useEffect(() => {
    if (showSideBar){
      document.body.style.overflow = 'hidden'
    }
    else{
      document.body.style.overflow = ''
    }
  },[showSideBar])
  return (
      <nav className="navbar navbar-light bg-dark" style={{'height':75+'px'}}>
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
         {user
          ?(
              <UserAvatar avatarOnFocus={avatarOnFocus} avatarOnHover={avatarOnHover} setAvatarOnFocus={setAvatarOnFocus} setAvatarOnHover={setAvatarOnHover}/>
            )
          :(
            <div>
                <button style={{'marginRight':30+'px'}}  className='btn btn-light' onClick={() => setShowModal(true)}>Sign In</button>
            </div>
          )
          }
    </nav>
  )
}

export default Header

