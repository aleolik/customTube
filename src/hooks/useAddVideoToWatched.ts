import { doc,getDoc,setDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import { database } from '../config'
import { useAppDispatch, useAppSelector } from './TypedHooks'

export const useGetWatchedForUser = async(username:string) => {
    const dispatch = useAppDispatch()
    const userRef = doc(database,'users',`${username}`)
    const user = await getDoc(userRef)
    console.log(user)
}
export const useAddVideoToWatched = (video:any) => {
    const user = useAppSelector(state => state.user.user)

    console.log('adding...')
    const userRef = doc(database,'users',`${user?.username}`)
    useGetWatchedForUser('1')
    const addVideoToWatched = async() => {
        if (user){
            if (user?.watched){
                console.log(user.watched)
                await setDoc(userRef,{
                    user : {
                        ...user,
                        watched : [...user.watched,video]
                    }
                })
            }
            else{
                await setDoc(userRef,{
                    user : {
                        ...user,
                        watched : [video]
                    }
                })
            }
        }
    }
    useEffect(() => {
        addVideoToWatched()
    },[])
}
