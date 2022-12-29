import {combineReducers, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import { DeviceReducer } from '../reducers/DeviceReducer'
import { HistoryReducer } from '../reducers/HistoryReducer'
import { LoaderRedcuer } from '../reducers/LoaderReducer'
import { modalReducer } from '../reducers/ModalReducer'
import { tagsReducer } from '../reducers/TagReducer'
import { UserReducer } from '../reducers/User'
import { videoReducer } from '../reducers/VideoReducer'

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
  })

const RootReducer = combineReducers({
    user : UserReducer.reducer,
    modal : modalReducer.reducer,
    video : videoReducer.reducer,
    device : DeviceReducer.reducer,
    history : HistoryReducer.reducer,
    loader : LoaderRedcuer.reducer,
    tags : tagsReducer.reducer
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