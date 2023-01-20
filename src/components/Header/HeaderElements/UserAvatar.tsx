
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
    const device = useDevice()
    const onMouseLeave = () => {
       if (device === 'desktop'){
            setAvatarOnFocus(false)
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
        style={{'marginRight':30+'px'}}
        >
        <img style={{'width':80,'height':60,'border': avatarOnFocus ? '2px solid aqua' : '2px solid gray','borderRadius':30}} src={user?.photoFile ? URL.createObjectURL(user.photoFile) : user?.photoUrl ? user.photoUrl : defaultUserAvatar} />
             {avatarOnFocus &&
              (
                <RenderOptions/>
              )}
        </div>
    )   
}


