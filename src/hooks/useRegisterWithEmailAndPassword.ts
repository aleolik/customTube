import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { ErrorHandlerReturn } from "../helpers/ErrorHandler"
import { modalReducer } from "../reducers/ModalReducer"
import { useAppDispatch } from "./TypedHooks"
import { useCreateUserDoc } from "./useCreateUserDoc"
import { useLoginWithEmailAndPassword } from "./useLoginWithEmailAndPassword"

export const useRegisterWithEmailAndPassword = () => {
    const CREATE_DOC = useCreateUserDoc()
    const login = useLoginWithEmailAndPassword()
    const dispatch =  useAppDispatch()
    const setError = modalReducer.actions.setError
    const Register = async(username:string,email:string,password:string) => {
      const auth = getAuth()
      try{
        await createUserWithEmailAndPassword(auth,email,password)
        await CREATE_DOC(username,email)
        await login(email,password)
      }
      catch(e){
        let message = ErrorHandlerReturn(e)
        dispatch(setError(message))
      }
    }
    return (
      Register
    )
  }