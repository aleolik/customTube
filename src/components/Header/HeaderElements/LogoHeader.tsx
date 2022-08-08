
import {CgMenuGridO} from 'react-icons/cg'
import {CgClose} from 'react-icons/cg'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/TypedHooks'
import logo from '../../../media/logo.png'
import { modalReducer } from '../../../reducers/ModalReducer'
import { IconContext } from 'react-icons'
export const LogoHeader = () => {
  const {CloseSideBar,OpenSideBar} = modalReducer.actions
  const showSideBar = useAppSelector(state => state.modal.show_side_bar)
  const dispatch = useAppDispatch()
  const handleClose = () => {
    dispatch(CloseSideBar())
  }
  const handleOpen = () => {
    dispatch(OpenSideBar())
  }
  return (
    <div>
        {showSideBar
        ? (
        <IconContext.Provider value={{'color':'blue','size':'30',style:{'cursor':'pointer'}}}>
          <CgClose onClick={handleClose}/>
        </IconContext.Provider>
        )
        : (
          <IconContext.Provider value={{'color':'blue','size':'30',style:{'cursor':'pointer'}}}>
          <CgMenuGridO onClick={handleOpen}/>
        </IconContext.Provider>
        )}
        <Link className="navbar-brand" to="/" style={{'color':'white','paddingLeft':10+'px'}}>
        <img  src={logo} style={{'marginTop':+3+'px','marginLeft':10+'px'}}  width="45" height="30" className="d-inline-block align-top" alt="brand"/>
        
        </Link>
    </div>
  )
}

