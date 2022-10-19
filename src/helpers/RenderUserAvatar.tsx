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
}
const RenderUserAvatar : FC<RenderUserAvatarProps> = ({width=60,height=45,givenUser=null,withUsername=true,withBackgroundColor=false}) => {
  let user : IUser | null = useAppSelector(state => state.user.user);
  const navigate  = useNavigate()
  const [imageFocus,setImageFocus] = useState(false)
  const BorderOnFocus = '2px solid aqua'
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
      <div  style={{'backgroundColor' : withBackgroundColor ? 'rgba(0,0,0,0.85)' : 'none','borderRadius':30}}>
        {user && (
          <div style={{'display':'flex','justifyContent':'center','alignItems':'center'}}>
              <img
                  style={{'width':width,'height':height,'borderRadius':30+'px','border':withBackgroundColor && imageFocus ? BorderOnFocus : '4px solid rgba(0,0,0.05)'}}
                  src={user?.photoFile ? URL.createObjectURL(user.photoFile) : user?.photoUrl ? user.photoUrl : defaultUserAvatar}
                  alt='avatar'
                  onClick={avatarNavigate}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                />
          </div>
        )}
        {withUsername && user?.username && (
                <h6 style={{'color':'white','fontFamily':'sans','textAlign':'center'}}>{user.username}</h6>
        )}
      </div>
    </div>
  )
}

export default RenderUserAvatar