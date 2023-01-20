import { addDoc, collection } from "firebase/firestore"
import { database } from "../../config"
import { useAppSelector } from "../../hooks/TypedHooks"
import { AppDispatch } from "../../store/store"
import { IVideo } from "../../types/VideoTypes"
import { videoReducer } from "../VideoReducer"
import { UploadNewVideo } from "./UploadNewVideo"

export const CREATE_VIDEO = (video:IVideo) => {
    return async (dispatch:AppDispatch) => {
        const {LOAD_VIDEO,LOAD_VIDEO_SUCCES,LOAD_VIDEO_ERROR} = videoReducer.actions
        if (video !== null){
            const {name,views,created,description,user,link,photoUrl} = video
                try{
                    dispatch(LOAD_VIDEO())
                    const video : IVideo = {
                        views : views,
                        created : created,
                        createdNegative : -created,
                        name : name,
                        link : link,
                        description : description,
                        user : {
                            email : user.email,
                            username : user.username,
                            photoUrl : user.photoUrl
                        },
                        photoUrl : photoUrl,
                    }
                    await addDoc(collection(database,'videos'),{
                        video : video
                    }).then((res) => {
                        video.id = res.id
                        dispatch(LOAD_VIDEO_SUCCES(video))
                    })
                }
                catch(e){
                    let message = 'Unknown error'
                    if (e instanceof Error) message = e.message
                    dispatch(LOAD_VIDEO_ERROR(message))
                }
            }
            else{
                dispatch(LOAD_VIDEO_ERROR('wrong data...'))
            }
        }
}
