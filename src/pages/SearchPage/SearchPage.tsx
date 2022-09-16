import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Loader } from '../../components/Loader/Loader'
import RenderAlert from '../../helpers/RenderAlert'
import RenderVideosOnHistroyPage from '../../helpers/VideoHelpers/RenderVideoOnHistroyPage'
import { useAppDispatch, useAppSelector } from '../../hooks/TypedHooks'
import {LoadUserVideos} from '../../reducers/asyncActions/LOAD_VIDEOS'
const SearchPage = () => {

  const {search} = useParams()
  const dispatch = useAppDispatch()
  const {loading,error,videos} = useAppSelector(state => state.video)
  useEffect(() => {
    dispatch(LoadUserVideos(null,search))
  },[search])
  return (
    <div style={{'backgroundColor':'rgba(0,0,0,0.3)','minHeight':100+'vh'}}>
        {loading && !error
        ? (
          <Loader/>
        )
        : (
          <>
            {error
            ? (<></>)
            :(
              <>
                {videos.length ? (
                  <RenderVideosOnHistroyPage videos={videos}/>
                )
               : (
                <RenderAlert error={`videos with name ${search} doese'nt exist!`}/>
               )}
              </>
            )}
          </>        
        )}
    </div>
  )
}

export default SearchPage

