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
import { IPhoto } from '../../types/VideoTypes'
const VideoForm = () => {

  // form values
  const [name,setName] = useState<string>('')
  const [description,setDescription] = useState<string>('')
  const [file,setFile] = useState<File | null>(null)
  const user = useAppSelector(state => state.user.user)
  const date = useCurrentDate()
  const [photo,setPhoto] = useState<IPhoto>({
    photoUrl: '',
    photoFile : null,
  })

  // file and photoUrl are links to img and video in the firebase storagr

  // handlers states
  const [showForm,setShowForm] = useState(false)
  const [drag,setDrag] = useState<boolean>(false)

  const dispatch = useAppDispatch()
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
  const sumbitHadnler = async(e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()  
    if (photo.photoFile && user && name){
      const imageRef = ref(storage,`${user?.email}/${user.username}/${photo.photoUrl}`)   
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
        uploadBytes(imageRef,photo.photoFile)
      }
    }
  return (
    <div>
          {showForm
            ? (
              <button className={css.form_btn}  onClick={() => setShowForm(!showForm)}>Close Form</button>
            )
            : (
              <button className={css.form_btn} onClick={() => setShowForm(!showForm)}>Add Video</button>
            )
          }
        <form className={showForm ? css.form :css.form__off}>
              <input className={css.input} onChange={(e : React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} placeholder='name' type='text'></input>
              <div>
              <input className={css.desc_input}onChange={(e : React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}  placeholder='description' type='text'>
              </input>
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
            <button className='btn-selfmade-blue' onClick={sumbitHadnler} style={{'width':100+'%',color:'white'}}><span>Создать видео</span><i></i></button>
            <hr></hr> 
        </form>
      </div>
  )
}

export default VideoForm