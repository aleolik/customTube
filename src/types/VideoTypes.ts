import { IUser } from "./userTypes";

export interface IVideo{
    name : string,
    id? : string,
    description : string,
    link : string, // path to file in storage
    user : IUser,
    created : number,
    views : number,
    photoUrl : string
    file? : string
}


export interface IPhoto{
    photoUrl : string,
    photoFile : File | null,
}


export interface IMakeVideo{
    file : File | null
    url : string
}