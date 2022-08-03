import { IUser } from "./userTypes";

export interface IVideo{
    name : string,
    id : number,
    description : string,
    link : string,
    user : IUser
    created? : string
    views : number
}

export enum VideoActions{
    add_video = 'add_video',
    delete_video = 'delete_video'
}