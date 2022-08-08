import {FC} from 'react'
import { useAppSelector } from '../../../hooks/TypedHooks'
import defaultUserAvatar from '../../../media/defaultUserAvatar.png'
import { RenderOptions } from './RenderOptions'
interface UserAvatarProps{
    avatarOnFocus : boolean,
    avatarOnHover : boolean,
    setAvatarOnFocus : (state:boolean) => void,
    setAvatarOnHover : (state:boolean) => void,

}

export const UserAvatar : FC<UserAvatarProps> = ({avatarOnFocus,avatarOnHover,setAvatarOnFocus,setAvatarOnHover}) => {
    const user = useAppSelector(state => state.user.user)
    const onMouseLeave = () => {
        setAvatarOnFocus(false)
        setAvatarOnHover(false)
    }
    return(
        <div
        tabIndex={0}
        onClick={() =>setAvatarOnFocus(true)}
        onMouseLeave={onMouseLeave}
        style={{'marginRight':120+'px'}}
        >
            <img
                 onMouseEnter={() => setAvatarOnHover(true)}
                 style={{'border':avatarOnFocus && avatarOnHover ? 'aqua 2px solid' : 'white 2px solid','width':80+'px','height':60+'px','borderRadius':40+'px'}} 
                 src={user?.photoUrl === null ? defaultUserAvatar : user?.photoUrl}           
            />
             {avatarOnFocus && avatarOnHover &&
              (
                <RenderOptions/>
              )}
        </div>
    )   
}

// todo : videos creation,loading + styles
