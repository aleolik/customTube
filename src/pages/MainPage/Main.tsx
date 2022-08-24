import {useEffect} from 'react'
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
const Main = () => {
  const {error,loading,videos} = useAppSelector(state => state.video)
  const dispatch = useAppDispatch()

  
  useEffect(() => {
    dispatch(LoadUserVideos())
  },[])
  // todo : make sidebar and navbar sticky
  const device = useDevice()
  return (
    <div className='container-fluid' >
      <div className='row' style={{'backgroundColor':'white'}}>
        <div className='col-md-2 col-sm-4 col-lg-1' style={{'backgroundColor':'#292b2c','display':'flex','justifyContent':'center','minHeight':device === 'tablet' || device === 'desktop' ? 100+'vh' : 20+'vh'}}>
          <RenderNavigationOptions/>
        </div>  
        <div className='col-md-10 col-sm-8 col-lg-11'>
            <div>
            {loading
            ? (
              <div>
                <RenderLoadingScreenMainPage/>
              </div>
            )
            : (
              <div>
                  {videos.length
                  ? (
                    <div>
                      <RenderVideos videos={videos}/>
                    </div>
                  )
                  :(
                   <RenderAlert error={error}/>
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



