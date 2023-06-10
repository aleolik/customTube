
import {CgMenuGridO,CgClose} from 'react-icons/cg'
import { useAppDispatch, useAppSelector } from '../../../hooks/TypedHooks'
import { modalReducer } from '../../../reducers/ModalReducer'
import { IconContext } from 'react-icons'
export const LogoHeader = () => {
  const {CloseSideBar,OpenSideBar} = modalReducer.actions
  const showSideBar = useAppSelector(state => state.modal.show_side_bar)
  const {darkMode} = useAppSelector(state => state.state)
  const dispatch = useAppDispatch()
  const handleClose = () => {
    dispatch(CloseSideBar())
  }
  const handleOpen = () => {
    dispatch(OpenSideBar())
  }
  return (
    <div style={{'marginLeft':'10px'}}>
        {showSideBar
        ? (
        <IconContext.Provider value={{'color':darkMode ? 'white' :'blue','size':'30',style:{'cursor':'pointer'}}}>
          <CgClose onClick={handleClose}/>
        </IconContext.Provider>
        )
        : (
          <IconContext.Provider value={{'color':darkMode ? 'white' : 'blue','size':'30',style:{'cursor':'pointer'}}}>
          <CgMenuGridO onClick={handleOpen}/>
        </IconContext.Provider>
        )}
    </div>
  )
}

