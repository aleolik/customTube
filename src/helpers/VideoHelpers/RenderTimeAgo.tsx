import { useAppSelector } from "../../hooks/TypedHooks"
import { IVideo } from "../../types/VideoTypes"
import {FC} from 'react'
interface RenderTimeAgoProps{
    video : IVideo
}
export const RenderTimeAgo : FC<RenderTimeAgoProps> = ({video}) => {
    const now = Date.now()

    const seconds = Math.floor((now - video.created)/1000)
    const mins = Math.floor((now - video.created)/(1000*60))
    const hours = Math.floor((now - video.created)/(1000*3600))
    const days = Math.floor((now - video.created)/(1000*3600*24))
    
    const darkMode = useAppSelector(state => state.state.darkMode)
    return(
    <ul className="list-group list-group-flush" style={{'backgroundColor':darkMode ? '#292b2c' : 'white'}}>
      {seconds > 60
      ? (
        <div>
            {mins > 60
            ? (
              <div>
                {hours >= 24
                ? (
                  <li className="list-group-item">{video.views.length || 0} views | {days} {days === 1 ? 'day' : 'days'} ago</li>
                )
                : (
                  <li className="list-group-item">{video.views.length || 0}  views | {hours} {hours === 1  ? 'hour' : 'hours'} ago</li>
                )}
              </div>
            )
            : (
              <li className="list-group-item">{video.views.length || 0}  views | {mins} {mins === 1 ? 'min' : 'mins'} ago</li>
            )}
        </div>
      )
      : (
        <li className="list-group-item">{video.views.length || 0}  views | {seconds} {seconds === 1 ? 'second' : 'seconds'} ago</li>
      )}
    </ul>
    )
}