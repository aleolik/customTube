import React from "react"
import { IconType } from "react-icons"

export interface ILink {
  title : string,
  id : number,
  to : string,
  icon : IconType
}
export interface IButton{
  title : string,
  id : number,
  onClick :  () => void
  icon : IconType
}

export type IOption = {
    type : ILink | IButton
}

