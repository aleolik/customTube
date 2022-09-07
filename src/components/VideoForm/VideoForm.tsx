import React, { ChangeEvent, FC, useState } from 'react'
import {useCurrentDate} from '../../helpers/useCurrentDate'
import { useAppDispatch, useAppSelector } from '../../hooks/TypedHooks'
import css from './VideoForm.module.css'
import {CREATE_VIDEO} from '../../reducers/asyncActions/CREATE_VIDEO'
import {storage} from '../../index'
import {ref, uploadBytes} from 'firebase/storage'
import filesPng from '../../media/files.png'
import uploadPng from '../../media/upload.png'
import { IMakeVideo, IPhoto, IVideo } from '../../types/VideoTypes'
import RenderAlert from '../../helpers/RenderAlert'
import wrongPreviewFormatPng from '../../media/WrongPreviewFormat.png'
import {GiCancel} from 'react-icons/gi'
interface VideoFormProps{
  videos : IVideo[]
}
const VideoForm : FC<VideoFormProps> = ({videos}) => {
  // form validators
  const desc_max_length = 460
  const name_max_length = 160
  const [isNameUnique,setNameUnique] = useState(true) // one user can't have two videos with the same name!


  // form variables
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
  const [PreviewCancelFocus,setOnPreviewCancelFocus] = useState(false)
  // errors state
  const [videoFileError,setVideoFileError] = useState<string>('')
  const [PreviewFileError,setPreviewFileError] = useState<string>('')


  const dispatch = useAppDispatch()

  const videoFileHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files !== null){
      let video_file = e.target.files[e.target.files.length-1]
      if (video_file.name.endsWith('.mp4') && video_file.type === 'video/mp4'){
        setVideoFileError('')
        setVideo({
          file : video_file,
          url : video_file.name
        })
      }
      else{
        e.target.value = ''
        setVideoFileError('Our service supports videos only with .mp4 format')
      }
    }
  }

  // drag and drop handlers
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
    let file = e.dataTransfer.files[e.dataTransfer.files.length-1]
    if (file.name.endsWith('.png') || file.name.endsWith('.jpeg') || file.name.endsWith('.jpg')){
      setPreviewFileError('')
      setPhoto({
        photoUrl : file.name,
        photoFile : file
      })
    }
    else{
      setPreviewFileError('Wrong Preview format,our service supports only : png,jpeg,jpg formats')
    }
    setDrag(false)
  }
  const clearPreviewFile = () => {
    setPhoto({
      photoUrl: '',
      photoFile : null,
    })
  }
  const onMouseEnterCancelPreview = () => {
    setOnPreviewCancelFocus(true)
  }
  const onMouseLeaveCancelPreview = () => {
    setOnPreviewCancelFocus(false)
  }
  const uploadDataToFireStorage = async(videoRef : any,imageRef : any) => {
    console.log('uploading to firesstore...')
    if (photo.photoFile && video.file){
      try{
        // TODO : can add checker that if file with the same name in the firestore in this route,so give UI Error
        await uploadBytes(imageRef,photo.photoFile)
        await uploadBytes(videoRef,video.file)
      }
      catch(e){

      }
      finally{

      }
    }
  }

  // from validators handlers
  const nameHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= name_max_length){
      setName(e.target.value)
    }

    if (videos.filter((video) => video.name === e.target.value).length){
      setNameUnique(false)
    }
    else{
      setNameUnique(true)
    }
  }
  const descriptionHandler  = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
    if (desc_max_length >= e.target.value.length){
      setDescription(e.target.value)
    }
  }

  const sumbitHadnler = async(e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (photo.photoFile && video.file && user && isNameUnique && name){
      const imageRef = ref(storage,`${user?.email.toLowerCase()}/${user.username}/${photo.photoUrl}`)
      const videoRef = ref(storage,`${user?.email.toLowerCase()}/${user.username}/${video.url}`) 
      dispatch(CREATE_VIDEO(  {
          name : name,
          link : video.url,
          description : description,
          views : 0,
          created : date,
          user : user,
          photoUrl : photo.photoUrl
        }))
        // uploads images and videos to firestorage
        uploadDataToFireStorage(videoRef,imageRef)
      }
    }
  return (
    <div style={{'marginTop':10+'px'}}> 
          {showForm
            ? (
              <div className="d-grid col-sm-9 col-md-4 col-lg-3  mx-auto">
              <button type='button'  className='btn btn-primary rounded-pill m-2' onClick={() => setShowForm(false)}>Close Form</button>
              </div>
            )
            : (
              <div className="d-grid col-sm-9 col-md-4 col-lg-3 mx-auto pt-10">
                <button type='button' className='btn btn-primary rounded-pill m-2' onClick={() => setShowForm(true)}>Add Video</button>
              </div>
            )
          }
        <form  className={showForm ? ' justify-content-center d-flex flex-column' : css.form__off}>
              {name.length ===  name_max_length
                    && (
                      <RenderAlert error={`You have achieved maximum symbols : ${name_max_length}!`}/>
              )}
               {!isNameUnique
                    && (
                      <RenderAlert error={`You have already video with name : '${name}',so change it,please!`}/>
              )}
               {videoFileError
                    && (
                    <RenderAlert error={videoFileError}/>
              )}
              {PreviewFileError
                && (
                <RenderAlert error={PreviewFileError}/>
              )}
              <div className="input-group input-group-sm mb-3 ">
                <span className="input-group-text" id="inputGroup-sizing-sm">name</span>
                <input value={name}  onChange={nameHandler} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
              </div>
              {description.length ===  desc_max_length
                && (
                  <RenderAlert error={`You have achieved maximum symbols : ${desc_max_length}!`}/>
                )}
              <div className="input-group">
                <span className="input-group-text">description</span>
                <textarea value={description}   onChange={descriptionHandler}  className="form-control" aria-label="With textarea"></textarea>
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
                    <h4>(Drag and Drop)</h4>
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
              <div>
                {photo.photoFile && (
                  <div className={css.file}>
                    <div
                    onClick={clearPreviewFile}
                    onMouseEnter={onMouseEnterCancelPreview}
                    onMouseLeave={onMouseLeaveCancelPreview}
                    >
                      <GiCancel style={{'color':PreviewCancelFocus ? 'red' : 'black'}} size={75}
                      />
                    </div>
                    <img style={{'height':230,'width':285,'display':'block','marginLeft':'auto','marginRight':'auto'}} src={URL.createObjectURL(photo.photoFile)} alt='preview'></img>
                  </div>
                )}
              </div>
            )}
            <div className="input-group mb-3">
              <input onChange={(e) => videoFileHandler(e)} type="file" className="form-control" id="inputGroupFile01"/>
            </div>
            <div className='justify-content-center d-flex'>
              <button className='btn-selfmade-blue' onClick={sumbitHadnler} style={{color:'white'}}><span>Создать видео</span><i></i></button>
            </div>
        </form>
      </div>
  )
}

export default VideoForm