// if user first logged in,then create his

import { getAuth } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { database } from "../config"
import { ErrorHandler } from "../helpers/ErrorHandler"

export const useCreateUserDoc = () => {
    const CREATE_DOC = async(username='',argEmail='') => {
        const auth = getAuth()
        const displayName = auth.currentUser?.displayName
        const email = auth.currentUser?.email
        const photoURL = auth.currentUser?.photoURL
        const docRef = doc(database,'users',`${email}`)
        const docSnap = await getDoc(docRef)
        if (!docSnap.exists()){
            // login with inputs
            if (username && argEmail){
                try{
                    await setDoc(docRef,{
                        user : {
                            username : username,
                            photoUrl : null,
                            email : argEmail,
                            watched : []
                        }
                    })
                }
                catch(e){
                    ErrorHandler(e)
                }
            }
            // login with google
            else{
                try{
                    await setDoc(docRef,{
                        user : {
                            username : displayName,
                            photoUrl : photoURL,
                            email : email,
                            watched : []
                        }
                    })
                }
                catch(e){
                    ErrorHandler(e)
                }
            }
        }
    }
    return(
        CREATE_DOC
    )
}