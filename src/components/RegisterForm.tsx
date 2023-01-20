import { FC } from 'react'
import FormButtons from './FormButtons/FormButtons'
import InputForm from './InputForm'
import { useAppDispatch, useAppSelector } from '../hooks/TypedHooks'
import { modalReducer } from '../reducers/ModalReducer'

interface RegisterFormProps{
    protectedRoute? : boolean
  }

const RegisterForm : FC<RegisterFormProps> = ({protectedRoute=false}) => {
  const loadUser = useAppSelector(state => state.user.loadUser)
  const closeModalWindow = modalReducer.actions.closeModalWindow
  const dispatch = useAppDispatch()
    const canCloseModal = () => {
        if(!protectedRoute && !loadUser){
          dispatch(closeModalWindow())
        }
    }
    return (
        <div onClick={canCloseModal}>
          <div onClick={(e) => e.stopPropagation()}>
            <FormButtons protectedRoute={protectedRoute}/>
            <h1 style={{'textAlign':'center'}}>Register:</h1>
            <h3 style={{'textAlign':'center'}}>(doesn't need email verification)</h3>
            <InputForm/>
          </div>
        </div>
      )
}

export default RegisterForm
