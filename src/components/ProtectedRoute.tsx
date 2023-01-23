import React, { FC, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppSelector } from '../hooks/TypedHooks'
import FAQ from './FAQ'
import { Loader } from './Loader/Loader'
import LoginForm from './LoginForm/LoginForm'
import ModalWindow from './MyModal/ModalWindow'
import RegisterForm from './RegisterForm'
const ProtectedRoute = () => {

  const {user,loadUser,userError} = useAppSelector(state => state.user)
  const {showFAQ,showLogin,showRegister} = useAppSelector(state => state.modal)


  return (
    <div>
          <>
            {user === null
            ? (
              <ModalWindow protectedRoute={true}>
                  {showLogin
                  && (<LoginForm protectedRoute={true}/>)}
                  {showFAQ
                  && (<FAQ protectedRoute={true}/>)}
                  {showRegister
                  && (<RegisterForm protectedRoute={true}/>)}
              </ModalWindow>
            )
            : (
                <Outlet/>
            )}
          </>
    </div>
  )
}

export default ProtectedRoute