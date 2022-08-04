export interface ILink {
  title : string,
  id : number,
  to : string,
}
export interface IButton{
  title : string,
  id : number,
  onClick :  () => void
}

export type IOption = {
    type : ILink | IButton
}

