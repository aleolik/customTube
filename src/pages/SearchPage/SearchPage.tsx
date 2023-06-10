import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Loader } from '../../components/Loader/Loader'
import RenderAlert from '../../helpers/RenderAlert'
import { RenderNoDataFound } from '../../helpers/RenerNoDataFound'
import RenderVideosOnHistroyPage from '../../helpers/VideoHelpers/RenderVideoOnHistroyPage'
import { useAppDispatch, useAppSelector } from '../../hooks/TypedHooks'
import {LOAD_VIDEOS_WITH_SEARCH} from '../../reducers/asyncActions/LOAD_VIDEOS_WITH_SEARCH'
const SearchPage = () => {

  const {search} = useParams()
  const dispatch = useAppDispatch()
  const {loading,error,videos,AllLoading,AllError} = useAppSelector(state => state.video)
  useEffect(() => {
    if (search && search.length){
      dispatch(LOAD_VIDEOS_WITH_SEARCH(search))
    }
  },[search])
  return (
    <div>
        {loading
        ? (
          <Loader/>
        )
        : (
          <>
            {error
            ? (<RenderAlert type='danger' text={`Server Error`}/>)
            :(
              <>
                {videos.length ? (
                  <RenderVideosOnHistroyPage videos={videos}/>
                )
               : (
                <div>
                  <RenderAlert type='danger' text={`No videos that includes '${search}' !`}/>
                  <RenderNoDataFound/>
                </div>
               )}
              </>
            )}
          </>        
        )}
    </div>
  )
}

export default SearchPage

