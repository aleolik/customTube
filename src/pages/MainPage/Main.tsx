import {useEffect} from 'react'
import css from './Main.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks/TypedHooks'
import { RenderNavigationOptions, isTabletOrDesktop } from '../../helpers/VideoHelpers/RenderNavigationOptions'
import { LoadUserVideos } from '../../reducers/asyncActions/LOAD_VIDEOS'
import RenderVideos from '../../helpers/VideoHelpers/RenderVideos'
import { Loader } from '../../components/Loader/Loader'
import RenderAlert from '../../helpers/RenderAlert'
import RenderLoadingScreenMainPage from '../../helpers/VideoHelpers/RenderLoadingScreenMainPage'
import { useDevice } from '../../helpers/useDevice'
import { useScroll } from '../../hooks/useScroll'
import { BottomLoader } from '../../components/BottomLoader/BottomLoader'
const Main = () => {
  const {error,loading,videos,loadingDynamically} = useAppSelector(state => state.video)
  const {AllError,AllVideos,AllLoading} = useAppSelector(state => state.video)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(LoadUserVideos())
  },[])
  const darkMode = useAppSelector(state => state.state.darkMode)
  useScroll()
  return (
    <div className='container-fluid' style={{'backgroundColor':darkMode ? 'lightgray' : 'white'}}>
      <div className='row'>
        <div className={`col-md-2 col-sm-4 col-lg-1 ${darkMode ? 'bg-dark' : 'bg-light'}`} style={{'display':'flex','justifyContent':'center','minHeight':isTabletOrDesktop ? 100+'vh' : 20+'vh'}}>
          <RenderNavigationOptions/>
        </div>  
        <div className='col-md-10 col-sm-8 col-lg-11'>
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



