import { ILink,IButton } from "../../../../types/optionTypes"
import { useOptions } from "../Options"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../../../hooks/TypedHooks"
import { isMobile } from "react-device-detect"
import css from './RenderOptions.module.scss'
import RenderUserAvatar from "../../../../helpers/RenderUserAvatar"
import {AiOutlineClose} from 'react-icons/ai'

export const RenderOptions  = () => {
    const {LinkOptions,buttonOptions} = useOptions()
    const {AllLoading,loading} = useAppSelector(state => state.video)
    const username = useAppSelector(state => state.user.user?.username)
    const darkMode = useAppSelector(state => state.state.darkMode)
    return(
      <div className={`${css.OptionsContainer} 'bg-dark'`}> 
      <h1 style={{'color':'white',fontSize:50}}>DarkTub</h1>
      <RenderUserAvatar withUsername={false}/>
      <AiOutlineClose className={css.close_btn} color='white' size={40}/>
      <div style={{'marginTop':10,'color':'white','marginBottom':10,'textAlign':'center','textOverflow':'ellipsis','overflow':'hidden'}}>
         Welcome,{username}
         <hr/>
      </div>
      {LinkOptions.map((option : ILink) => {
            return(
                <div>
                    <Link key={option.id} to={option.to}><button style={{'marginTop':5+'px','borderRadius':20,'width':100}} className={`${darkMode ? 'btn btn-light' : 'btn btn-dark'}`} >{option.title}<span style={{'verticalAlign':-5,'fontSize':20}} className="material-icons">{option.icon}</span></button></Link>)       
                </div>
            )
           })}
        {buttonOptions.map((option : IButton) => {
            return(
                <div>
                    <button  className={`${darkMode ? 'btn btn-light' : 'btn btn-dark'}`}  style={{'marginTop':5+'px','borderRadius':20,'width':100}} key={option.id} onClick={() => option.onClick()}>{option.title}<span style={{'verticalAlign':-5,'fontSize':20}} className="material-icons">{option.icon}</span></button>
                </div>
                
            )
        })}
        <hr/>
  </div>
    )
}