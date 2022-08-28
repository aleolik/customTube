import React, { ChangeEvent, useState,MouseEvent } from 'react'
import RenderAlert from '../helpers/RenderAlert'
import { useAppSelector } from '../hooks/TypedHooks'
import { useLoginWithEmailAndPassword } from '../hooks/useLoginWithEmailAndPassword'
import { useRegisterWithEmailAndPassword } from '../hooks/useRegisterWithEmailAndPassword'

// login or register form when modal open
const InputForm = () => {
  const [email,setEmail] = useState<string>('')
  const [password,setPassword] = useState<string>('')
  const [username,setUsername] = useState<string>('')
  const {showLogin,showRegister} = useAppSelector(state => state.modal)
  const register = useRegisterWithEmailAndPassword()
  const login = useLoginWithEmailAndPassword()
  const error = useAppSelector(state => state.modal.error)
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
      login(email,password)
    }
    // create new user
    else{
      register(username,email,password)
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
          <div style={{'display':'flex','justifyContent':'center'}}>
            <button style={{'width':60+'%'}} className='btn btn-lg btn-outline-primary'>{showLogin ? 'Login' : 'Register'}</button>
          </div>
    </form>
  )
}

export default InputForm
