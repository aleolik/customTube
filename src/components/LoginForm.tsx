import { ChangeEvent, FC, useState,MouseEvent} from 'react'
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { useAppDispatch, useAppSelector } from '../hooks/TypedHooks'
import { UserReducer } from '../reducers/User'
import FormButtons from './FormButtons'
import {useGoogleLogin} from '../hooks/GoogleHooks/useGoogleLogin'
import { Navigate, useNavigate } from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi'
import InputForm from './InputForm'
import { modalReducer } from '../reducers/ModalReducer'


interface LoginFormProps{
  protectedRoute? : boolean
}


const LoginForm : FC<LoginFormProps> = ({protectedRoute=false}) => {

  const LOGIN_WITH_GOOGLE = useGoogleLogin()

  const closeModalWindow = modalReducer.actions.closeModalWindow

  const dispatch = useAppDispatch()
  const logWithGoogle = () => {
    LOGIN_WITH_GOOGLE()
  }

  
  const navigate = useNavigate()

  const NavigateToMain = () => {
    navigate(-1)
    dispatch(closeModalWindow())
  }

  const canCloseModal = () => {
    if(!protectedRoute){
      dispatch(closeModalWindow())
    }
  }
  return (
    <div onClick={canCloseModal}>
      <div onClick={(e) => e.stopPropagation()}>
        <FormButtons/>
        {protectedRoute && (
            <button className='w-100 btn btn-primary mt-3' onClick={NavigateToMain}><BiArrowBack color='black' size={30} style={{'marginRight':5}}/>Move Back</button>
        )}
        <h1 style={{'textAlign':'center'}}>SignIn with :</h1>
          <InputForm/>
        <h1 style={{'textAlign':'center'}}>OR:</h1>
        <hr></hr>
        <button className='btn-selfmade-blue' onClick={logWithGoogle} style={{'width':100+'%',color:'white'}}><span>Google</span><i></i></button>
      </div>
    </div>
  )
}

export default LoginForm
