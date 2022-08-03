import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { database } from '../../config'
import { IUser } from '../../types/userTypes'
import { IVideo } from '../../types/VideoTypes'

interface RenderVideosProps{
  user? : IUser
}
const RenderVideos = ({user=null}) => {
  const collectionRef = collection(database,'videos')
  const [vides,setVideos] = useState<IVideo[]>([])
  useEffect(() => {
    const getData = async() => {
      const data = await getDocs(collectionRef)
      console.log(data)
    }
  },[])
  return (
    <div>RenderVideos</div>
  )
}

export default RenderVideos