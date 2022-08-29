import { FC } from 'react'
import FormButtons from './FormButtons'
import InputForm from './InputForm'
import { useAppDispatch, useAppSelector } from '../hooks/TypedHooks'
import { modalReducer } from '../reducers/ModalReducer'

interface RegisterFormProps{
    protectedRoute? : boolean
  }

const RegisterForm : FC<RegisterFormProps> = ({protectedRoute=false}) => {
  const load = useAppSelector(state => state.loader.load)
  const closeModalWindow = modalReducer.actions.closeModalWindow
  const dispatch = useAppDispatch()
    const canCloseModal = () => {
        if(!protectedRoute && !load){
          dispatch(closeModalWindow())
        }
    }
    return (
        <div onClick={canCloseModal}>
          <div onClick={(e) => e.stopPropagation()}>
            <FormButtons/>
            <h1 style={{'textAlign':'center'}}>Register:</h1>
            <InputForm/>
          </div>
        </div>
      )
}

export default RegisterForm
