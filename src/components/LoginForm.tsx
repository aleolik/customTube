import { FC} from 'react'
import { getAuth} from 'firebase/auth'
import { useAppDispatch, useAppSelector } from '../hooks/TypedHooks'
import { UserReducer } from '../reducers/User'
import FormButtons from './FormButtons'
import {useGoogle} from '../helpers/useGoogleLogin'
interface LoginFormProps{
  setShowModal : (state:boolean) => void // закрывать модальное окно после входа
}
const LoginForm : FC<LoginFormProps> = ({setShowModal}) => {

  const LoginWithGoogle = useGoogle()
  const handleSubmit = async() => {
    LoginWithGoogle()
    setShowModal(false)
  }
  return (
    <div>
       <FormButtons/>
       <h1 style={{'textAlign':'center'}}>Sign in with:</h1>
       <hr></hr>
       <button style={{'justifyContent':'center','textAlign':'center','backgroundColor':'red','color':'white','width':100+'%'}} onClick={handleSubmit}>Google</button>
    </div>
  )
}

export default LoginForm

function useGoogleLogin() {
  throw new Error('Function not implemented.')
}
