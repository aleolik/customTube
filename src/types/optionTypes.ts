import React from "react"
import { IconType } from "react-icons"

export interface ILink {
  title : string,
  id : number,
  to : string,
  // icons with material io icons
  icon : string
}
export interface IButton{
  title : string,
  id : number,
  onClick :  () => void
  // icons with material io icons
  icon : string
}

export type IOption = {
    type : ILink | IButton
}

