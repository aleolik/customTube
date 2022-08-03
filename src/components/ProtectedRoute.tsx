import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppSelector } from '../hooks/TypedHooks'
import LoginForm from './LoginForm'
import ModalWindow from './MyModal/ModalWindow'
const ProtectedRoute = () => {

  const user = useAppSelector(state => state.user.user)

  const [showModal,setShowModal] = useState<boolean>(true)
  return (
    <div>
        {user !== null
        ? (
            <Outlet/>
        )
        : (
            <ModalWindow showModal={showModal} setShowModal={setShowModal}>
                <LoginForm setShowModal={setShowModal}/>
            </ModalWindow>
        )}
    </div>
  )
}

export default ProtectedRoute