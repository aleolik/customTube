import { IUser } from "../types/userTypes"
import { IVideo } from "../types/VideoTypes"

export const useGetLinkToProfile = (user:IUser | null) =>{
    return `/user/${user?.username}/${user?.email.toLowerCase()}`
}
export const useGetLinkToVideo = (video:IVideo) =>{
    return `/video=${video.id}/user=${video.user.username}`
}