
import  {useEffect, useState } from 'react'
import { useAppSelector } from '../hooks/TypedHooks'
import LoginForm from './LoginForm'
import ModalWindow from './MyModal/ModalWindow'
import FAQ from './FAQ'
import { LogoHeader } from '../helpers/HeaderElements/LogoHeader'
import { UserAvatar } from '../helpers/HeaderElements/UserAvatar'
import BurgerMenu from './BurgerMenu/BurgerMenu'
const Header = () => {
  const user = useAppSelector(state => state.user.user)
  const [showModal,setShowModal] = useState(false)
  const [avatarOnFocus,setAvatarOnFocus] = useState(false)
  const [avatarOnHover,setAvatarOnHover] = useState(false)
  const showSideBar = useAppSelector(state => state.modal.show_side_bar)
  const show_login_or_faq = useAppSelector(state =>  state.modal.show_login_or_faq)
  return (
      <nav className="navbar navbar-light bg-dark">
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
                <button style={{'right':20+'px','position':'absolute','bottom':5+'px'}}  className='btn btn-light' onClick={() => setShowModal(true)}>Sign In</button>
            </div>
          )
          }
    </nav>
  )
}

export default Header

