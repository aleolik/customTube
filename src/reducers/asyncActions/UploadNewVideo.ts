import { uploadBytes } from "firebase/storage"
import { store } from "../.."
import { ErrorHandlerReturn } from "../../helpers/ErrorHandler"
import { AppDispatch } from "../../store/store"
import { IVideo } from "../../types/VideoTypes"
import { videoReducer } from "../VideoReducer"

export const UploadNewVideo = (videoRef:any,videoFile:any,imageRef:any,imageFile:File) => {
    const {uploadNewVideo,uploadNewVideoError,uploadNewVideoSuccess} = videoReducer.actions
    const video = store.getState().video.video
    return async(dispatch:AppDispatch) => {
        try{
            if (video && videoFile && imageFile){
                dispatch(uploadNewVideo())
                await uploadBytes(imageRef,imageFile)
                await uploadBytes(videoRef,videoFile)
                dispatch(uploadNewVideoSuccess(video))
            }
        }
        catch(e){
            let message = ErrorHandlerReturn(e)
            dispatch(uploadNewVideoError(message))
        }
    }
}