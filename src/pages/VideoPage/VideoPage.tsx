import {useEffect, useRef} from 'react'
import { useParams } from 'react-router-dom'
import { Loader } from '../../components/Loader/Loader'
import RenderUserAvatar from '../../helpers/RenderUserAvatar'
import { useAppDispatch,useAppSelector } from '../../hooks/TypedHooks'
import { useADD_VIDEO } from '../../hooks/useAddVideoToWatched'
import { SET_CURRENT_VIDEO } from '../../reducers/asyncActions/SET_CURRENT_VIDEO'
import NotFoundPage from '../NotFoundPage/NotFoundPage'



const VideoPage = () => {

  let {videoID,username} = useParams()
  const ADD_VIDEO_TO_FIREBASE_AND_STATE =  useADD_VIDEO()
  const video = useAppSelector(state => state.video.video) 
  const videoRef = useRef<HTMLVideoElement>(null)
  const preferedVolume = localStorage.getItem('videoVolume') // saved volume on every video(default - 0.5)
  const loadVideo = useAppSelector(state => state.loader.load)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!videoID){
      videoID = 'error'
    }
    if (!username){
      username = 'error'
    }
    dispatch(SET_CURRENT_VIDEO(videoID,username))
  },[videoID,username])

  useEffect(() => {
    if (!videoID){
      videoID = 'error'
    }
    if (!username){
      username = 'error'
    }
    ADD_VIDEO_TO_FIREBASE_AND_STATE(username,videoID)
  },[video])

 const setVideoSettings = () => {
  if (videoRef && videoRef.current){
    videoRef.current.autoplay = true
    if (!preferedVolume){
      videoRef.current.volume = 0.5
    }
    else{
      const preferValue : number = JSON.parse(preferedVolume)
      videoRef.current.volume = preferValue
    }
  }
 }

 const setVolumeChange = () => {
  if (videoRef && videoRef.current){
    const preferVolume = videoRef.current.volume.toFixed(2).toString()
    localStorage.setItem('videoVolume',preferVolume)
  }
 }

  // options for videoPlayer(currently disabled)
  /* const [videoOptions,setVideoOptions] = useState({
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: `${sourceFile}`,
        type: "video/mp4"
      }
    ]
  }) */

  
  

  return (
    <div style={{'width':100+'vw','height':100+'vh'}}>
      <div className='d-flex align-items-center justify-content-center'>
        {loadVideo
        ? (
          <Loader/>
        )
        : (
          <>
            {video?.file ? (
            <div>
              {/* <VideoPlayer options={videoOptions}/> - error,source file not working with it,maybe do it later or just left a video tag*/} 
              <div>
                <div>
                  {video.name && (
                    <>
                    {video?.name.length >= 80
                    ? (
                      <h6 style={{'marginLeft':'auto','paddingRight':0.5*100+'px','textAlign':'center'}}>{video.name.slice(0,100)}...</h6>
                    )
                    : (<h6 style={{'textAlign':'center'}}>{video.name}</h6>)}
                    </>
                  )}
                </div>
                <div>
                  {video.description.length >= 50
                  ? (<h6>Description : {video.description.slice(0,100)}...</h6>)
                  : (<h6 >Description : {video.description}</h6>)}
                </div>
                <div>
                  <RenderUserAvatar withBackgroundColor={true} givenUser={video.user}/>
                </div>
              </div>
              <video onVolumeChange={setVolumeChange} onLoadStart={setVideoSettings} style={{'height':'auto','width':100+'%'}} ref={videoRef} controls>
                <source  type="video/mp4" src={video?.file}/>
              </video>
            </div>
          )
          : (<NotFoundPage/>)}
          </>
        )}
      </div>
    </div>
    
  )
}

export default VideoPage


