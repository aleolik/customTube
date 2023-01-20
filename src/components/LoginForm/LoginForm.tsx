import { ChangeEvent, FC, useState,MouseEvent} from 'react'
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { useAppDispatch, useAppSelector } from '../../hooks/TypedHooks'
import { UserReducer } from '../../reducers/User'
import FormButtons from '../FormButtons/FormButtons'
import {useGoogleLogin} from '../../hooks/GoogleHooks/useGoogleLogin'
import { Navigate, useNavigate } from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi'
import InputForm from '../InputForm'
import { modalReducer } from '../../reducers/ModalReducer'
import css from './LoginForm.module.scss'


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
        <FormButtons protectedRoute={protectedRoute}/>
        <h1 style={{'textAlign':'center'}}>Sign In with :</h1>
          <InputForm/>
        <h1 style={{'textAlign':'center'}}>OR:</h1>
        <hr></hr>
        <div className={css.flexDiv}>
            <div onClick={logWithGoogle} className={css.google_btn}>
              <div className={css.google_icon_wrapper}>
                <img className={css.google_icon} src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
              </div>
              <p className={css.btn_text}><b>Sign in with google</b></p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
