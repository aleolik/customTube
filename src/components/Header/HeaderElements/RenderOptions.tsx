import { ILink,IButton } from "../../../types/optionTypes"
import { useOptions } from "./Options"
import { Link } from "react-router-dom"
import { useLogout } from "../../../hooks/GoogleHooks/useGoogleLogout"
import { useDevice } from "../../../helpers/useDevice"
import { useAppSelector } from "../../../hooks/TypedHooks"
import * as aiIcons from 'react-icons/ai'
export const RenderOptions  = () => {
    const {LinkOptions,buttonOptions} = useOptions()
    const device = useDevice()
    const username = useAppSelector(state => state.user.user?.username)
    return(
      <div className="options_container">
      <div style={{'marginTop':10,'color':'white','marginBottom':10}}>
         hello,{username}
         <hr style={{'border':'5px solid white'}}/>
      </div>
      {LinkOptions.map((option : ILink) => {
            return(
                <div>
                    <Link key={option.id} to={option.to}><button style={{'marginTop':5+'px','borderRadius':15}} className="btn btn-light">{option.title}<span style={{'verticalAlign':-5,'fontSize':20}} className="material-icons">{option.icon}</span></button></Link>
                </div>
            )
           })}
        {buttonOptions.map((option : IButton) => {
            return(
                <button  className="btn btn-light"  style={{'marginTop':5+'px','borderRadius':15}} key={option.id} onClick={() => option.onClick()}>{option.title}<span style={{'verticalAlign':-5,'fontSize':20}} className="material-icons">{option.icon}</span></button>
            )
        })}
  </div>
    )
}