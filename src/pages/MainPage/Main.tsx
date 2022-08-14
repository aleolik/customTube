import {useEffect} from 'react'
import css from './Main.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks/TypedHooks'
import { RenderNavigationOptions } from '../../helpers/VideoHelpers/RenderNavigationOptions'
import { LoadUserVideos } from '../../reducers/asyncActions/LOAD_VIDEOS'
import { Card } from '../../components/Card'
import RenderVideos from '../../helpers/VideoHelpers/RenderVideos'
import { Loader } from '../../components/Loader/Loader'
const Main = () => {
  const {error,loading,videos} = useAppSelector(state => state.video)
  const dispatch = useAppDispatch()

  
  useEffect(() => {
    dispatch(LoadUserVideos())
  },[])
  return (
    <div className='container-fluid' >
      <div className='row' style={{'backgroundColor':'none'}}>
        <div className={['col-md-1 col-sm-4 col-lg-1',css.sidebar].join(' ')}>
          <RenderNavigationOptions/>
        </div>  
        <div className='col-md-11 col-sm-8 col-lg-11'>
            <div>
            {loading
            ? (
              <div className='d-flex justify-content-center align-items-center'>
                <Loader/>
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
                    <h1>Error : {error}</h1>
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



