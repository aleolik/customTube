import { useAppSelector } from '../../hooks/TypedHooks'
import './Loader.scss'

export const Loader = () => {
    const darkMode = useAppSelector(state => state.state.darkMode)
    return(
        <div className={darkMode ? 'loaderLight' : 'loaderDark'}></div>
    )
}