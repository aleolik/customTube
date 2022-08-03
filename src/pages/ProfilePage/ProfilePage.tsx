import React, { useEffect, useState,useRef } from 'react'
import { IVideo } from '../../types/VideoTypes'
import css from './ProfilePage.module.css'
const ProfilePage = () => {
  const [showForm,setShowForm] = useState(true)
  const [video,setVideo] = useState<IVideo>()

  const [name,setName] = useState<string>('')
  const [description,setDescription] = useState<string>('')
  const [link,setLink] = useState<string>('')
  const [drag,setDrag] = useState<boolean>(false)
  
  useEffect(() => {
    
  },[])
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
    setLink(file.name)
    const formData = new FormData()
    formData.append('file',file)
  }
  return (
    <div className={css.center}>
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
            <input className={css.desc_input}onChange={(e : React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}  placeholder='description' type='text'></input>
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
         </form>
    </div>
  )
}

export default ProfilePage