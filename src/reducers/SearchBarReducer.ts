import { createSlice, PayloadAction } from "@reduxjs/toolkit"


interface ISearchBar{
    GlobalSearchBarFocused : boolean // all videos
    UserSearchBarFocused : boolean //  only 1 user videos
}
const initialState : ISearchBar = {
    GlobalSearchBarFocused : false,
    UserSearchBarFocused : false,
}

export const searchBarSlice = createSlice({
    name : 'searchBar',
    initialState : initialState,
    reducers : {
        SetGlobalSearchBarFocusOn(state : ISearchBar){
            state.GlobalSearchBarFocused = true
        },
        SetGlobalSearchBarFocusOff(state : ISearchBar){
            state.GlobalSearchBarFocused = false
        },
        SetUserSearchBarFocusedOn(state : ISearchBar){
            state.UserSearchBarFocused = true
        },
        SetUserSearchBarFocusedOff(state : ISearchBar){
            state.UserSearchBarFocused = false
        },
        
    }
})