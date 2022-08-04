import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppSelector } from '../hooks/TypedHooks'
import FAQ from './FAQ'
import LoginForm from './LoginForm'
import ModalWindow from './MyModal/ModalWindow'
const ProtectedRoute = () => {

  const user = useAppSelector(state => state.user.user)

  const [showModal,setShowModal] = useState<boolean>(true)

  const show_login_or_faq = useAppSelector(state => state.modal.show_login_or_faq)
  return (
    <div>
        {user !== null
        ? (
            <Outlet/>
        )
        : (
            <ModalWindow protectedRoute={true} showModal={showModal} setShowModal={setShowModal}>
                 {show_login_or_faq === 'login'
                 ? (<LoginForm protectedRoute={true}setShowModal={setShowModal}/>)
                 : (<FAQ/>)}
            </ModalWindow>
        )}
    </div>
  )
}

export default ProtectedRoute