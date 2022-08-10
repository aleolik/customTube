import { IUser } from "./userTypes";

export interface IVideo{
    name : string,
    id? : string,
    description : string,
    link : string, // path to file in storage
    user : IUser
    created : string
    views : number
}



export enum VideoActions{
    add_video = 'add_video',
    delete_video = 'delete_video'
}