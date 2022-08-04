import { ILink,IButton } from "../../types/optionTypes"
import { useOptions } from "./Options"
import { Link } from "react-router-dom"
import { useLogout } from "../useGoogleLogout"

export const RenderOptions  = () => {
    const {LinkOptions,buttonOptions} = useOptions()
    const logout = useLogout()

    const GoogleLogout = () => {
      logout()
    }
    return(
        <div className='options'>
            {LinkOptions.map((option : ILink) => {
                  return(
                    <div key={option.id}>
                        <Link   to={option.to}><button  className='option_links'>{option.title}</button></Link>
                    </div>
                  )
                 })}
                {buttonOptions.map((option : IButton) => {
                  return(
                    <div key={option.id}>
                        <button onClick={GoogleLogout} className='option_links'>{option.title}</button>
                    </div>
                  )
                 })}
        </div>
    )
}