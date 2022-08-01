import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../hooks/TypedHooks'
import LoginForm from './LoginForm'
import ModalWindow from './MyModal/ModalWindow'
import logo from '../media/logo.png'
import { Link } from 'react-router-dom'
import RegisterForm from './RegisterForm'
import defaultUserAvatar from '../media/defaultUserAvatar.png'
import { IOption } from '../types/optionTypes'
import {CgMenuGridO} from 'react-icons/cg'
const Header = () => {
  const user = useAppSelector(state => state.user.user)
  const [showModal,setShowModal] = useState(false)
  const [avatarOnFocus,setAvatarOnFocus] = useState(false)
  const [avatarOnHover,setAvatarOnHover] = useState(false)
  const [showSideBar,setShowSideBar] = useState(false)
  const onMouseLeave = () => {
    setAvatarOnFocus(false)
    setAvatarOnHover(false)
  }
  const options : IOption[] = [
    {
      title : 'Profile',
      id : 534533.52312041,
      to : '/profile'
    },
    {
      title : 'Logout',
      id : 534533.5231203,
      to : '/logout'
    }
  ]
  useEffect(() => {
    console.log(avatarOnFocus)
  },[avatarOnFocus])
  const login_or_register = useAppSelector(state =>  state.modal.login_or_register)
  return (
      <nav className="navbar navbar-light bg-dark">
        <div>
          <CgMenuGridO color='white' size={30}/>
          <Link className="navbar-brand" to="/" style={{'color':'white','paddingLeft':10+'px'}}>
            <img  src={logo}  width="30" height="30" className="d-inline-block align-top" alt="brand"/>
            Tube
          </Link>
        </div>
        {showModal && (
          <ModalWindow showModal={showModal} setShowModal={setShowModal}>
              {login_or_register === 'login'
              ? (<LoginForm setShowModal={setShowModal}/>)
              : (<RegisterForm  setShowModal={setShowModal}/>)}
              
          </ModalWindow>
        )}
         {user
          ?(
            <div
            tabIndex={0}
            onClick={() =>setAvatarOnFocus(true)}
            onMouseEnter={() => setAvatarOnHover(true)}
            onMouseLeave={() => onMouseLeave()}
            >
              {user.photoUrl
              ? (
                <div>
                  <img
                  style={{'border':avatarOnFocus && avatarOnHover ? 'aqua 2px solid' : 'white 2px solid'}}  className='__avatar'src={user.photoUrl}></img>
                </div>
              )
              : (
                <div
                > 
                <img
                  tabIndex={0}
                  onClick={() =>setAvatarOnFocus(true)}
                  onMouseEnter={() => setAvatarOnHover(true)}
                  onMouseLeave={() => onMouseLeave()}
                  style={{'border':avatarOnFocus && avatarOnHover ? 'aqua 2px solid' : 'white 2px solid'}}  className='__avatar'src={defaultUserAvatar}
                   
                  ></img>
                </div>
              )}
              {avatarOnFocus && avatarOnHover &&
              (
                <div className='options'>
                 {options.map((option : IOption) => {
                  return(
                    <div key={option.id}>
                        <Link className='option_links ' to={option.to}>{option.title}</Link>             
                    </div>
                  )
                 })}
              </div>
              )}
            </div>
    
            )
          :(
            <div>
                <button  className='btn btn-dark' onClick={() => setShowModal(true)}>Вход</button>
            </div>
          )
          }
    </nav>
  )
}

export default Header