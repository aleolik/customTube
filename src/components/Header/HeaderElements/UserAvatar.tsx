import {FC} from 'react'
import { useDevice } from '../../../helpers/useDevice'
import { useAppSelector } from '../../../hooks/TypedHooks'
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
            <img
                 style={{'border':avatarOnFocus ? 'aqua 2px solid' : 'white 2px solid','width':80+'px','height':60+'px','borderRadius':40+'px'}} 
                 src={user?.photoUrl === null ? defaultUserAvatar : user?.photoUrl}           
            />
             {avatarOnFocus &&
              (
                <RenderOptions/>
              )}
        </div>
    )   
}

// todo : videos creation,loading + styles
