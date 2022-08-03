import React from 'react'
import FormButtons from './FormButtons'

const FAQ = () => {
  return (
    <div>
        <FormButtons></FormButtons>
        <div style={{'justifyContent':'center','alignItems':'center','textAlign':'center','border':'black 2px solid'}}>
            <h2>Зачем это нужно?</h2>
            <h3 style={{'fontSize':15}}>Вам будет доступно больше функций для использования на нашем сервисе</h3>
        </div>
    </div>
  )
}

export default FAQ