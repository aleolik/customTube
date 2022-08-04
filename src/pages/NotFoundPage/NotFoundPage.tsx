import React from 'react'
import { useNavigate } from 'react-router-dom'
import notFoundImage from '../../media/notFound.png'
import css from './NotFoundPage.module.css'
const NotFoundPage = () => {
  const navigate = useNavigate()
  const HandleNavigate = () => {
    navigate('/')
  }
  return (
    <div className={css.img_center  }>
        <button onClick={HandleNavigate} className='btn-selfmade-blue'  style={{'width':50+'%',color:'white'}}><span>Вернуться на главную</span><i></i></button>
        <img  className={css.img} src={notFoundImage} alt='not found image'></img>
    </div>
  )
}

export default NotFoundPage