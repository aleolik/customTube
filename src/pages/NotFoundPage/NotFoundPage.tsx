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
    <div className='align-middle d-flex justify-content-center'>
        <div className='row'>
          <div className='col-12'>
            <button onClick={HandleNavigate} className='btn-selfmade-blue'  style={{'width':100+'%',color:'white'}}><span>Вернуться на главную</span><i></i></button>
            <img className='rounded mx-auto d-block img-fluid' src={notFoundImage} alt='not found image'></img>
          </div>
        </div>
     
    </div>
  )
}

export default NotFoundPage