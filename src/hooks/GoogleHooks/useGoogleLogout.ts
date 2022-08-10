
import { getAuth } from 'firebase/auth'
import { UserReducer } from '../../reducers/User'
import { useAppDispatch } from '../TypedHooks'
import { signOut } from 'firebase/auth'
export const useLogout = () => {
    const dispatch = useAppDispatch()
    const auth = getAuth()
    const {logout} = UserReducer.actions
    const Logout = () => {
        dispatch(logout())
        signOut(auth).then(() => {
            console.log('signed out')
        }).catch((err) => {
            let message = 'Unknown Error'
            if (err instanceof Error) message = err.message
            console.error(message)
        })
    }
    return(
        Logout
    )
}