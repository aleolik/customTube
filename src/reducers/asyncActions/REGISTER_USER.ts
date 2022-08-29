import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { ErrorHandlerReturn } from "../../helpers/ErrorHandler"
import { AppDispatch } from "../../store/store"
import { LoaderRedcuer } from "../LoaderReducer"
import { modalReducer } from "../ModalReducer"

export const REGISTER_USER = (email:string,username:string,password:string,login : (email:string,password:string) => Promise<void>,createDoc : (username:string,email:string) => Promise<void>) => {
   const auth = getAuth()
   const setError = modalReducer.actions.setError
   const {startLoading,endLoading} = LoaderRedcuer.actions
   const SHOW_LOGIN = modalReducer.actions.showLoginAction
   return async (dispatch:AppDispatch) => {
    try{
      dispatch(startLoading())
      await createUserWithEmailAndPassword(auth,email,password)
      await createDoc(username, email)
      dispatch(SHOW_LOGIN())
      
    }
    catch(e){
      let message = ErrorHandlerReturn(e)
      dispatch(setError(message))
    }
    finally{
      dispatch(endLoading())
    }
   }
}




