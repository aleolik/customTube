import { getDownloadURL, ref } from "firebase/storage"
import { storage, store } from "../.."
import { AppDispatch } from "../../store/store"
import { LoaderRedcuer } from "../LoaderReducer"
import { videoReducer } from "../VideoReducer"

export const SET_SOURCE_FILE = () => {
    const SET_VIDEO_FILE = videoReducer.actions.SetVideoFile
    const stopLoad = LoaderRedcuer.actions.endLoading // ends load,starts in SET_CURRENT_VIDEO FILE
    return async(dispatch:AppDispatch) => {
        const video = store.getState().video.video
        if (video){
            const videoRef = ref(storage,`${video.user.email}/${video.user.username}/${video.link}`)
            const url = await getDownloadURL(ref(videoRef))
            if (url){
                dispatch(SET_VIDEO_FILE(url))
                dispatch(stopLoad())
            }
        }
    }
}