import React,{FC} from 'react'
import { useAppDispatch,useAppSelector } from '../hooks/TypedHooks'
import {modalReducer} from '../reducers/ModalReducer'
import {FiLogIn} from 'react-icons/fi'
import {AiFillInfoCircle,AiOutlineArrowDown} from 'react-icons/ai'
import { BiArrowBack } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import RenderAlert from '../helpers/RenderAlert'
interface FormButtonsInterface{
  protectedRoute? : boolean
}
const FormButtons : FC<FormButtonsInterface> = ({protectedRoute=false}) => {
  const {showFAQ,showLogin,showRegister} = useAppSelector(state => state.modal)
  const user = useAppSelector(state => state.user.user)
  const dispatch = useAppDispatch()
  const {showFAQAction,showLoginAction,showRegisterAction,closeModalWindow} = modalReducer.actions
  const navigate = useNavigate()
  const NavigateToMain = () => {
    navigate(-1)
    dispatch(closeModalWindow())
  }
  
  return (
    <div>
        <div>
          {protectedRoute && (
            <div>
                 <RenderAlert text='Not enough credentials' type='info'/>
                <button className='w-100 btn btn-primary mt-3' onClick={NavigateToMain}><BiArrowBack color='black' size={30} style={{'marginRight':5}}/>Move Back</button>
            </div>
          )}
        </div>
        <div style={{'display':'flex','justifyContent':'center','alignItems':'center'}}>
          <button onClick={() => dispatch(showLoginAction())} className={showLogin  ? 'btn btn-danger' : 'btn'} style={{'width':33.3+'%','border':'1px solid black'}}>Login<FiLogIn  size={20} style={{'marginLeft':5}}/></button>
          <button  onClick={() => dispatch(showRegisterAction())}  style={{'width':33.3+'%','border':'1px solid black'}} className={showRegister ? 'btn btn-danger' : 'btn'}>Register<AiOutlineArrowDown  size={20} style={{'marginLeft':5}}/></button>
          <button onClick={() => dispatch(showFAQAction())} className={showFAQ ? 'btn btn-danger' : 'btn'} style={{'width':33.3+'%','border':'1px solid black'}}>FAQ<AiFillInfoCircle size={20} style={{'marginLeft':5}}/></button>
        </div>
    </div>
  )
}

export default FormButtons

