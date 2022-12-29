import {ChangeEvent, useEffect, useState} from 'react'
import css from './Main.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks/TypedHooks'
import { RenderNavigationOptions } from '../../helpers/VideoHelpers/RenderNavigationOptions'
import { LoadUserVideos } from '../../reducers/asyncActions/LOAD_VIDEOS'
import { Card } from '../../components/Card'
import RenderVideos from '../../helpers/VideoHelpers/RenderVideos'
import { Loader } from '../../components/Loader/Loader'
import RenderAlert from '../../helpers/RenderAlert'
import RenderLoadingScreenMainPage from '../../helpers/VideoHelpers/RenderLoadingScreenMainPage'
import { useDevice } from '../../helpers/useDevice'
import { videoReducer } from '../../reducers/VideoReducer'
import { useScroll } from '../../hooks/useScroll'
import { BottomLoader } from '../../components/BottomLoader/BottomLoader'
import { RenderTagsOnMain } from '../../helpers/RenderHelpers/RenderTagsOnMain'
const Main = () => {
  const {error,loading,videos,loadingDynamically} = useAppSelector(state => state.video)
  const {AllError,AllVideos,AllLoading} = useAppSelector(state => state.video)
  const dispatch = useAppDispatch()
  const device = useDevice()
  useEffect(() => {
    dispatch(LoadUserVideos())
  },[])
  useScroll()
  return (
    <div className='container-fluid' >
      <div className='row' style={{'backgroundColor':'white'}}>
        <div className='col-md-2 col-sm-4 col-lg-1' style={{'backgroundColor':'#292b2c','display':'flex','justifyContent':'center','minHeight':device === 'tablet' || device === 'desktop' ? 100+'vh' : 20+'vh'}}>
          <RenderNavigationOptions/>
        </div>  
        <div className='col-md-10 col-sm-8 col-lg-11'>
          <RenderTagsOnMain/>
            <div>
            {AllLoading || !videos.length
            ? (
              <div>
                <RenderLoadingScreenMainPage/>
              </div>
            )
            : (
              <div>
                  {loading
                  ? (<>
                      <Loader/>
                    </>)
                  : (
                    <>
                      {videos.length
                      ? (
                        <div>
                          <RenderVideos videos={videos}/>
                        </div>
                      )
                      :(
                        <div>
                          {
                            error.length
                            ? (<RenderAlert type='danger' text={error}/>)
                            : (<Loader/>)
                          }
                        </div>
                      )}
                      {loadingDynamically && (
                        <BottomLoader/>
                      )}
                      </>
                  )}
              </div>
            )}
            </div>

    
        </div>
      </div>
    </div>
  )
}

export default Main



