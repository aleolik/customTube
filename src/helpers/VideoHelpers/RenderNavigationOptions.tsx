import React, { FC } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/TypedHooks'
import { useBurgerMenuOptions } from '../useBurgerMenuOptions'
import css from '../../components/BurgerMenu/BurgerMenu.module.css'
import { modalReducer } from '../../reducers/ModalReducer'
import { useDevice } from '../useDevice'

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
  const device = useDevice()

  const positionDevice = device === 'tablet' || device === 'desktop' ? 'fixed' : 'static'

  const btnSize = device === 'mobile' ? 180 : 100

  const {loading,loadingDynamically,AllLoading} = useAppSelector(state => state.video)
  return (
    <div style={{'position':positionDevice}}>
      {items.map((item) => {
        return(
          <div key={item.id} className='row' style={{'position':'relative'}}>
            {!sideBar
            // add icons to the buttons later
            ? (<button onClick={() => handleNavigate(item.to)} className='btn btn-light' style={{'marginTop':10+'px','borderRadius':20,'width':btnSize}}>{item.title}<span style={{'verticalAlign':-5,'fontSize':22}} className="material-icons">{item.icon}</span></button>)
            : (<Link onClick={handleClose} className={css.link} to={item.to}>{item.title}<span className="material-icons" style={{'verticalAlign':-5,'fontSize':22}}>{item.icon}</span></Link>)}
          </div>
        )
      })}
    </div>
  )
}