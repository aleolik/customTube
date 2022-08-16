import { useEffect, useState } from "react"
import { ILink } from "../types/optionTypes"

export const useBurgerMenuOptions = () => {
    const [options,setOptions] = useState<ILink[]>([])
    useEffect(() => {
        setOptions([
            {
                id : 1,
                title : 'Main',
                to : '/'  
            },
            {
                id : 2,
                title : 'Trends',
                to : '/trends'  
            },
            {
                id : 3,
                title : 'History',
                to : '/history'
            }
        ])
    },[])
    return(
        options
    )
}