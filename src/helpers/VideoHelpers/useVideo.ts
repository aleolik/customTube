import { CREATE_VIDEO } from "../../reducers/asyncActions/CREATE_VIDEO"


export const useVideo = () => {
    const ADD_VIDEO = () => {
        CREATE_VIDEO()
    }
    return{
        ADD_VIDEO
    }
}