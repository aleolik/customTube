
import { RenderNavigationOptions, isTabletOrDesktop } from '../../helpers/VideoHelpers/RenderNavigationOptions'
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
import { RenderNoDataFound } from '../../helpers/RenerNoDataFound'
import { isDesktop, isMobile } from 'react-device-detect'
const HistoryPage = () => {
  const watchedVideos = useAppSelector(state=>state.user.user?.watched)
  const {saveHistory,loading,error} = useAppSelector(state => state.history)
  const dispatch = useAppDispatch()
  const device = useDevice()
  const CHANGE_HISTORY = HistoryReducer.actions.CHANGE_HISTORY_STATE
  const darkMode = useAppSelector(state => state.state.darkMode)
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
  const CLEAR_WATCHLIST = () => {
    dispatch(CLEAR_HISTORY())
  }
  return (
    <div className={`container-fluid`} style={{'backgroundColor':darkMode ? 'lightgray' : 'white'}}>
      <div className='row'>
        {isDesktop && (
            <div className={`col-md-2 col-sm-2 col-lg-2 ${darkMode ? 'bg-dark' : 'bg-light'}`} style={{'display':'flex','justifyContent':'center','minHeight':isTabletOrDesktop ? 100+'vh' : 20+'vh'}}>
              <RenderNavigationOptions/>
            </div>  
        )}
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
                      <RenderNoDataFound/>
                    )
                    :(
                        <RenderVideosOnHistroyPage videos={watchedVideos}/>
                    )}
                      </div>
                )}
                
              </div>
            </div>
        </div>
        <div className={`col-md-2 col-sm-2 col-lg-2 ${darkMode ? 'bg-dark' : 'bg-light'}`} style={{'backgroundColor':darkMode ? '#adb5bd' : 'none'}}>
          <div style={{'display':'flex','justifyContent':'center','color':darkMode ? 'white' : 'black','position':device === 'tablet' || device === 'desktop' ? 'fixed' : 'static','flexDirection':'column','alignItems':'center'}}>
            <div style={{'position':'relative'}}>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" onChange={setHistory} checked={saveHistory ? true : false}/>
                <label className="form-check-label" htmlFor="flexSwitchCheckChecked" style={{'fontSize':15}}>Save History (only on this device)</label>
              </div>
            </div>
            <button disabled={watchedVideos?.length ? false : true} className={`${darkMode ? 'btn btn-danger' : 'btn btn-dark'}`} style={{'width':isMobile ? 80+'%' : 60+'%'}} onClick={CLEAR_WATCHLIST}>Clear History<RiDeleteBin5Fill style={{'marginLeft':5}} size={20}/></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryPage