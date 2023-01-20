// all option,when user logged in and clciked on avatar(img)


import { useEffect, useState } from "react"
import { IButton,ILink,IOption } from "../../../types/optionTypes"
import { useLogout } from "../../../hooks/GoogleHooks/useGoogleLogout"
import { useAppSelector } from "../../../hooks/TypedHooks"
import { AiOutlineLogout,AiOutlineUser } from "react-icons/ai"
import { useGetLinkToProfile } from "../../../hooks/useGetNavigationLinks"
import { useDarkModeChange } from "../../../hooks/useDarkModeChange"

export const useOptions = () => {
    const logout = useLogout()
    const user = useAppSelector(state => state.user.user)
    const link = useGetLinkToProfile(user)

    const CHAGE_COLOR_MODE = useDarkModeChange()
    const LogoutOption : IButton = {
        id : 'logoutUser',
        title : 'Logout',
        onClick : logout,
        icon : 'logout'
    }
    const DarkModeOption : IButton = {
        id : 'darkMode',
        title : '',
        onClick : CHAGE_COLOR_MODE,
        icon : 'dark_mode'

    }
    const MyProfileOption : ILink = {
        id : 'myProfile',
        title : 'Profile',
        to : link,
        icon : 'person'
    }

    const buttonOptions :IButton[] = [
        LogoutOption,
        DarkModeOption

    ]
    const LinkOptions : ILink[] = [
        MyProfileOption,
    ]



    return{
        buttonOptions,
        LinkOptions,
    }
}