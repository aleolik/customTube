import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/TypedHooks'
import { IUser } from '../types/userTypes'
import defaultUserAvatar from '../media/defaultUserAvatar.png'
import { useGetLinkToProfile } from '../hooks/useGetNavigationLinks'
interface RenderUserAvatarProps{
  width? : number
  height? : number
  givenUser? : IUser // by default renders currentUser.photoURL,but if given renders givenUser.photoURL
  withBackgroundColor? : boolean,
  withUsername? : boolean // renders by default with username,set to false if you want to render without
  color? : 'black' | 'white'
  onClick? : () => void
}
const RenderUserAvatar : FC<RenderUserAvatarProps> = ({width=60,height=45,givenUser=null,withUsername=true,withBackgroundColor=false,color='black',onClick}) => {
  let user : IUser | null = useAppSelector(state => state.user.user);
  const navigate  = useNavigate()
  const [imageFocus,setImageFocus] = useState(false)
  const BorderOnFocus = '2px solid aqua'
  const darkMode = useAppSelector(state => state.state.darkMode)
  if (givenUser && givenUser.username.toLowerCase() !== user?.username.toLowerCase()){
    user = givenUser
  }
  const linkToProfile  = useGetLinkToProfile(user)
  const avatarNavigate = (e : React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    navigate(linkToProfile)
  }

  const onMouseEnter = () => {
    setImageFocus(true)
  }
  const onMouseLeave = () => {
    setImageFocus(false)
  }


  return (
    <div>
      {user
      && (
        <div  style={{'backgroundColor' : withBackgroundColor ? darkMode ? '#292b2c' : 'white' : 'none','borderRadius':30}}>
        {user && (
          <div style={{'display':'flex','justifyContent':'center','alignItems':'center'}}>
              <img
                  style={{'width':width,'height':height,'borderRadius':30+'px','border':withBackgroundColor && imageFocus ? BorderOnFocus : darkMode ? '3px solid darkgray' : '3px solid rgba(0,0,0.05)'}}
                  src={user?.photoFile ? URL.createObjectURL(user.photoFile) : user?.photoUrl ? user.photoUrl : defaultUserAvatar}
                  alt='avatar'
                  onClick={onClick ? onClick : avatarNavigate}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                />
          </div>
        )}
        {withUsername && user?.username && (
                <h6 style={{'color':color,'fontFamily':'sans','textAlign':'center'}}>{user.username}</h6>
        )}
      </div>
      )}
    </div>
  )
}

export default RenderUserAvatar