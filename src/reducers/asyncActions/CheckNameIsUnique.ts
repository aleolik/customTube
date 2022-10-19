import { collection, CollectionReference, getDocs, orderBy, query, where } from "firebase/firestore"
import { database } from "../../config"
import { ErrorHandler } from "../../helpers/ErrorHandler"
import { AppDispatch } from "../../store/store"
import { IVideo } from "../../types/VideoTypes"

export const CheckNameIsUnique = async(name:string,email : string) => {
    const videosRef = query(collection(database,'videos'),where('video.user.email','==',email),orderBy('video.created')) as CollectionReference
    let isUnique : boolean = true
    try{
        const res = await getDocs(videosRef)
        res.forEach((doc) => {
            let video : IVideo = doc.data().video
            if (video.name.toLowerCase() == name.toLowerCase()){
                isUnique = false
            }
        })
        return isUnique
    }
    catch(e){
        return false
    }
}