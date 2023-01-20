import React,{FC} from 'react'
import { useAppDispatch,useAppSelector } from '../../hooks/TypedHooks'
import {modalReducer} from '../../reducers/ModalReducer'
import {FiLogIn} from 'react-icons/fi'
import {AiFillInfoCircle,AiOutlineArrowDown} from 'react-icons/ai'
import { BiArrowBack } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import RenderAlert from '../../helpers/RenderAlert'
import css from './FormButtons.module.css'
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
                 <RenderAlert text='Status 401 : Not enough credentials' type='danger'/>
                <button className='w-100 btn btn-primary mt-3' style={{'marginBottom':1.5+'vh','borderRadius':30}} onClick={NavigateToMain}><BiArrowBack color='black' size={30} style={{'marginRight':5,}}/>Move Back</button>
            </div>
          )}
        </div>
        <div className={css.form_btn_container}>
          <button onClick={() => dispatch(showLoginAction())} className={[css.form_btn,'btn btn-primary'].join(' ')} >Sign In<FiLogIn  size={20} style={{'marginLeft':5}}/></button>
          <button  onClick={() => dispatch(showRegisterAction())}  className={[css.form_btn,'btn btn-primary'].join(' ')}>Sign Up<AiOutlineArrowDown  size={20} style={{'marginLeft':5}}/></button>
          <button onClick={() => dispatch(showFAQAction())} className={[css.form_btn,'btn btn-primary  '].join(' ')} >About Us<AiFillInfoCircle size={20} style={{'marginLeft':5}}/></button>
        </div>
        <hr></hr>
    </div>
  )
}

export default FormButtons

