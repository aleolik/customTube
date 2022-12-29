import { collection, orderBy, query,limit, getDocs} from "firebase/firestore"
import { store } from "../../index"
import { database } from "../../config"
import { AppDispatch } from "../../store/store"
import { tagsReducer } from "../TagReducer"
import { ITAG } from "../../types/VideoTypes"
import { ErrorHandlerReturn } from "../../helpers/ErrorHandler"


export const GET_TAGS = (getAllTags=false) => {
    const device = store.getState().device.device
    const limitOptions = {
        'mobile' : 5,
        'desktop' : 8,
        'tablet': 8
    }
    const TagsLimit = limitOptions[device]
    const {startLoadTags,LoadTagsError,LoadTagsSuccess} = tagsReducer.actions
    let collectionRef = query(collection(database,'tags'),orderBy('popularity'),limit(TagsLimit))
    if (getAllTags){
        collectionRef = query(collection(database,'tags'),orderBy('popularity'))
    }
    return async(dispatch:AppDispatch) => {
        try{
            dispatch(startLoadTags())
            const docs = await getDocs(collectionRef)
            const array : ITAG[] = []
            docs.forEach((doc) => {
                const label : string = doc.data().label
                const value : number = doc.data().value
                const tag : ITAG = {
                    value : value,
                    label : label,
                    id : doc.id
                }
                array.push(tag)
            })
           dispatch(LoadTagsSuccess(array))
        }
        catch(e){
            const message = ErrorHandlerReturn(e)
            dispatch(LoadTagsError(message))
        }
    }
}