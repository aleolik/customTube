import React, { FormEvent,FC, useState } from 'react'
import {provider} from '../index'
import { getAuth,signInWithPopup,GoogleAuthProvider,signInWithRedirect, signInWithEmailAndPassword} from 'firebase/auth'
import { useAppDispatch, useAppSelector } from '../hooks/TypedHooks'
import { UserReducer } from '../reducers/User'
import { IUser } from '../types/userTypes'
import FormButtons from './FormButtons'

interface LoginFormProps{
  setShowModal : (state:boolean) => void // закрывать модальное окно после входа
}
const LoginForm : FC<LoginFormProps> = ({setShowModal}) => {
  const auth = getAuth()
  const {login} = UserReducer.actions
  const [inputEmail,setInputEmail] = useState('')
  const [inputPassword,setInputPassword] = useState('')
  const [errMsg,setErrMsg] = useState('')
  const user = useAppSelector(state => state.user.user)
  const dispatch = useAppDispatch()

  const LoginWithGoogle = (e : FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    signInWithPopup(auth,provider).then((result) => {
        const creds = GoogleAuthProvider.credentialFromResult(result)
        const access_token = creds?.accessToken
        const email = result.user?.email
        const username = result.user?.displayName
        const photoUrl = result.user.photoURL     
        console.log(result)
        if (email && username && access_token && photoUrl){
            const user : IUser = {
                username : username,
                email : email,
                access_token : access_token,
                photoUrl : photoUrl             
            }
            dispatch(login(user))
            setShowModal(false)
        }
    }).catch((e) => console.error(e))
  const LoginWithEmailAndPassword = (e : FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try{
      signInWithEmailAndPassword(auth,inputEmail,inputPassword).then((res) => {
        setShowModal(false)
        
      })
    }
    catch(e){
      let message = 'Unknown error'
      if (e instanceof Error) message = e.message
      setErrMsg(message)
    }
  }
  }
  return (
    <div>
        <FormButtons/>
        <form style={{'justifyContent':'center','textAlign':'center'}}>
          {errMsg && (
              <h4>{errMsg}</h4>
            )}
          <h4>Email:</h4>
          <input onChange={(e : React.ChangeEvent<HTMLInputElement>) => setInputEmail(e.target.value)} placeholder='email' type='text'></input>
          <h4>Password:</h4>
          <input  onChange={(e : React.ChangeEvent<HTMLInputElement>) => setInputPassword(e.target.value)}   placeholder='password' type='password'></input>
          <h3></h3>
          <input className='btn btn-dark' type='submit'></input>
        </form>
       <hr></hr>
       <h1 style={{'textAlign':'center'}}>OR:</h1>
       <button style={{'justifyContent':'center','textAlign':'center','backgroundColor':'red','color':'white','width':100+'%'}} onClick={(e) => LoginWithGoogle(e)}>Google</button>
    </div>
  )
}

export default LoginForm