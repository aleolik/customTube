import { IUser } from "./userTypes";

export interface IVideo{
    name : string,
    id? : string,
    description : string,
    link : string, // path to file in storage
    user : IUser
    created : string
    views : number,
    photoUrl : string
}


export interface IPhoto{
    photoUrl : string,
    photoFile : File | null,
}

export enum VideoActions{
    add_video = 'add_video',
    delete_video = 'delete_video'
}