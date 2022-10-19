import { getDownloadURL, ref } from "firebase/storage"
import { useEffect, useState,useRef } from "react"
import { storage } from ".."
import { IUser } from "../types/userTypes"


export const useGetPhotoUrlFromFirestorage = () => {
    const refValue = useRef<string | null>(null)
    const getPhotoUrl = async(user:IUser) : Promise<string | null> => {
        const getPhotoUrlFromStorage = async() => {
            const photoRef = ref(storage,`${user?.email.toLowerCase()}/${user?.username}/${user?.photoUrl}`)
            if (user.photoUrl && (user.photoUrl.endsWith('.png') || user.photoUrl.endsWith('.jpg') || user.photoUrl.endsWith('.jpeg'))){
                try{
                    const url : string | undefined = await getDownloadURL(ref(photoRef))
                    if (url){
                        refValue.current = url
                    }
                    else{
                        refValue.current = null
                    }
                }
                catch(e){
                    refValue.current = null
                }
            }
        }
        await getPhotoUrlFromStorage()
        return refValue.current
    }
    return getPhotoUrl
}
