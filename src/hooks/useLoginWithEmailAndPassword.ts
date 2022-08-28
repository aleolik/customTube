import { browserLocalPersistence, getAuth, setPersistence, signInWithEmailAndPassword, updateProfile } from "firebase/auth"

import { ErrorHandler } from "../helpers/ErrorHandler"
import { modalReducer } from "../reducers/ModalReducer"
import { UserReducer } from "../reducers/User"
import { useAppDispatch } from "./TypedHooks"
import { useGetUserData, useGetUserDataSecondVersion } from "./useGetUserData"

export const useLoginWithEmailAndPassword = () => {
    const dispatch = useAppDispatch()
    const setError = modalReducer.actions.setError
    const auth = getAuth()
    const closeModalWindow = modalReducer.actions.closeModalWindow
    const getUserData =  useGetUserDataSecondVersion()
    const userLogin = UserReducer.actions.login
    const Login = async(email:string,password:string) => {
      try{
        await setPersistence(auth,browserLocalPersistence).then(() => {
          signInWithEmailAndPassword(auth,email,password).then(() =>{
              getUserData(email).then((res) => {
                console.log(res,'res')
                if (auth.currentUser){
                  console.log('updated')
                  updateProfile(auth.currentUser,{
                    displayName : res?.username,
                    photoURL : res?.photoUrl
                  })
                }
              }).then(() => {
                if (auth.currentUser && auth.currentUser.displayName){             
                  dispatch(userLogin({
                    email : email,
                    photoUrl : auth?.currentUser?.photoURL,
                    username : auth?.currentUser?.displayName     
                  }))
                  dispatch(closeModalWindow())
                }
              })
          })
        })
      }
      catch(e){
        dispatch(setError('Email or Password are uncorrect!'))
      }
    }
  
    return(
      Login
    )
  }
