import { IVideo } from "../../types/VideoTypes"
import {FC} from 'react'
interface RenderTimeAgoProps{
    video : IVideo
}
export const RenderTimeAgo : FC<RenderTimeAgoProps> = ({video}) => {
    const now = Date.now()
    return(
        <ul className="list-group list-group-flush">
      {(now - video.created)/1000 > 60
      ? (
        <div>
            {(now - video.created)/1000 > 3600
            ? (
              <div>
                {(now-video.created)/1000 > 3600 * 60
                ? (
                  <li className="list-group-item">{Math.floor((now - video.created)/(1000*360*24))} дней назад</li>
                )
                : (
                  <li className="list-group-item">{Math.floor((now - video.created)/(1000*360))} часов назад</li>
                )}
              </div>
            )
            : (
              <li className="list-group-item">{Math.floor((now - video.created)/(1000*60))}минут(а) назад</li>
            )}
        </div>
      )
      : (
        <li className="list-group-item">{Math.floor((now - video.created)/1000)} секунд(а) назад</li>
      )}
    </ul>
    )
}