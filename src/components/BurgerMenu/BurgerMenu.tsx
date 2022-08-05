
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useBurgerMenuOptions } from '../../helpers/useBurgerMenuOptions'
import { useAppDispatch, useAppSelector } from '../../hooks/TypedHooks'
import { modalReducer } from '../../reducers/ModalReducer'
import css from './BurgerMenu.module.css'
const BurgerMenu = () => {
  const {CloseSideBar} = modalReducer.actions
  const dispatch = useAppDispatch()
  const items = useBurgerMenuOptions()
  const showSideBar = useAppSelector(state => state.modal.show_side_bar)
  const handleClose = () => {
    dispatch(CloseSideBar())
  }
  const rootClases = [css.menu]
   if (showSideBar){
        rootClases.push(css.active)
   }
  return (
    <div className={rootClases.join(' ')}>
        <div onClick={handleClose} className={css.blur}>
            <div onClick={(e : React.MouseEvent<HTMLDivElement>) => e.stopPropagation()} className={css.menu__content}>
                <ul>
                    {items.map((item) => {
                        return(
                            <div key={item.id}>
                                <Link onClick={handleClose} className={css.link} to={item.to}>{item.title}</Link>
                            </div>
                        )
                    })}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default BurgerMenu