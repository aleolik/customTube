import { getDownloadURL, ref } from 'firebase/storage'
import {FC, useEffect, useState} from 'react'
import { storage } from '../../..'
import RenderUserAvatar from '../../../helpers/RenderUserAvatar'
import { useDevice } from '../../../helpers/useDevice'
import { useAppSelector } from '../../../hooks/TypedHooks'
import { useGetPhotoUrlFromFirestorage } from '../../../hooks/useGetPhotoUrlFromFirestorage'
import defaultUserAvatar from '../../../media/defaultUserAvatar.png'
import { RenderOptions } from './RenderOptions'
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
    const marginRight = {
        'tablet' : 200,
        'mobile' : 50,
        'desktop' : 200
    }

    return(
        <div
        tabIndex={0}
        onClick={onClcik}
        onMouseLeave={onMouseLeave}
        style={{'marginRight':marginRight[device]+'px'}}
        >
        <img style={{'width':80,'height':60,'border': avatarOnFocus ? '2px solid aqua' : '2px solid gray','borderRadius':30}} src={user?.photoFile ? URL.createObjectURL(user.photoFile) : user?.photoUrl ? user.photoUrl : defaultUserAvatar} />
             {avatarOnFocus &&
              (
                <RenderOptions/>
              )}
        </div>
    )   
}

// todo : videos creation,loading + styles
