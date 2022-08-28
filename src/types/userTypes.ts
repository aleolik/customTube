import { IVideo } from "./VideoTypes"

export interface IUser{
    username : string
    email : string
    photoUrl : string | null
    watched? : IVideo[]
}

export interface userState{
    user : IUser | null
}

export enum UserActions{
    logout = 'logout',
    login = 'login',
    register = 'register'
}