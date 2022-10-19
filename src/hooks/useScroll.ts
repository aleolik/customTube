import { useEffect, useState } from "react"
import { LoadUserVideosDynamically } from "../reducers/asyncActions/LoadDynamically"
import { LoadUserVideos } from "../reducers/asyncActions/LOAD_VIDEOS"
import { useAppDispatch, useAppSelector } from "./TypedHooks"

export const useScroll = (email?:string | null | undefined,search?:string | undefined) => {
    const [fetchData,setFetchData] = useState<boolean>(true)
    const allVideosNumber = useAppSelector(state => state.video.AllVideos)
    const {videos,lastVisible} =  useAppSelector(state => state.video)
    const dispatch = useAppDispatch()
    const onScroll = () => {
        console.log('onScrollWorks',videos.length,allVideosNumber)
        if (document.documentElement.scrollHeight-(document.documentElement.scrollTop+window.innerHeight)<100 && (allVideosNumber && videos.length < allVideosNumber)){
          console.log('scroll')
          setFetchData(true)
        }
    }
    useEffect(() => {
      if (allVideosNumber){
        document.addEventListener('scroll',onScroll)
        return function(){
          document.removeEventListener('scroll',onScroll)
        }
      }
    }, [videos])
    
    useEffect(() => {
      if (fetchData){
        try{
          if (lastVisible && lastVisible.exists()){
            dispatch(LoadUserVideosDynamically(email,search))
          }
        }
        finally{
          setFetchData(false)
        }
    }
    },[fetchData])
}



// remake it with observer API later
export const useInfinityScroll = () => {
  // scroll with observer API
  const videos = useAppSelector(state => state.video.videos)
  const totalVideos = useAppSelector(state => state.video.AllVideos)
  const dispatch = useAppDispatch()
  const infinitieObserver = new IntersectionObserver((entries,observer) => {
    entries.map((entry,index) => {
      if (index-1 === totalVideos && entry.isIntersecting){
        observer.unobserve(entry.target)
        dispatch(LoadUserVideos())
      }
    })
    },{
      
    }
  )
}

