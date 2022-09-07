// all option,when user logged in and clciked on avatar(img)


import { useState } from "react"
import { IButton,ILink,IOption } from "../../../types/optionTypes"
import { useLogout } from "../../../hooks/GoogleHooks/useGoogleLogout"
import { useAppSelector } from "../../../hooks/TypedHooks"
import { AiOutlineLogout,AiOutlineUser } from "react-icons/ai"

export const useOptions = () => {
    const logout = useLogout()
    const user = useAppSelector(state => state.user.user)
    const LogoutOption : IButton = {
        id : 13200.500120,
        title : 'Logout',
        onClick : logout,
        icon : 'logout'
    }
    const MyProfileOption : ILink = {
        id : 1320012.50420,
        title : 'Profile',
        to : `/user/${user?.username}/${user?.email.toLowerCase()}`,
        icon : 'person'
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