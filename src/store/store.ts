import {combineReducers, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import { DeviceReducer } from '../reducers/DeviceReducer'
import { HistoryReducer } from '../reducers/HistoryReducer'
import { modalReducer } from '../reducers/ModalReducer'
import { UserReducer } from '../reducers/User'
import { videoReducer } from '../reducers/VideoReducer'
import { searchBarSlice } from '../reducers/SearchBarReducer'
import { StateSlice } from '../reducers/StateRedcuer'

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
  })

const RootReducer = combineReducers({
    user : UserReducer.reducer,
    modal : modalReducer.reducer,
    video : videoReducer.reducer,
    device : DeviceReducer.reducer,
    history : HistoryReducer.reducer,
    searchBar : searchBarSlice.reducer,
    state : StateSlice.reducer,
})

export const SetupStore = () => {
    return configureStore({
        reducer : RootReducer,
        middleware: getDefaultMiddleware => getDefaultMiddleware({
            serializableCheck: false
        })
    })
}

export type RootState = ReturnType<typeof RootReducer>
export type AppStore = ReturnType<typeof SetupStore>
export type AppDispatch = AppStore['dispatch']