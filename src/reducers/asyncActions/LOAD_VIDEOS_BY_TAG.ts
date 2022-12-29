import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { database } from "../../config"
import { AppDispatch } from "../../store/store"
import { ITAG, IVideo } from "../../types/VideoTypes"
import { videoReducer } from "../VideoReducer"

export const LOAD_VIDEOS_BY_TAG = (tag:ITAG) => {
    const collectionRef = query(collection(database,'videos'),orderBy('video.createdNegative'))
    const {LOAD_ALL_VIDEOS,LOAD_VIDEO_ERROR,LOAD_VIDEO_SUCCES} = videoReducer.actions
    return async(dispatch:AppDispatch) => {
        try{
            const res = await getDocs(collectionRef)
            dispatch(LOAD_ALL_VIDEOS())
            let SortedArr : IVideo[] = []
            res.forEach((doc) => {
                const video : IVideo = doc.data().video
                video.id = doc.id
                if (video.tags?.length){
                    video.tags.map((tempTag) => {
                        if (tag.value === tempTag.value){
                            SortedArr.unshift(video)
                        }
                    })
                }
            })
        }
        catch(e){

        }
    }
}