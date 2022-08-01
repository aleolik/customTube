export interface IUser{
    username : string
    email : string
    access_token : string
    photoUrl : string | null
}

export interface userState{
    user : IUser | null
}

export enum UserActions{
    logout = 'logout',
    login = 'login',
    register = 'register'
}