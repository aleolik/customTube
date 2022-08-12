import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/TypedHooks'
import { useBurgerMenuOptions } from '../useBurgerMenuOptions'
import css from '../../components/BurgerMenu/BurgerMenu.module.css'
import { modalReducer } from '../../reducers/ModalReducer'
export const RenderNavigationOptions = () => {
  const {CloseSideBar} = modalReducer.actions
  const showSideBar = useAppSelector(state => state.modal.show_side_bar)
  const items = useBurgerMenuOptions()
  const dispatch = useAppDispatch()
  const location = useLocation() // different styles,depends if render side bar or main page
  const sideBar = useAppSelector(state => state.modal.show_side_bar)
  const navigate = useNavigate()
  const handleClose = () => {
    dispatch(CloseSideBar())
  }
  const handleNavigate = (to:string) => {
    navigate(to)
  }
  return (
    <div>
      {items.map((item) => {
        return(
          <div key={item.id} className='row'>
            {location.pathname === '/' && !sideBar
            ? (<button onClick={() => handleNavigate(item.to)} className='btn btn-light' style={{'marginTop':10+'px'}}>{item.title}</button>)
            : (<Link onClick={handleClose} className={css.link} to={item.to}>{item.title}</Link>)}
          </div>
        )
      })}
    </div>
  )
}