import React, { FC } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/TypedHooks'
import { useBurgerMenuOptions } from '../useBurgerMenuOptions'
import css from '../../components/BurgerMenu/BurgerMenu.module.css'
import { modalReducer } from '../../reducers/ModalReducer'
import { ILink } from '../../types/optionTypes'
import { isDesktop, isMobile, isTablet } from 'react-device-detect'
export interface RenderNavigationOptionsProps{
  givenOptions? : ILink[]
}
export const isTabletOrDesktop = isTablet || isDesktop

export const RenderNavigationOptions : FC<RenderNavigationOptionsProps> = ({givenOptions}) => {
  const {CloseSideBar} = modalReducer.actions
  const {AllLoading,loading} = useAppSelector(state => state.video)
  const user = useAppSelector(state => state.user.user)
  const {burgerMenuOptions} = useBurgerMenuOptions()
  const dispatch = useAppDispatch()
  const sideBar = useAppSelector(state => state.modal.show_side_bar)
  const navigate = useNavigate()
  const handleClose = () => {
    dispatch(CloseSideBar())
  }
  const handleNavigate = (to:string) => {
    navigate(to)
  }


  const darkMode = useAppSelector(state => state.state.darkMode)
  return (
    <div style={{'position':isTabletOrDesktop ? 'fixed' : 'static'}}>
      {givenOptions
      ? (
        <>
          {givenOptions.map((option) => {
            return(
              <div key={option.id} className='row' style={{'position':'relative'}}>
                  {(AllLoading || loading) && !user
                    ? (<button disabled={true} key={option.id} style={{'marginTop':5+'px','borderRadius':20,'width':100}} className={`btn btn-light`} >loading...</button>)
                    : (
                    <>  
                         {!sideBar
                      ? (<button onClick={() => handleNavigate(option.to)} className={`${darkMode ? 'btn btn-light' : 'btn btn-primary'}`} style={{'marginTop':10+'px','borderRadius':20,'width':100+'%'}}>{option.title}<span style={{'verticalAlign':-5,'fontSize':22}} className="material-icons">{option.icon}</span></button>)
                      : (<Link onClick={handleClose} className={`${css.link}`} to={option.to}>{option.title}<span className="material-icons" style={{'verticalAlign':-5,'fontSize':22}}>{option.icon}</span></Link>)}
                    </>)}
               
              </div>
            )
          })}
        </>
      )
      : (
        <>
          {burgerMenuOptions.map((option) => {
            return(
              <div key={option.id} className='row' style={{'position':'relative'}}>
                {(AllLoading || loading) && !user
                    ? (<button disabled={true} key={option.id} style={{'marginTop':5+'px','borderRadius':20,'width':100}} className="btn btn-light" >loading...</button>)
                    : (
                      <>
                        {!sideBar
                          ? (<button onClick={() => handleNavigate(option.to)} className={`${darkMode ? 'btn btn-light' : 'btn btn-primary'}`}  style={{'marginTop':10+'px','borderRadius':20,'width':100+'%'}}>{option.title}<span style={{'verticalAlign':-5,'fontSize':22}} className="material-icons">{option.icon}</span></button>)
                          : (<Link onClick={handleClose} className={`${css.link} ${darkMode ? 'btn btn-light' : 'btn btn-primary'}`}  to={option.to}>{option.title}<span className="material-icons" style={{'verticalAlign':-5,'fontSize':22}}>{option.icon}</span></Link>)}
                      </>
                    )}         
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}