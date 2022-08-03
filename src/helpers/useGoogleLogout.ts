
import {} from 'firebase/auth'
import { useAppDispatch } from '../hooks/TypedHooks'
import { UserReducer } from '../reducers/User'
export const useLogout = () => {
    const dispatch = useAppDispatch()
    const {logout} = UserReducer.actions
    const Logout = () => {
        dispatch(logout())
    }
    return(
        Logout
    )
}