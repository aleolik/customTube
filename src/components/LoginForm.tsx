import { FC} from 'react'
import { getAuth} from 'firebase/auth'
import { useAppDispatch, useAppSelector } from '../hooks/TypedHooks'
import { UserReducer } from '../reducers/User'
import FormButtons from './FormButtons'
import {useGoogle} from '../hooks/GoogleHooks/useGoogleLogin'
import { useNavigate } from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi'

interface LoginFormProps{
  setShowModal : (state:boolean) => void // закрывать модальное окно после входа
  protectedRoute? : boolean
}
const LoginForm : FC<LoginFormProps> = ({setShowModal,protectedRoute=false}) => {

  const LoginWithGoogle = useGoogle()
  const handleSubmit = async() => {
    LoginWithGoogle()
    setShowModal(false)
  }
  
  const navigate = useNavigate()
  const NavigateToMain = () => {
    navigate(-1)
  }

  const onClick = () => {
    if(!protectedRoute){
      setShowModal(false)
    }
  }
  return (
    <div onClick={onClick}>
      <div onClick={(e) => e.stopPropagation()}>
        <FormButtons/>
        {protectedRoute && (
            <button className='w-100 btn btn-primary mt-3' onClick={NavigateToMain}><BiArrowBack color='black' size={30} style={{'marginRight':5}}/>Move Back</button>
        )}
        <h1 style={{'textAlign':'center'}}>Sign in with:</h1>
        <hr></hr>
        <button className='btn-selfmade-blue' onClick={handleSubmit} style={{'width':100+'%',color:'white'}}><span>Google</span><i></i></button>
      </div>
    </div>
  )
}

export default LoginForm
