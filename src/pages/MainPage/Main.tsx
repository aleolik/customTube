import {useEffect} from 'react'
import css from './Main.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks/TypedHooks'
import { RenderNavigationOptions } from '../../helpers/VideoHelpers/RenderNavigationOptions'
import { LoadUserVideos } from '../../reducers/asyncActions/LOAD_VIDEOS'
import { Card } from '../../components/Card'
const Main = () => {
  const {error,loading,videos} = useAppSelector(state => state.video)
  const dispatch = useAppDispatch()

  
  useEffect(() => {
    dispatch(LoadUserVideos())
  },[])
  return (
    <div className='container' style={{'margin':0,'padding':0}}>
      <div className='row'>
        <div className={['col-1',css.sidebar].join(' ')}>
          <RenderNavigationOptions/>
        </div>  
        <div className='col-11'>
            <div style={{'marginTop':20+'px','marginLeft':60+'px'}}>
            {loading
            ? (
              <h1>Загрузка</h1>
            )
            : (
              <div>
                  {videos.length
                  ? (
                    <div className='row'>
                        {videos.map((video) => {
                          return(
                            <>
                              <Card video={video}/>
                            </>
                          )
                        })}
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



