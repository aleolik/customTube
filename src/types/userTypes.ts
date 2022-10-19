import { IVideo } from "./VideoTypes"

export interface IUser{
    username : string
    email : string
    photoUrl : string | null
    photoFile? : File | null
    watched? : IVideo[]
}


export interface UserWithoutPersonalInfo{
    username : string
    email : string
    photoUrl : string | null
    photoFile? : File | null
}
export interface userState{
    user : IUser | null
}