import React, { useState } from 'react'
import {useCurrentDate} from '../../helpers/useCurrentDate'
import { useAppDispatch, useAppSelector } from '../../hooks/TypedHooks'
import css from './VideoForm.module.css'
import {CREATE_VIDEO} from '../../reducers/asyncActions/CREATE_VIDEO'
import { videoReducer } from '../../reducers/VideoReducer'
import {storage} from '../../index'
import {ref, uploadBytes} from 'firebase/storage'
import filesPng from '../../media/files.png'
import uploadPng from '../../media/upload.png'
import { IMakeVideo, IPhoto, IVideo } from '../../types/VideoTypes'
const VideoForm = () => {
  const desc_max_length = 460
  // TODO : ability to delete files(video and photo)
  // form controllers(checkers for unique name,max description length,max name length)
  // form values
  const [name,setName] = useState<string>('')
  const [description,setDescription] = useState<string>('')
  const user = useAppSelector(state => state.user.user)
  const date = useCurrentDate()


  // file and photoUrl are links to img and video in the firebase storage
  const [photo,setPhoto] = useState<IPhoto>({
    photoUrl: '',
    photoFile : null,
  })
  // to make video same as photo
  const [video,setVideo] = useState<IMakeVideo>({
    file : null,
    url : ''
  })

  // handlers states
  const [showForm,setShowForm] = useState(false)
  const [drag,setDrag] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const videoFileHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files !== null){
      let video_file = e.target.files[0]
      setVideo({
        file : video_file,
        url : video_file.name
      })
    }
  }
  const CHANGE_VIDEO = videoReducer.actions.CHANGE_VIDEO
  const dragStartHandler = (e : React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDrag(true)
  }
  const dragLeave = (e : React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDrag(false)
  }
  const dropHandler  = (e : React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    let file = e.dataTransfer.files[0]
    setPhoto({
      photoUrl : file.name,
      photoFile : file
    })
    setDrag(false)
  }


  const uploadDataToFireStorage = async(videoRef : any,imageRef : any) => {
    if (photo.photoFile && video.file){
      try{
        await uploadBytes(imageRef,photo.photoFile)
        await uploadBytes(videoRef,video.file)
        // add react toast
      }
      catch(e){

      }
      finally{

      }
    }
  }
  const sumbitHadnler = async(e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()  
    if (photo.photoFile && video.file && user && name){
      const imageRef = ref(storage,`${user?.email}/${user.username}/${photo.photoUrl}`)
      const videoRef = ref(storage,`${user?.email}/${user.username}/${video.url}`) 
      dispatch(CREATE_VIDEO(  {
          name : name,
          link : 'not done yet',
          description : description,
          views : 0,
          created : date,
          user : user,
          photoUrl : photo.photoUrl
        }))
        // uploads images and videos to firestorage
        uploadDataToFireStorage(videoRef,imageRef)
      }
      console.log('sent')
    }
  return (
    <div style={{'marginTop':10+'px'}}> 
          {showForm
            ? (
              <div className="d-grid col-6 mx-auto">
              <button type='button'  className='btn btn-primary' onClick={() => setShowForm(false)}>Close Form</button>
              </div>
            )
            : (
              <div className="d-grid col-6 mx-auto">
                <button type='button' className='btn btn-primary' onClick={() => setShowForm(true)}>Add Video</button>
              </div>
            )
          }
        <form className={showForm ? css.form :css.form__off}>
              <div className="input-group input-group-sm mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">name</span>
                <input style={{'border':'5px solid red'}} onChange={(e : React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
              </div>
              <div className="input-group">
                <span className="input-group-text">With textarea</span>
                <textarea  onChange={(e : React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}  className="form-control" aria-label="With textarea"></textarea>
              </div>
            {!photo.photoUrl && !photo.photoFile
            ? (
              <div
              onDragOver={(e:React.DragEvent<HTMLDivElement>) => dragStartHandler(e)}
              onDragStart={(e:React.DragEvent<HTMLDivElement>) => dragStartHandler(e)}
              onDragLeave={(e:React.DragEvent<HTMLDivElement>) => dragLeave(e)}
              onDrop={(e:React.DragEvent<HTMLDivElement>) => dropHandler(e)}
              className={css.file}>
                {drag === false
                ? (
                  <div>
                    <img style={{'width':100,'height':100}} src={filesPng} alt='files'></img>
                    <h1>upload png,jpg,jpeg only</h1>
                  </div>
                )
                : (
                  <div>
                    <img style={{'width':100,'height':100}} src={uploadPng} alt='files'></img>
                    <h1>leave to load</h1>
                  </div>
                )}
             </div>
            )
            : (
              <div className={css.file}>
                {photo.photoFile && (
                  <img style={{'width':400+'px','height':200+'px'}} src={URL.createObjectURL(photo.photoFile)} alt='preview'></img>
                )}
              </div>
            )}
            <div className="input-group mb-3">
              <input onChange={(e) => videoFileHandler(e)} type="file" className="form-control" id="inputGroupFile01"/>
            </div>
            <button className='btn-selfmade-blue' onClick={sumbitHadnler} style={{'width':100+'%',color:'white'}}><span>Создать видео</span><i></i></button>
            <hr></hr> 
        </form>
      </div>
  )
}

export default VideoForm