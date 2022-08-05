
import {} from 'firebase/auth'
import { UserReducer } from '../../reducers/User'
import { useAppDispatch } from '../TypedHooks'
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