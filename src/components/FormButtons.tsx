import React from 'react'
import { useAppDispatch,useAppSelector } from '../hooks/TypedHooks'
import {modalReducer} from '../reducers/ModalReducer'
const FormButtons = () => {
  const login_or_register = useAppSelector(state => state.modal.login_or_register)
  const dispatch = useAppDispatch()
  const {changeState} = modalReducer.actions
  return (
    <div style={{'display':'flex','justifyContent':'center','alignItems':'center'}}>
          <button onClick={() => dispatch(changeState())} className={login_or_register === 'login' ? 'btn btn-danger' : 'btn'} style={{'width':50+'%'}}>Login</button>
          <button onClick={() => dispatch(changeState())} className={login_or_register === 'register' ? 'btn btn-danger' : 'btn'} style={{'width':50+'%'}}>Register</button>
    </div>
  )
}

export default FormButtons