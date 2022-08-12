import { addDoc, collection } from "firebase/firestore"
import { database } from "../../config"
import { useAppSelector } from "../../hooks/TypedHooks"
import { AppDispatch } from "../../store/store"
import { IVideo } from "../../types/VideoTypes"
import { videoReducer } from "../VideoReducer"

export const CREATE_VIDEO = (video:IVideo) => {
    return async (dispatch:AppDispatch) => {
        const {load_video_creation,load_video_creation_success,load_video_creation_error} = videoReducer.actions
        if (video !== null){
            const {name,views,created,description,user,link,photoUrl} = video
                try{
                    dispatch(load_video_creation())
                    const video : IVideo = {
                        views : views,
                        created : created,
                        name : name,
                        link : link,
                        description : description,
                        user : user,
                        photoUrl : photoUrl
                    }
                    // добавить проверку на уникальность
                    addDoc(collection(database,'videos'),{
                        video : video
                    }).then((res) => {
                        dispatch(load_video_creation_success(video))
                    })
                }
                catch(e){
                    let message = 'Unknown error'
                    if (e instanceof Error) message = e.message
                    dispatch(load_video_creation_error(message))
                }
            }
            else{
                dispatch(load_video_creation_error('wrong data...'))
            }
        }
}
