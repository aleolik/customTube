
import {getDoc,doc} from 'firebase/firestore'
import { database } from '../config';
import { userState } from '../types/userTypes';


export const useGetUserData = async(username: any) : Promise<userState | null> => {
    const docRef = doc(database, "users",`${username}`)
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()){
        return(
            docSnap.data() as userState
        )
    }
    return null
}
