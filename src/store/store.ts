import {combineReducers, configureStore} from '@reduxjs/toolkit'
import { modalReducer } from '../reducers/ModalReducer'
import { UserReducer } from '../reducers/User'

const RootReducer = combineReducers({
    user : UserReducer.reducer,
    modal : modalReducer.reducer
})

export const SetupStore = () => {
    return configureStore({
        reducer : RootReducer,
    })
}

export type RootState = ReturnType<typeof RootReducer>
export type AppStore = ReturnType<typeof SetupStore>
export type AppDispatch = AppStore['dispatch']