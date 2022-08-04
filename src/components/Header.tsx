
import  {useEffect, useState } from 'react'
import { useAppSelector } from '../hooks/TypedHooks'
import LoginForm from './LoginForm'
import ModalWindow from './MyModal/ModalWindow'
import FAQ from './FAQ'
import { LogoHeader } from '../helpers/HeaderElements/LogoHeader'
import { UserAvatar } from '../helpers/HeaderElements/UserAvatar'
const Header = () => {
  const user = useAppSelector(state => state.user.user)
  const [showModal,setShowModal] = useState(false)
  const [avatarOnFocus,setAvatarOnFocus] = useState(false)
  const [avatarOnHover,setAvatarOnHover] = useState(false)
  const [showSideBar,setShowSideBar] = useState(false)
  const show_login_or_faq = useAppSelector(state =>  state.modal.show_login_or_faq)
  return (
      <nav className="navbar navbar-light bg-dark">
        <LogoHeader/>
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
                <button  className='btn btn-dark' onClick={() => setShowModal(true)}>Sign In</button>
            </div>
          )
          }
    </nav>
  )
}

export default Header

