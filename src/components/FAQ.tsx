import React from 'react'
import FormButtons from './FormButtons'

const FAQ = () => {
  return (
    <div>
        <FormButtons></FormButtons>
        <div className='faq_container'>
            <h2>Зачем это нужно?</h2>
            <h3 style={{'fontSize':20}}>Вам будет доступны следующие функции для использования нашем сервисе:</h3>
            <h3 className='faq_text'>1 - Загружать и оценивать видео</h3>
            <h3 className='faq_text'>2 - Писать комментарии</h3>
        </div>
    </div>
  )
}

export default FAQ