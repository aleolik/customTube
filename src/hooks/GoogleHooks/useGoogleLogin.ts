
import {provider} from '../../index'
import { signInWithPopup,GoogleAuthProvider, getAuth, setPersistence, browserLocalPersistence} from 'firebase/auth'
import { IUser } from '../../types/userTypes'
import { useAppDispatch, useAppSelector } from "../TypedHooks"
import { UserReducer } from "../../reducers/User"
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { database } from '../../config'
import { ErrorHandler } from '../../helpers/ErrorHandler'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { modalReducer } from '../../reducers/ModalReducer'
import { useCreateUserDoc } from '../useCreateUserDoc'



export const useGoogleLogin = () => {
    const auth = getAuth()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const closeModalWindow = modalReducer.actions.closeModalWindow
    const CREATE_DOC = useCreateUserDoc()
    const LoginWithGoogle = async() => {
            setPersistence(auth,browserLocalPersistence).then(() => {
                signInWithPopup(auth,provider).then((result) => {
                    const creds = GoogleAuthProvider.credentialFromResult(result)        
                    CREATE_DOC()
                    dispatch(closeModalWindow())
                })
                .catch((e) => ErrorHandler(e))
            }).catch((e) => ErrorHandler(e))   
  }
  return(
    LoginWithGoogle
  )
}


