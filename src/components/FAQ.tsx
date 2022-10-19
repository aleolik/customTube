import React from 'react'
import FormButtons from './FormButtons'

const FAQ = () => {
  return (
    <div>
        <FormButtons></FormButtons>
        <div className='faq_container'>
            <h2>Why?</h2>
            <h4>You will access new permissions such as :</h4>
            <h1 className='faq_text'>1 - load videos by yourself</h1>
            <h1>Have your recent watched videos</h1>
            <h1>Many others in the future...</h1>
        </div>
    </div>
  )
}

export default FAQ