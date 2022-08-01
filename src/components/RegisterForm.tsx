import React, { FormEvent,FC, useState, ChangeEvent } from 'react'
import { createUserWithEmailAndPassword, getAuth,GoogleAuthProvider,signInWithCredential } from 'firebase/auth'
import FormButtons from './FormButtons'
import { useAppDispatch } from '../hooks/TypedHooks'
import { UserReducer } from '../reducers/User'
import { IUser } from '../types/userTypes'
interface RegisterFormProps{
  setShowModal : (state:boolean) => void
}
const RegisterForm : FC<RegisterFormProps> = ({setShowModal}) => {
  
  const auth = getAuth()
  const {login} = UserReducer.actions
  const dispatch = useAppDispatch()
  const [email,setEmail] = useState<string>('')
  const [password,setPassword] = useState<string>('')
  const [username,setUsername] = useState<string>('')

  const createNewUser = (e : FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
      createUserWithEmailAndPassword(auth,email,password).then((res) => {
        try{
          const user : IUser = {
            username : username,
            email : email,
            photoUrl : res.user.photoURL,
            access_token : ''
          }
          dispatch(login(user))
          setShowModal(false)
        }
    catch(e){
      let message = 'Unknown error'
      if (e instanceof Error) message = e.message
      console.error(message)
    }})
  }
  return (
    <div style={{'justifyContent':'center','alignItems':'center','textAlign':'center'}}>
        <FormButtons/>
        <h4>Email:</h4>
        <input onChange={(e : ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder='email' type='text'></input>
        <h4>Username:</h4>
        <input onChange={(e : ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}  placeholder='username' type='text'></input>
        <h4>Password:</h4>
        <input onChange={(e : ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} placeholder='password' type='password'></input>
        <h3></h3>
        <button className='btn btn-dark' onClick={(e) => createNewUser(e)}>Create</button>
    </div>
  )
}

export default RegisterForm