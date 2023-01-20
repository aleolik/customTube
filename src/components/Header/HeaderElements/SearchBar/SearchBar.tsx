import React, { FC, useState } from 'react'
import { useDevice } from '../../../../helpers/useDevice'
import {BsSearch} from 'react-icons/bs'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../../hooks/TypedHooks'
import { LOAD_VIDEOS_WITH_SEARCH } from '../../../../reducers/asyncActions/LOAD_VIDEOS_WITH_SEARCH'
import { IVideo } from '../../../../types/VideoTypes'
import { LoadUserVideos } from '../../../../reducers/asyncActions/LOAD_VIDEOS'
import css from './SearchBar.module.scss'
import { searchBarSlice } from '../../../../reducers/SearchBarReducer'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import { isMobile } from 'react-device-detect'
interface SearchBarProps{
  // if needed then you can give props to,otherwise it would be in default
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
  const {UserSearchBarFocused,GlobalSearchBarFocused} = useAppSelector(state => state.searchBar)
  const {SetGlobalSearchBarFocusOff,SetGlobalSearchBarFocusOn,SetUserSearchBarFocusedOff,SetUserSearchBarFocusedOn} = searchBarSlice.actions
  const dispatch = useAppDispatch()
  const device = useDevice()
  const searchWidth = {
    'mobile': GlobalSearchBarFocused && !props.email ? 70 : props.email && UserSearchBarFocused ? 60 : 20,
    'tablet':20,
    'desktop':20
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
    if (props.email){
      dispatch(SetUserSearchBarFocusedOn())
    }
    else{
      dispatch(SetGlobalSearchBarFocusOn())
    }
  }
  const searchBarOnInputBlur = () => {
      if (props.email){
        dispatch(SetUserSearchBarFocusedOff())
      }
      else{
        dispatch(SetGlobalSearchBarFocusOff())  
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
      dispatch(LOAD_VIDEOS_WITH_SEARCH(searchValue,props.email))
    }
  }
  return (
    <div>
      <form  onSubmit={props.email ? formOnSubmitWithDontNavgiate : formOnSubmit} className={css.searchBarContainer}>
          {props.email || (GlobalSearchBarFocused && isMobile)
          ? (<button onClick={clearSearchValue} className="btn btn-outline-danger me-1"><AiOutlineArrowLeft/></button>)
          : (<></>)}
          <input onBlur={searchBarOnInputBlur} onFocus={searchBarOnInputFocus} value={searchValue} onChange={searchValueHandler} style={{'width':searchWidth[device]+'vw'}} className="form-control me-1" type="Search for video..." placeholder="Search...🔍" aria-label="Search"/>
          <button className="btn btn-outline-primary" type="submit"><BsSearch/></button>
      </form>
    </div>
  )
}

export default SearchBar