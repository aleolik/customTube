import React, { ChangeEvent, useState,MouseEvent, useEffect } from 'react'
import RenderAlert from '../helpers/RenderAlert'
import { useAppDispatch, useAppSelector } from '../hooks/TypedHooks'
import { useCreateUserDoc } from '../hooks/useCreateUserDoc'
import { useLoginWithEmailAndPassword } from '../hooks/useLoginWithEmailAndPassword'
import { REGISTER_USER } from '../reducers/asyncActions/REGISTER_USER'
import { Loader } from './Loader/Loader'
import {modalReducer} from '../reducers/ModalReducer'
import defaultUserAvatar from '../media/defaultUserAvatar.png'
import {HiPhotograph} from 'react-icons/hi'
// login or register form when modal open
export interface NewPhoto{
  name : string,
  file : null | File
  error : string
}
const InputForm = () => {
  const [email,setEmail] = useState<string>('')
  const [password,setPassword] = useState<string>('')
  const [username,setUsername] = useState<string>('')
  const [photo,setPhoto] = useState<NewPhoto | null>(null)
  const {showLogin,showRegister,showFAQ} = useAppSelector(state => state.modal)
  const login = useLoginWithEmailAndPassword()
  const {loadUser,userError} = useAppSelector(state => state.user)
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
  const onUpload = (e : React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files !== null){
      let lastFile = e.target.files[e.target.files.length-1]
      if ((lastFile.name.endsWith('.png') && lastFile.type === 'image/png') || (lastFile.name.endsWith('.jpg') && lastFile.type === 'image/jpg') || (lastFile.name.endsWith('.jpeg') && lastFile.type === 'image/jpeg')){
        setPhoto({
          name : lastFile.name,
          file : lastFile,
          error : ''
        })
      }
      else{
        e.target.value = ''
        setPhoto({
          name : '',
          file : null,
          error : 'Wrong Format only .png,.jpg,.jpeg are available'
        })
      }
    }
  }

  useEffect(() => {
    // reset error,when user changes state
    dispatch(setError(''))
  },[showLogin,showFAQ,showRegister])
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
        dispatch(REGISTER_USER(email,username,password,login,CREATE_DOC,photo,photo?.file))
      }
      else{
        dispatch(setError('Username Or Password or Email are Empty'))
      }
    }
  }
  return (
    <form onSubmit={AuthWithEmailAndPassword}>
        {error && (
          <RenderAlert type='danger' text={error}/>
        )}
        {showRegister && (
            <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">username ✒️</span>
                <input onChange={usernameHandler} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
            </div>
        )}
        <div className="input-group mb-3">
        <span className="input-group-text" id="inputGroup-sizing-default">email ✒️</span>
            <input onChange={emailHandler} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
        </div>
        <div className="input-group mb-3">
        <span className="input-group-text" id="inputGroup-sizing-default">password 🤫</span>
            <input onChange={passwordHandler} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
        </div>
        {showRegister &&
           (
            <div>
               {photo?.error && (
                <RenderAlert type='danger' text={photo.error}/>
               )}
               <img src={photo?.file ? URL.createObjectURL(photo.file) : defaultUserAvatar} style={{'width':60,'height':45,'border':'1px solid gray','borderRadius':30+'px','marginBottom':10}} className='img-fluid mx-auto d-block'/>
               <div style={{'display':'flex','justifyContent':'center'}}>
               <div className="custom-file">
                    <input onChange={onUpload} style={{'width':100+'%'}} type="file" className="btn btn-primary" id="validatedCustomFile"/>
                  </div>
              </div>
            </div>
          )}
          {loadUser
          ? (
            <div style={{'opacity':0.5}}><Loader/></div>
          )
          : (
            <div style={{'display':'flex','justifyContent':'center','marginTop':10}}>
              <button className='btn-selfmade-blue' style={{'width':60+'%',color:'white'}}><span>{showLogin ? 'Login' : 'Register'}</span><i></i></button>
            </div>
          )}
    </form>
  )
}

export default InputForm
