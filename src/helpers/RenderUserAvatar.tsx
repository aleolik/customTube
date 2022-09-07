import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/TypedHooks'
import { IUser } from '../types/userTypes'
import defaultUserAvatar from '../media/defaultUserAvatar.png'
interface RenderUserAvatarProps{
  width? : number
  height? : number
  givenUser? : IUser // by default renders currentUser.photoURL,but if given renders givenUser.photoURL
  withUsername? : boolean // renders by default with username,set to false if you want to render without
}
const RenderUserAvatar : FC<RenderUserAvatarProps> = ({width=60,height=45,givenUser=null,withUsername=true}) => {
  let user : IUser | null = null;
  const navigate  = useNavigate()
  const [imageFocus,setImageFocus] = useState(false)
  const BorderOnFocus = '2px solid aqua'
  const currentUser = useAppSelector(state => state.user.user)
  if (!givenUser){
    user = currentUser
  }
  else{
    user = givenUser
  }

  const avatarNavigate = (e : React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    navigate(`/user/${user?.username}/${user?.email.toLowerCase()}`)
  }

  const onMouseEnter = () => {
    setImageFocus(true)
  }
  const onMouseLeave = () => {
    setImageFocus(false)
  }
  return (
    <div  style={{'backgroundColor':'rgba(0,0,0,0.1)'}}>
      {user && (
        <div>
           {user?.photoUrl
            ? (<img
              style={{'width':width,'height':height,'borderRadius':30+'px','border':imageFocus ? BorderOnFocus : '2px solid gray'}}
              src={user.photoUrl}
              alt='avatar'
              onClick={avatarNavigate}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              />
              )
            : (<img style={{'width':width,'height':height,'borderRadius':30+'px','border':imageFocus ? BorderOnFocus : '2px solid gray'}}
              src={defaultUserAvatar}
              alt='avatar'
              onClick={avatarNavigate}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            />
            )}
            {withUsername && (
              <h6>{user.username}</h6>
            )}
        </div>
      )}
    </div>
  )
}

export default RenderUserAvatar