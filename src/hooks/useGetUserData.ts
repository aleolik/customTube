
import {getDoc,doc} from 'firebase/firestore'
import { database } from '../config';
import { IUser, userState } from '../types/userTypes';
import { useGetPhotoUrlFromFirestorage } from './useGetPhotoUrlFromFirestorage';


export const useGetUserData = async(email: any) : Promise<IUser | null> => {
    const UrlToFirestorage = useGetPhotoUrlFromFirestorage()
    const docRef = doc(database, "users",`${email}`)
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()){
        const user = docSnap.data().user as IUser
        const res = await UrlToFirestorage({
            username : user.username,
            photoUrl : user.photoUrl,
            email : email
        })
        if (user.photoUrl && (user.photoUrl.endsWith('.jpg') || user.photoUrl.endsWith('.png') || user.photoUrl.endsWith('.jpeg'))){
            user.photoUrl = null
        }
        user.photoUrl = user.photoUrl ? user.photoUrl : res
        return user
    }
    return null
}

export const useGetUserDataSecondVersion = () => {
    const getUserData = async(email: any) : Promise<IUser | null> => {
        const docRef = doc(database, "users",`${email}`)
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()){
            return(
                docSnap.data().user as IUser

            )
        }
        return null
    }

    return(
        getUserData
    )
}