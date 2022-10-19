import {FC} from 'react'
interface RenderCardTitleProps{
    title:string
    maxLength?:number
}
export const RenderCardTitle : FC<RenderCardTitleProps> = ({title,maxLength}) => {
    if (!maxLength){
        maxLength = 45
    }
    return(
        <div>
            {title.length >= maxLength
            ? (<h5 style={{'height':40}} className="card-title">{title.substring(0,maxLength)}...</h5>)
            : (<h5 style={{'height':40}} className="card-title">{title}</h5>)}
        </div>
    )
}