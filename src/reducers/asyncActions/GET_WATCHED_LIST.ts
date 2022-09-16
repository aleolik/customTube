import { getAuth } from "firebase/auth"
import { collection, doc, getDoc, getDocs, limit, orderBy, query } from "firebase/firestore"
import { database } from "../../config"
import { AppDispatch } from "../../store/store"
import { IVideo } from "../../types/VideoTypes"
import { UserReducer } from "../User"

export const GET_WATCHED_LIST = () => {
    const auth = getAuth()
    const email = auth?.currentUser?.email
    return async(dispatch : AppDispatch) => {
        if (email){
            const userRef = doc(database,'users',`${email}`)
            const userSnap = await getDoc(userRef)
            const setWatchedVideos = UserReducer.actions.setWatchedVideos
            if (userSnap.exists()){
                if (userSnap.data().user.watched){
                    let watched : IVideo[] =  userSnap.data().user.watched
                    console.log('watched:',watched)
                    dispatch(setWatchedVideos(watched))
                }
            }
        }
    }
}