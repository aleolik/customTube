
import {provider} from '../../index'
import { signInWithPopup,GoogleAuthProvider, getAuth} from 'firebase/auth'
import { IUser } from '../../types/userTypes'
import { useAppDispatch, useAppSelector } from "../TypedHooks"
import { UserReducer } from "../../reducers/User"
export const useGoogle = () => {
    const user = useAppSelector(state => state.user.user)
    const dispatch = useAppDispatch()
    const auth = getAuth()
    const {login} = UserReducer.actions

    const LoginWithGoogle = () => {
        signInWithPopup(auth,provider).then((result) => {
            const creds = GoogleAuthProvider.credentialFromResult(result)
            const access_token = creds?.accessToken
            const email = result.user?.email
            const username = result.user?.displayName
            const photoUrl = result.user.photoURL     
            if (email && username && access_token && photoUrl){
                const user : IUser = {
                    username : username,
                    email : email,
                    access_token : access_token,
                    photoUrl : photoUrl             
                }
                dispatch(login(user))
            }
        }).catch((e) => console.error(e))
    }
    return(
        LoginWithGoogle
    )
  }


