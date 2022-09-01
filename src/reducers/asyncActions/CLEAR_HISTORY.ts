import { deleteField, doc, setDoc, updateDoc } from "firebase/firestore"
import { store } from "../../index"
import { database } from "../../config"
import { useAppSelector } from "../../hooks/TypedHooks"
import { AppDispatch } from "../../store/store"
import { IUser } from "../../types/userTypes"
import { HistoryReducer } from "../HistoryReducer"
import { UserReducer } from "../User"

export const CLEAR_HISTORY = () => {
    const clearWatchedListState = UserReducer.actions.CLEAR_WATCHED_LIST
    const user = store.getState().user.user
    const userRef = doc(database,'users',`${user?.email}`)
    const {START_LOAD,LOAD_ERROR,LOAD_SUCCESS} = HistoryReducer.actions
    const CLEAR_FIREBASE = async() => {
        await setDoc(userRef,{
            user : {
                ...user,
                watched : []
            }
        })
    }
    return async(dispatch:AppDispatch) => {
        if (user){
            try{
                dispatch(START_LOAD())
                await CLEAR_FIREBASE()
                dispatch(clearWatchedListState())
                dispatch(LOAD_SUCCESS())
            }
            catch(e){
                let message = 'Unknown error'
                if (e instanceof Error) message = e.message
                dispatch(LOAD_ERROR(message))
            }
        }
    }
}