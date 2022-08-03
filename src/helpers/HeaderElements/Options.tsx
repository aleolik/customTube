import { ILink,IButton } from "../../types/optionTypes"
import { useOptions } from "../Options"
import { Link } from "react-router-dom"
export const Options = () => {
    const {LinkOptions,buttonOptions} = useOptions()
    return(
        <div className='options'>
            {LinkOptions.map((option : ILink) => {
                  return(
                    <div key={option.id}>
                        <Link  to={option.to}><button  className='option_links'>{option.title}</button></Link>
                    </div>
                  )
                 })}
                {buttonOptions.map((option : IButton) => {
                  return(
                    <div key={option.id}>
                        <button className='option_links' onClick={() => option.onClick()}>{option.title}</button>
                    </div>
                  )
                 })}
        </div>
    )
}