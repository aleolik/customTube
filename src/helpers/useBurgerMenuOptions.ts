import { useEffect, useState } from "react"
import { ILink } from "../types/optionTypes"
import {AiFillHome,AiOutlineLogout} from 'react-icons/ai'
export const useBurgerMenuOptions = () => {
    const [options,setOptions] = useState<ILink[]>([])
    useEffect(() => {
        setOptions([
            {
                id : 1,
                title : 'Main',
                to : '/',
                icon : 'web'
            },
            {
                id : 3,
                title : 'History',
                to : '/history',
                icon : 'history'
            },
            {
                id : 30351,
                title : 'FAQ',
                to : '/FAQ',
                icon : 'quiz'
            }
        ])
    },[])
    return(
        options
    )
}