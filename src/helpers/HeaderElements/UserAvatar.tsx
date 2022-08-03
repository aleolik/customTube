import {FC} from 'react'
import { useAppSelector } from '../../hooks/TypedHooks'
import defaultUserAvatar from '../../media/defaultUserAvatar.png'
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
        onMouseEnter={() => setAvatarOnHover(true)}
        onMouseLeave={() => onMouseLeave()}
        style={{'paddingLeft':10+'px','width':150+'px'}}>
            <img
                 style={{'border':avatarOnFocus && avatarOnHover ? 'aqua 2px solid' : 'white 2px solid'}}  className='__avatar'src={user?.photoUrl === null ? defaultUserAvatar : user?.photoUrl}>
             </img>
        </div>
    )   
}

