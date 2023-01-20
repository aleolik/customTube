import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { NewPhoto } from "../../components/InputForm"
import { ErrorHandlerReturn } from "../../helpers/ErrorHandler"
import { AppDispatch } from "../../store/store"
import { modalReducer } from "../ModalReducer"
import { UserReducer } from "../User"

export const REGISTER_USER = (email:string,username:string,password:string,login : (email:string,password:string,photoFile : File | null | undefined) => Promise<void>,createDoc : (username:string,email:string,photo:NewPhoto | null) => Promise<void>,photo:NewPhoto | null,photoFile : File | undefined | null) => {
   const auth = getAuth()
   const setError = modalReducer.actions.setError
   const {startUserAction,EndUserAction,UserActionError} = UserReducer.actions
   return async (dispatch:AppDispatch) => {
    try{
      dispatch(startUserAction())
      await createUserWithEmailAndPassword(auth,email,password)
      await createDoc(username,email,photo)
      login(email,password,photoFile)
    }
    catch(e){
      const message = ErrorHandlerReturn(e)
      dispatch(setError(message))
      dispatch(UserActionError(message))
    }
    finally{
      dispatch(EndUserAction())
    }
   }
}




