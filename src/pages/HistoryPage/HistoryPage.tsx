
import { RenderNavigationOptions } from '../../helpers/VideoHelpers/RenderNavigationOptions'
import RenderVideosOnHistroyPage from '../../helpers/VideoHelpers/RenderVideoOnHistroyPage'
import RenderVideos from '../../helpers/VideoHelpers/RenderVideos'
import { useAppSelector } from '../../hooks/TypedHooks'
import { IVideo } from '../../types/VideoTypes'

const HistoryPage = () => {
  const watchedVideos = useAppSelector(state=>state.user.user?.watched)
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2 col-sm-4 col-lg-1' style={{'backgroundColor':'#292b2c','display':'flex','justifyContent':'center','minHeight':100+'vh'}}>
          <RenderNavigationOptions/>
        </div>  
        <div className='col-md-10 col-sm-8 col-lg-11'>
            <div>
              <div>
                {watchedVideos === undefined || !watchedVideos.length
                ? (
                    <div>...Empty</div>
                )
                :(
                    <RenderVideosOnHistroyPage videos={watchedVideos}/>
                )}
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryPage