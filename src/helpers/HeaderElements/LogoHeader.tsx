import React from 'react'
import {CgMenuGridO} from 'react-icons/cg'
import { Link } from 'react-router-dom'
import logo from '../../media/logo.png'
export const LogoHeader = () => {
  return (
    <div>
        <CgMenuGridO color='white' size={30}/>
        <Link className="navbar-brand" to="/" style={{'color':'white','paddingLeft':10+'px'}}>
        <img  src={logo}  width="30" height="30" className="d-inline-block align-top" alt="brand"/>
        Tube
        </Link>
    </div>
  )
}

