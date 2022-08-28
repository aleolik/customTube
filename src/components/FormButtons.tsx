import React,{FC} from 'react'
import { useAppDispatch,useAppSelector } from '../hooks/TypedHooks'
import {modalReducer} from '../reducers/ModalReducer'
import {FiLogIn} from 'react-icons/fi'
import {AiFillInfoCircle,AiOutlineArrowDown} from 'react-icons/ai'

const FormButtons = () => {
  const {showFAQ,showLogin,showRegister} = useAppSelector(state => state.modal)
  const dispatch = useAppDispatch()
  const {showFAQAction,showLoginAction,showRegisterAction} = modalReducer.actions
  return (
    <div style={{'display':'flex','justifyContent':'center','alignItems':'center'}}>
          <button onClick={() => dispatch(showLoginAction())} className={showLogin  ? 'btn btn-danger' : 'btn'} style={{'width':33.3+'%'}}>Login<FiLogIn  size={20} style={{'marginLeft':5}}/></button>
          <button  onClick={() => dispatch(showRegisterAction())}  style={{'width':33.3+'%'}} className={showRegister ? 'btn btn-danger' : 'btn'}>Register<AiOutlineArrowDown  size={20} style={{'marginLeft':5}}/></button>
          <button onClick={() => dispatch(showFAQAction())} className={showFAQ ? 'btn btn-danger' : 'btn'} style={{'width':33.3+'%'}}>FAQ<AiFillInfoCircle size={20} style={{'marginLeft':5}}/></button>
    </div>
  )
}

export default FormButtons