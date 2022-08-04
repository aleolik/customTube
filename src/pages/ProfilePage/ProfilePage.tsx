import React, { useEffect, useState,useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/TypedHooks'
import { LOAD_VIDEOS } from '../../reducers/asyncActions/LOAD_VIDEOS'
import { IVideo } from '../../types/VideoTypes'
import css from './ProfilePage.module.css'
import bg from '../../media/bg.jpeg'
const ProfilePage = () => {
  const [showForm,setShowForm] = useState(false)
  const [video,setVideo] = useState<IVideo>()
  const dispatch = useAppDispatch()
  // create video
  const [name,setName] = useState<string>('')
  const [description,setDescription] = useState<string>('')
  const [link,setLink] = useState<string>('')
  const [drag,setDrag] = useState<boolean>(false)

  // load videos
  const {error,loading,videos} = useAppSelector(state => state.video)
  useEffect(() => {
   dispatch(LOAD_VIDEOS())
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
            <hr></hr>

         </form>
         {loading
         ? (<div>Загрузка...</div>)
         : (
          <div>
            {videos.length
            ? (
              <div className='videos'>
                {videos.map((video,index) => {
                  return(
                    <div className='video' key={video.id}>
                      <h3>
                          {video.name} - {video.created} - {video.description}
                       </h3>
                    </div>
                  )
                })}
              </div>
            )
            : (
              <div>Ошибка</div>
            )}
          </div>
         )}
    </div>
  )
}

export default ProfilePage