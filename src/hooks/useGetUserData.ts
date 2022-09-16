
import {getDoc,doc} from 'firebase/firestore'
import { database } from '../config';
import { IUser, userState } from '../types/userTypes';


export const useGetUserData = async(email: any) : Promise<IUser | null> => {
    const docRef = doc(database, "users",`${email}`)
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()){
        return(
            docSnap.data().user as IUser
        )
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