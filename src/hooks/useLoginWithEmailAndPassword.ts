import { browserLocalPersistence, getAuth,  setPersistence, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { modalReducer } from "../reducers/ModalReducer"
import { useAppDispatch } from "./TypedHooks"
import { useGetUserData, useGetUserDataSecondVersion } from "./useGetUserData"
import { WHEN_AUTH_STATE_CHANGED } from "../reducers/asyncActions/WHEN_AUTH_STATE_CHANGED"
export const useLoginWithEmailAndPassword = () => {
    const dispatch = useAppDispatch()
    const setError = modalReducer.actions.setError
    const auth = getAuth()
    const getUserData =  useGetUserDataSecondVersion()
    const Login = async(email:string,password:string,photoFile? : File | undefined | null) => {
      try{
        await setPersistence(auth,browserLocalPersistence)
        await signInWithEmailAndPassword(auth,email,password)
        const userData = await getUserData(email.toLowerCase()) // because firestore document can only be in lowerCase
        if (auth.currentUser){
          await updateProfile(auth.currentUser,{
            displayName : userData?.username,
            photoURL : userData?.photoUrl
          })
          if (auth.currentUser.photoURL !== undefined && auth.currentUser.displayName){
            dispatch(WHEN_AUTH_STATE_CHANGED({
              photoUrl : auth.currentUser.photoURL,
              email : email,
              username : auth?.currentUser.displayName,
              photoFile : photoFile
            }))    
          }
        }
      }
      catch(e){
        dispatch(setError('Email or Password are uncorrect!'))
      }
    }
  
    return(
      Login
    )
  }
