import React, { ChangeEvent, useState,MouseEvent } from 'react'
import RenderAlert from '../helpers/RenderAlert'
import { useAppDispatch, useAppSelector } from '../hooks/TypedHooks'
import { useCreateUserDoc } from '../hooks/useCreateUserDoc'
import { useLoginWithEmailAndPassword } from '../hooks/useLoginWithEmailAndPassword'
import { REGISTER_USER } from '../reducers/asyncActions/REGISTER_USER'
import { Loader } from './Loader/Loader'
import {modalReducer} from '../reducers/ModalReducer'
// login or register form when modal open
const InputForm = () => {
  const [email,setEmail] = useState<string>('')
  const [password,setPassword] = useState<string>('')
  const [username,setUsername] = useState<string>('')
  const {showLogin,showRegister} = useAppSelector(state => state.modal)
  const login = useLoginWithEmailAndPassword()
  const load = useAppSelector(state => state.loader.load)
  const error = useAppSelector(state => state.modal.error)
  const CREATE_DOC = useCreateUserDoc()
  const dispatch = useAppDispatch()
  const setError = modalReducer.actions.setError
  // handlers
  const emailHandler = (e : ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const passwordHandler = (e : ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }
  const usernameHandler = (e : ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const AuthWithEmailAndPassword = (e : MouseEvent<HTMLFormElement>) => {
    e.preventDefault()
    // login
    if (showLogin){
      if (email && password){
        dispatch(setError(''))
        login(email,password)
      }
      else{
        dispatch(setError('Email Or Password are Empty'))
      }
    }
    // create new user
    else{
      if (username && email && password){
        dispatch(setError(''))
        dispatch(REGISTER_USER(email,username,password,login,CREATE_DOC))
      }
      else{
        dispatch(setError('Username Or Password or Email are Empty'))
      }
    }
  }
  return (
    <form onSubmit={AuthWithEmailAndPassword}>
        {error && (
          <RenderAlert error={error}/>
        )}
        {showRegister && (
            <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">username</span>
                <input onChange={usernameHandler} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
            </div>
        )}
        <div className="input-group mb-3">
        <span className="input-group-text" id="inputGroup-sizing-default">email</span>
            <input onChange={emailHandler} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
        </div>
        <div className="input-group mb-3">
        <span className="input-group-text" id="inputGroup-sizing-default">password</span>
            <input onChange={passwordHandler} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
        </div>
          {load
          ? (
            <div style={{'opacity':0.5}}><Loader/></div>
          )
          : (
            <div style={{'display':'flex','justifyContent':'center'}}>
              <button  style={{'width':60+'%'}} className='btn btn-lg btn-outline-dark'>{showLogin ? 'Login' : 'Register'}</button>
            </div>
          )}
        
    </form>
  )
}

export default InputForm
