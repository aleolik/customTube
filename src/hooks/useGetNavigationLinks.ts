import { IUser } from "../types/userTypes"
import { IVideo } from "../types/VideoTypes"

export const useGetLinkToProfile = (user:IUser | null) : string =>{
    if (!user) return '';
    let newEncodedEmail : string = encodeURI(user.email)
    let newEncodedUsername : string = encodeURI(user.username)
    return `/user/${newEncodedUsername}/${newEncodedEmail.toLowerCase()}`
}
export const useGetLinkToVideo = (video:IVideo | null) : string =>{
    if (!video || !video.id) return '';
    let newEncodedID = encodeURI(video.id)
    let newEncodedUsername = encodeURI(video.user.username)
    return `/video=${newEncodedID}/user=${newEncodedUsername}`
}