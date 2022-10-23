import React, { FC, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppSelector } from '../hooks/TypedHooks'
import FAQ from './FAQ'
import { Loader } from './Loader/Loader'
import LoginForm from './LoginForm'
import ModalWindow from './MyModal/ModalWindow'
import RegisterForm from './RegisterForm'
const ProtectedRoute = () => {

  const user = useAppSelector(state => state.user.user)
  const load = useAppSelector(state => state.loader.load)
  const {showFAQ,showLogin,showRegister} = useAppSelector(state => state.modal)
  return (
    <div>
        {load
        ? (
          <Loader/>
        )
        : (
          <>
            {user !== null
            ? (
                <Outlet/>
            )
            : (
                <ModalWindow protectedRoute={true}>
                    {showLogin
                    && (<LoginForm protectedRoute={true}/>)}
                    {showFAQ
                    && (<FAQ protectedRoute={true}/>)}
                    {showRegister
                    && (<RegisterForm protectedRoute={true}/>)}
                </ModalWindow>
            )}
          </>
        )}
    </div>
  )
}

export default ProtectedRoute