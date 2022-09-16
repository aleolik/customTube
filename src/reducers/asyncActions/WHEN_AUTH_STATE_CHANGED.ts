import { getAuth } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { database } from "../../config"
import { ErrorHandler } from "../../helpers/ErrorHandler"
import { AppDispatch } from "../../store/store"
import { IUser } from "../../types/userTypes"
import { IVideo } from "../../types/VideoTypes"
import { LoaderRedcuer } from "../LoaderReducer"
import { modalReducer } from "../ModalReducer"
import { UserReducer } from "../User"
import { GET_WATCHED_LIST } from "./GET_WATCHED_LIST"

export const WHEN_AUTH_STATE_CHANGED = (user:IUser) => {

    // gets user watchedList
    const auth = getAuth()
    const email = auth.currentUser?.email
    const {endLoading,startLoading} = LoaderRedcuer.actions
    return async(dispatch:AppDispatch) => {
        if (email){
            const login = UserReducer.actions.login
            const closeModalWindow = modalReducer.actions.closeModalWindow
            try{
                dispatch(startLoading())
                user.email = user.email.toLowerCase()
                dispatch(login(user))
                await dispatch(GET_WATCHED_LIST())         
            }
            catch(e){
                ErrorHandler(e)
            }
            finally{
                dispatch(endLoading())
                dispatch(closeModalWindow())
            }
        }
    }
}