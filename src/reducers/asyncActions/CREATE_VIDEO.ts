import { addDoc, collection } from "firebase/firestore"
import { database } from "../../config"
import { useAppSelector } from "../../hooks/TypedHooks"
import { AppDispatch } from "../../store/store"
import { IVideo } from "../../types/VideoTypes"
import { videoReducer } from "../VideoReducer"

export const CREATE_VIDEO = () => {
    const video = useAppSelector(state => state.video.video)
    const id = useAppSelector(state => state.video.video?.id)
    const link = useAppSelector(state => state.video.video?.link)
    const created = useAppSelector(state => state.video.video?.created)
    const description = useAppSelector(state => state.video.video?.description)
    const name = useAppSelector(state => state.video.video?.name)
    const views = useAppSelector(state => state.video.video?.views)
    const user = useAppSelector(state => state.video.video?.user)
    return async (dispatch:AppDispatch) => {
        if (video){
            const {load_video_creation,load_video_creation_success,load_video_creation_error} = videoReducer.actions
            if (id  && created && link && description && name && views && user){
                try{
                    dispatch(load_video_creation())
                    const video : IVideo = {
                        views : views,
                        id : id,
                        created : created,
                        name : name,
                        link : link,
                        description : description,
                        user : user
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
}