// all option,when user logged in and clciked on avatar(img)


import { useState } from "react"
import { IButton,ILink,IOption } from "../../types/optionTypes"
import { useLogout } from "../useGoogleLogout"

export const useOptions = () => {
    const logout = useLogout()
    const LogoutOption : IButton = {
        id : 13200.500120,
        title : 'Logout',
        onClick : logout,
    }
    const MyProfileOption : ILink = {
        id : 1320012.50420,
        title : 'Profile',
        to : '/My_channel',
    }

    const buttonOptions :IButton[] = [
        LogoutOption,

    ]
    const LinkOptions : ILink[] = [
        MyProfileOption,
    ]

    return{
        buttonOptions,
        LinkOptions
    }
}