
import {FC, useEffect, useState} from 'react'
import { useDevice } from '../../../helpers/useDevice'
import { useAppSelector } from '../../../hooks/TypedHooks'
import defaultUserAvatar from '../../../media/defaultUserAvatar.png'
import { RenderOptions } from './RenderOptions/RenderOptions'
interface UserAvatarProps{
    avatarOnFocus : boolean,
    setAvatarOnFocus : (state:boolean) => void,
}

export const UserAvatar : FC<UserAvatarProps> = ({avatarOnFocus,setAvatarOnFocus}) => {
    const user = useAppSelector(state => state.user.user)
    const [onMouseEnterValue,setOnMouseEnterValue] = useState<boolean>(false)
    const device = useDevice()
    const onMouseLeave = () => {
       if (device === 'desktop'){
            setOnMouseEnterValue(false)
       }
    }
    const onMouseEnter = () => {
        if (device === 'desktop'){
            setOnMouseEnterValue(true)
        }
     }
    const onClcik = () => {
        setAvatarOnFocus(!avatarOnFocus)
    }

    return(
        <div
        tabIndex={0}
        onClick={onClcik}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
        style={{'marginRight':30+'px'}}
        >
        <img style={{'width':80,'height':60,'cursor' : onMouseEnterValue ? 'pointer' : 'default','border':onMouseEnterValue ? '2px solid aqua' : '2px solid gray','borderRadius':30}} src={user?.photoFile ? URL.createObjectURL(user.photoFile) : user?.photoUrl ? user.photoUrl : defaultUserAvatar} />
             {avatarOnFocus &&
              (
                <RenderOptions/>
              )}
        </div>
    )   
}


