import React, { useState } from 'react'
import {useCurrentDate} from '../../helpers/useCurrentDate'
import { useAppDispatch, useAppSelector } from '../../hooks/TypedHooks'
import css from './VideoForm.module.css'
import {CREATE_VIDEO} from '../../reducers/asyncActions/CREATE_VIDEO'
import { videoReducer } from '../../reducers/VideoReducer'
import {storage} from '../../index'
import {ref, uploadBytes} from 'firebase/storage'
const VideoForm = () => {
  const [name,setName] = useState<string>('')
  const [description,setDescription] = useState<string>('')
  const [drag,setDrag] = useState<boolean>(false)
  const [showForm,setShowForm] = useState(false)
  const [file,setFile] = useState<File | null>(null)
  const video = useAppSelector(state => state.video.video)
  const user = useAppSelector(state => state.user.user)
  const date = useCurrentDate()
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
    setFile(file)
    setDrag(false)
  }

  const sumbitHadnler = async(e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()  
    if (file && user && name){
      const imageRef = ref(storage,`${user?.username}/${date}/${file.name}`)   
      dispatch(CREATE_VIDEO(  {
          name : name,
          link : `${user?.username}/${date}/${file.name}`,
          description : description,
          views : 0,
          created : date,
          user : user
        }))
        uploadBytes(imageRef,file)
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
            <div
            onDragOver={(e:React.DragEvent<HTMLDivElement>) => dragStartHandler(e)}
            onDragStart={(e:React.DragEvent<HTMLDivElement>) => dragStartHandler(e)}
            onDragLeave={(e:React.DragEvent<HTMLDivElement>) => dragLeave(e)}
            onDrop={(e:React.DragEvent<HTMLDivElement>) => dropHandler(e)}
            className={css.file}>
                {drag === false
                ? (
                <h4>Перетащите файл для загрузки</h4>
                )
                : (
                <h4>Отпустите файл для загрузки</h4>
                )}
            </div>
            <button className='btn-selfmade-blue' onClick={sumbitHadnler} style={{'width':100+'%',color:'white'}}><span>Создать видео</span><i></i></button>
            <hr></hr> 
        </form>
      </div>
  )
}

export default VideoForm