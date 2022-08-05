
import {CgMenuGridO} from 'react-icons/cg'
import {CgClose} from 'react-icons/cg'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/TypedHooks'
import logo from '../../../media/logo.png'
import { modalReducer } from '../../../reducers/ModalReducer'

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
        ? (<CgClose onClick={handleClose} color='blue' size={30}/>)
        : (<CgMenuGridO onClick={handleOpen} color='blue' size={30}/>)}
        <Link className="navbar-brand" to="/" style={{'color':'white','paddingLeft':10+'px'}}>
        <img  src={logo} style={{'paddingTop':3+'px'}}  width="30" height="30" className="d-inline-block align-top" alt="brand"/>
        Tube
        </Link>
    </div>
  )
}

