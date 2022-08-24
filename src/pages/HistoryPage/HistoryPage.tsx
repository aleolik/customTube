
import { RenderNavigationOptions } from '../../helpers/VideoHelpers/RenderNavigationOptions'
import RenderVideosOnHistroyPage from '../../helpers/VideoHelpers/RenderVideoOnHistroyPage'
import RenderVideos from '../../helpers/VideoHelpers/RenderVideos'
import { useAppDispatch, useAppSelector } from '../../hooks/TypedHooks'
import { HistoryReducer } from '../../reducers/HistoryReducer'
import { IVideo } from '../../types/VideoTypes'
import emptyListPhoto from '../../media/emptyList.jpeg'
import { useDevice } from '../../helpers/useDevice'
import {RiDeleteBin5Fill} from 'react-icons/ri'
import { Loader } from '../../components/Loader/Loader'
import { CLEAR_HISTORY } from '../../reducers/asyncActions/CLEAR_HISTORY'
const HistoryPage = () => {
  const watchedVideos = useAppSelector(state=>state.user.user?.watched)
  const {saveHistory,loading,error} = useAppSelector(state => state.history)
  const dispatch = useAppDispatch()
  const device = useDevice()
  const CHANGE_HISTORY = HistoryReducer.actions.CHANGE_HISTORY_STATE
  const user = useAppSelector(state => state.user.user)
  const setHistory = () => {
    if (saveHistory){
      dispatch(CHANGE_HISTORY(false))
      localStorage.setItem('history','false')
    }
    else{
      dispatch(CHANGE_HISTORY(true))
      localStorage.setItem('history','true')
    }
  }
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2 col-sm-2 col-lg-2' style={{'backgroundColor':'#292b2c','display':'flex','justifyContent':'center','minHeight':device === 'desktop' || device === 'tablet' ? 100+'vh' : 20+'vh'}}>
          <RenderNavigationOptions/>
        </div>  
        <div className='col-md-8 col-sm-8 col-lg-8'>
            <div>
              <div>
                {loading
                ? (
                  <div><Loader/></div>
                )
                : (
                  <div>
                    {watchedVideos === undefined || !watchedVideos.length
                    ? (
                        <div>
                            <img style={{'width':50+'%'}} className='img-fluid rounded mx-auto d-block' src={emptyListPhoto} alt='empty_list'></img>
                        </div>
                    )
                    :(
                        <RenderVideosOnHistroyPage videos={watchedVideos}/>
                    )}
                      </div>
                )}
                
              </div>
            </div>
        </div>
        <div className='col-md-2 col-sm-2 col-lg-2' style={{'backgroundColor':'rgba(0,0,0,0.1)','display':'flex','justifyContent':'center'}}>
          <div style={{'position':device === 'tablet' || device === 'desktop' ? 'fixed' : 'static'}}>
            <div style={{'position':'relative'}}>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" onChange={setHistory} checked={saveHistory ? true : false}/>
                <label className="form-check-label" htmlFor="flexSwitchCheckChecked" style={{'fontSize':15}}>Save History (only on this device)</label>
              </div>
            </div>
            <button disabled={watchedVideos?.length ? false : true} className='btn btn-danger' style={{'width':100+'%'}} onClick={() => dispatch(CLEAR_HISTORY(user))}>Clear History<RiDeleteBin5Fill style={{'marginLeft':5}} size={20}/></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryPage