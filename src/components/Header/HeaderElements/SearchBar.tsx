import React, { FC, useState } from 'react'
import { useDevice } from '../../../helpers/useDevice'
import {BsSearch} from 'react-icons/bs'
import {AiOutlineClose} from 'react-icons/ai'
import { Navigate, useNavigate } from 'react-router-dom'
import { constants } from 'zlib'
import { useAppDispatch, useAppSelector } from '../../../hooks/TypedHooks'
import { LOAD_VIDEOS_WITH_SEARCH } from '../../../reducers/asyncActions/LOAD_VIDEOS_WITH_SEARCH'
import { IVideo } from '../../../types/VideoTypes'
import RenderAlert from '../../../helpers/RenderAlert'
import { EmailAuthCredential } from 'firebase/auth'
import { LoadUserVideos } from '../../../reducers/asyncActions/LOAD_VIDEOS'
interface SearchBarProps{
  // if needed then you can give props to,otherwise it would be in default
  searchBarOnFocus? : boolean
  setSearchBarOnFocus?  : (state:boolean) => void
  email? : string 
  videos? : IVideo[]
  /*  
    if not given = navgiate to searchPage
    if given,then just change video.videos parameter
  */

}
const SearchBar : FC<SearchBarProps> = (props) => {

  // style things
  const user =  useAppSelector(state => state.user.user)
  const [searchBarOnFocus,setSearchBarOnFocus] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const device = useDevice()
  const searchWidth = {
    'mobile':props.searchBarOnFocus || searchBarOnFocus ? 230 : 100,
    'tablet':300,
    'desktop':450
  }
  const [searchValue,setSearchValue] = useState<string>('')
  const navigate = useNavigate()
  const searchValueHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }
  const clearSearchValue = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setSearchValue('')
    if (props.email){
      dispatch(LoadUserVideos(props.email))
    }
  }
  const searchBarOnInputFocus = () => {
    if (props.setSearchBarOnFocus){
      props.setSearchBarOnFocus(true)
    }
    else{
      setSearchBarOnFocus(true)
    }
  }
  const searchBarOnInputBlur = () => {
    if (props.setSearchBarOnFocus){
      props.setSearchBarOnFocus(false)
    } 
    else{
      setSearchBarOnFocus(false)
    }
  }
  const formOnSubmit = (e : React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchValue.length){
      navigate(`/search=${searchValue}`)
    }
  }
  const formOnSubmitWithDontNavgiate = (e : React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchValue.length){
      console.log('email',props.email)
      dispatch(LOAD_VIDEOS_WITH_SEARCH(searchValue,props.email))
    }
  }
  return (
    <div>
      <form style={{'marginRight':device === 'mobile' ? 50 : 0}} onSubmit={props.email ? formOnSubmitWithDontNavgiate : formOnSubmit} className="d-flex">
          <button onClick={clearSearchValue} className="btn btn-outline-danger me-1"><AiOutlineClose/></button>
          <input onBlur={searchBarOnInputBlur} onFocus={searchBarOnInputFocus} value={searchValue} onChange={searchValueHandler} style={{'width':searchWidth[device]+'px'}} className="form-control me-1" type="Search for video..." placeholder="Search...🔍" aria-label="Search"/>
          <button className="btn btn-outline-primary" type="submit"><BsSearch/></button>
      </form>
    </div>
  )
}

export default SearchBar