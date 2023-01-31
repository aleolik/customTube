import {useEffect, useRef, useState} from 'react'
import { useParams } from 'react-router-dom'
import { Loader } from '../../components/Loader/Loader'
import RenderUserAvatar from '../../helpers/RenderUserAvatar'
import { useAppDispatch,useAppSelector } from '../../hooks/TypedHooks'
import { useADD_VIDEO } from '../../hooks/useAddVideoToWatched'
import { SET_CURRENT_VIDEO } from '../../reducers/asyncActions/SET_CURRENT_VIDEO'
import NotFoundPage from '../NotFoundPage/NotFoundPage'
import css from './VideoPage.module.scss'


// TODO : styles + video types + photo selector

// TODO : delete device hook


// TODO : make html password - secret + repeat password
const VideoPage = () => {

  let {videoID,username} = useParams()
  const [showDescription,setShowDescription] = useState<boolean>(false)
  const ADD_VIDEO_TO_FIREBASE_AND_STATE =  useADD_VIDEO()
  const video = useAppSelector(state => state.video.video) 
  const videoRef = useRef<HTMLVideoElement>(null)
  const darkMode = useAppSelector(state => state.state.darkMode)
  const preferedVolume = localStorage.getItem('videoVolume') // saved volume on every video(default - 0.5)
  const videoOnCreateLoad = useAppSelector(state => state.video.videoOnCreateLoad)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!videoID || !username) return;
    dispatch(SET_CURRENT_VIDEO(videoID,username))
  },[videoID,username])

  useEffect(() => {
    if (!videoID || !username) return;
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

  
  

  return (
    <div style={{'width':100+'vw','minHeight':100+'vh','backgroundColor':darkMode ? 'lightgray' : 'white','marginTop':5+'vh'}}>
      <div>
        {videoOnCreateLoad
        ? (
          <Loader/>
        )
        : (
          <>
            {video?.file ? (
            <div>
              <div style={{'justifyContent':'center','display':'flex','alignItems':'center'}}>
                <video onVolumeChange={setVolumeChange} onLoadStart={setVideoSettings} style={{'height':'auto','width':60+'%'}} ref={videoRef} controls>

                  {video?.file && video.file.toLowerCase().endsWith('.mp4')}{
                    <source  type="video/mp4" src={video?.file}/>
                  }
                  {video?.file && video.file.toLowerCase().endsWith('.webm')}{
                    <source  type="video/webm" src={video?.file}/>
                  }
                  {video?.file && video.file.toLowerCase().endsWith('.ogg')}{
                    <source  type="video/ogg" src={video?.file}/>
                  }
                </video>
              </div>
              <RenderUserAvatar withBackgroundColor={false} givenUser={video.user}/>
              <div style={{'display':'flex','justifyContent':'center','border':'1px solid black',maxWidth:window.innerWidth,'minHeight':15+'vh','alignItems':'center','flexDirection':'column'}}>  
                <div style={{'maxWidth':window.innerWidth+'px','display':'flex','flexWrap':'wrap','flexDirection':'row','wordWrap':'break-word'}} className={css.nameContainer}>
                    <h6>name : {video.name}</h6>
                </div>
                {video.description.length
                ? (
                  <>
                    {showDescription
                        ? (
                          <div style={{'width':window.innerWidth,'maxWidth':window.innerWidth,'display':'block'}} >
                              <p style={{'textAlign':'justify','letterSpacing':1+'px','textIndent':50,'whiteSpace':'nowrap'}}>description : {video.description}</p>
                              <button style={{'width':150+'px','height':50+'px'}} className='btn btn-dark' onClick={() => setShowDescription(false)}>Cover...</button>
                          </div>
                        )
                        : (
                          <button style={{'width':150+'px','height':50+'px'}} className='btn btn-dark' onClick={() => setShowDescription(true)}>Show More...</button>
                      )}
                  </>
                )
                : (
                  <>
                    <h5>Descrpition : empty</h5>
                  </>
                )}
              </div>
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


