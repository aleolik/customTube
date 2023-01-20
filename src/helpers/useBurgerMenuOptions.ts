import { useEffect, useState } from "react"
import { ILink } from "../types/optionTypes"
import {isMobile} from 'react-device-detect'
import { useGetLinkToProfile } from "../hooks/useGetNavigationLinks"
import { useAppSelector } from "../hooks/TypedHooks"
export const useBurgerMenuOptions = () => {
    const [burgerMenuOptions,setBurgerMenuOptions] = useState<ILink[]>([])
    const user = useAppSelector(state => state.user.user)
    const profileLink = useGetLinkToProfile(user)
    useEffect(() => {
        const navigationOptions : ILink[]  = [
                {
                    id : 1,
                    title : 'Main',
                    to : '/',
                    icon : 'web'
                },

                {
                    id : 30351,
                    title : 'FAQ',
                    to : '/FAQ',
                    icon : 'quiz'
                }
        ]
        setBurgerMenuOptions(navigationOptions)
        if (user){
            setBurgerMenuOptions((prev) => (
                [
                    {
                        title : 'Profile',
                        id : 130,
                        to : profileLink,
                        icon : 'person'
                    },
                    ...prev,
                    {
                        id : 3,
                        title : 'History',
                        to : '/history',
                        icon : 'history'
                    },
                ]
            ))
        }
    },[user])

    
    return{
        burgerMenuOptions
    }
}