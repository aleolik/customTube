import React,{FC, useEffect} from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/TypedHooks'
import { modalReducer } from '../../reducers/ModalReducer'
import { Loader } from '../Loader/Loader'
import css from './ModalWindow.module.css'
interface ModalWndowProps{
    protectedRoute? : boolean
    children : any
}
const ModalWindow : FC<ModalWndowProps> = ({children,protectedRoute=false}) => {
  const rootClasses = [css.modal]
  const showModal = useAppSelector(state => state.modal.showModal)
  const dispatch = useAppDispatch()
  const {closeModalWindow,showModalWindow} = modalReducer.actions
  if (showModal){
    rootClasses.push(css.active)
  }

  useEffect(() => {
    if (protectedRoute){
      dispatch(showModalWindow())
    }
  },[])

  const onClick = () => {
    if (!protectedRoute){
      dispatch(closeModalWindow())
    }
  }

  const load = useAppSelector(state => state.loader.load)
  return (
      <div className={rootClasses.join(' ')} onClick={onClick}>
        <div className={css.modal_content} onClick={(e : React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
          {children}
        </div>
      </div>
  )
}

export default ModalWindow
