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

export const WHEN_AUTH_STATE_CHANGED = (user:IUser) => {

    // gets user watchedList
    const auth = getAuth()
    const email = auth.currentUser?.email
    const {endLoading,startLoading} = LoaderRedcuer.actions
    return async(dispatch:AppDispatch) => {
        if (email){
            const userRef = doc(database,'users',`${email}`)
            const login = UserReducer.actions.login
            const closeModalWindow = modalReducer.actions.closeModalWindow
            const setWatchedVideos = UserReducer.actions.setWatchedVideos
            try{
                dispatch(startLoading())
                const userSnap = await getDoc(userRef)
                if (userSnap.exists()){
                    if (userSnap.data().user.watched){
                        let watched : IVideo[] =  userSnap.data().user.watched
                        watched = watched.reverse()
                        dispatch(setWatchedVideos(watched))
                    }
                }
                dispatch(login(user))
             
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