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
    return(
        <ul className="list-group list-group-flush">
      {seconds > 60
      ? (
        <div>
            {mins > 60
            ? (
              <div>
                {hours >= 24
                ? (
                  <li className="list-group-item">{days} {days === 1 ? 'day' : 'days'} ago</li>
                )
                : (
                  <li className="list-group-item">{hours} {hours === 1  ? 'hour' : 'hours'} ago</li>
                )}
              </div>
            )
            : (
              <li className="list-group-item">{mins} {mins === 1 ? 'min' : 'mins'} ago</li>
            )}
        </div>
      )
      : (
        <li className="list-group-item">{seconds} {seconds === 1 ? 'second' : 'seconds'} ago</li>
      )}
    </ul>
    )
}