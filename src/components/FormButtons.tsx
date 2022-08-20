import React,{FC} from 'react'
import { useAppDispatch,useAppSelector } from '../hooks/TypedHooks'
import {modalReducer} from '../reducers/ModalReducer'
import {FiLogIn} from 'react-icons/fi'
import {AiFillInfoCircle} from 'react-icons/ai'
const FormButtons = () => {
  const show_login_or_faq = useAppSelector(state => state.modal.show_login_or_faq)
  const dispatch = useAppDispatch()
  const {changeState} = modalReducer.actions
  return (
    <div style={{'display':'flex','justifyContent':'center','alignItems':'center'}}>
          <button onClick={() => dispatch(changeState())} className={show_login_or_faq === 'login' ? 'btn btn-danger' : 'btn'} style={{'width':50+'%'}}>Login<FiLogIn  size={20} style={{'marginLeft':5}}/></button>
          <button onClick={() => dispatch(changeState())} className={show_login_or_faq === 'faq' ? 'btn btn-danger' : 'btn'} style={{'width':50+'%'}}>FAQ<AiFillInfoCircle size={20} style={{'marginLeft':5}}/></button>
    </div>
  )
}

export default FormButtons