export interface ILink {
  title : string,
  id : number,
  to : string,
  type : 'link'
}
export interface IButton{
  title : string,
  id : number,
  type : 'button',  
  onClick :  () => void
}

export type IOption = {
    type : ILink | IButton
}

