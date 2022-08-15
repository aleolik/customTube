import React,{FC, useEffect} from 'react'
import css from './ModalWindow.module.css'
interface ModalWndowProps{
    showModal : boolean
    setShowModal : (state:boolean) => void
    protectedRoute? : boolean
    children : any
}
const ModalWindow : FC<ModalWndowProps> = ({showModal,setShowModal,children}) => {
  const rootClasses = [css.modal]
  if (showModal){
    rootClasses.push(css.active)
  }

  const onClick = () => {
   setShowModal(false)
  }
  return (
      <div className={rootClasses.join(' ')} onClick={onClick}>
        <div className={css.modal_content} onClick={(e : React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
          {children}
        </div>
      </div>
  )
}

export default ModalWindow
