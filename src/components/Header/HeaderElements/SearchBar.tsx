import React, { FC, useState } from 'react'
import { useDevice } from '../../../helpers/useDevice'
import {BsSearch} from 'react-icons/bs'
import {AiOutlineClose} from 'react-icons/ai'
import { Navigate, useNavigate } from 'react-router-dom'
interface SearchBarProps{
  searchBarOnFocus : boolean
  setSearchBarOnFocus : (state:boolean) => void
}
const SearchBar : FC<SearchBarProps> = ({searchBarOnFocus,setSearchBarOnFocus}) => {
  // style things
  const device = useDevice()
  const searchWidth = {
    'mobile':searchBarOnFocus ? 230 : 100,
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
  }
  const searchBarOnInputFocus = () => {
    setSearchBarOnFocus(true)
  }
  const searchBarOnInputBlur = () => {
    setSearchBarOnFocus(false)
  }
  const formOnSubmit = async(e : React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchValue.length){
      navigate(`/search=${searchValue}`)
    }
  }
  return (
    <form style={{'marginRight':device === 'mobile' ? 50 : 0}} onSubmit={formOnSubmit} className="d-flex">
        <button onClick={clearSearchValue} className="btn btn-outline-danger me-1"><AiOutlineClose/></button>
        <input onBlur={searchBarOnInputBlur} onFocus={searchBarOnInputFocus} value={searchValue} onChange={searchValueHandler} style={{'width':searchWidth[device]+'px'}} className="form-control me-1" type="Search for video..." placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-primary" type="submit"><BsSearch/></button>
    </form>
  )
}

export default SearchBar