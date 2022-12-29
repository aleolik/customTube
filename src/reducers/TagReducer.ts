import { ITAG } from "../types/VideoTypes"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
interface initialStateProps{
    TagsLoad : boolean,
    Tags : ITAG[]
    TagsErorr : string

}
const initialState : initialStateProps = {
    TagsLoad : false,
    Tags : [],
    TagsErorr : ''
}  

export const tagsReducer = createSlice({
    name : 'tags',
    initialState : initialState,
    reducers : {
        startLoadTags(state:initialStateProps){
            state.TagsLoad = true
            state.TagsErorr = ''
            state.Tags = []
        },
        LoadTagsSuccess(state:initialStateProps,action:PayloadAction<ITAG[]>){
            state.TagsLoad = false
            state.TagsErorr = ''
            state.Tags = action.payload
        },
        LoadTagsError(state:initialStateProps,action:PayloadAction<string>){
            state.TagsLoad = false
            state.TagsErorr = action.payload
            state.Tags = []
        },
    }
})
