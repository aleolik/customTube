import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "./TypedHooks"
import { StateSlice } from "../reducers/StateRedcuer"

export const darkModeConst = 'darkMode'

export const useDarkModeChange = () => {
    const darkMode = useAppSelector(state => state.state.darkMode)
    const {SetDarkModeOff,SetDarkModeOn} = StateSlice.actions
    const dispatch = useAppDispatch()
    const darkModeFromLocalStorage : null | string= localStorage.getItem(darkModeConst)

    const CHAGE_COLOR_MODE = () => {
        if (darkMode){
            dispatch(SetDarkModeOff())
            localStorage.setItem(darkModeConst,'false')
        }
        else{
            dispatch(SetDarkModeOn())
            localStorage.removeItem(darkModeConst)
        }
    }

    return CHAGE_COLOR_MODE
}