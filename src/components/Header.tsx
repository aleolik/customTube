
import  {useEffect, useState } from 'react'
import { useAppSelector } from '../hooks/TypedHooks'
import LoginForm from './LoginForm'
import ModalWindow from './MyModal/ModalWindow'
import FAQ from './FAQ'
import { LogoHeader } from '../helpers/HeaderElements/LogoHeader'
import { Options } from '../helpers/HeaderElements/Options'
import { UserAvatar } from '../helpers/HeaderElements/UserAvatar'
const Header = () => {
  const user = useAppSelector(state => state.user.user)
  const [showModal,setShowModal] = useState(false)
  const [avatarOnFocus,setAvatarOnFocus] = useState(false)
  const [avatarOnHover,setAvatarOnHover] = useState(false)
  const [showSideBar,setShowSideBar] = useState(false)


  useEffect(() => {
    console.log(avatarOnFocus)
  },[avatarOnFocus])
  const login_or_register = useAppSelector(state =>  state.modal.login_or_register)
  return (
      <nav className="navbar navbar-light bg-dark">
        <LogoHeader/>
        {showModal && (
          <ModalWindow showModal={showModal} setShowModal={setShowModal}>
            {login_or_register === 'login'
            ? (<LoginForm setShowModal={setShowModal}/>    )
            : (<FAQ/>    )}     
          </ModalWindow>
        )}
         {user
          ?(
            <div>
              <UserAvatar avatarOnFocus={avatarOnFocus} avatarOnHover={avatarOnHover} setAvatarOnFocus={setAvatarOnFocus} setAvatarOnHover={setAvatarOnHover}/>
              {avatarOnFocus && avatarOnHover &&
              (
                <Options/>
              )}
            </div>
    
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

