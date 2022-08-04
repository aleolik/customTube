
import { useBurgerMenuOptions } from '../../helpers/useBurgerMenuOptions'
import { useAppDispatch } from '../../hooks/TypedHooks'
import { modalReducer } from '../../reducers/ModalReducer'
import css from './BurgerMenu.module.css'
const BurgerMenu = () => {
  const {CloseSideBar} = modalReducer.actions
  const dispatch = useAppDispatch()
  const items = useBurgerMenuOptions()
  const handleClose = () => {
    dispatch(CloseSideBar())
  }
  return (
    <div className={css.menu}>
        <div onClick={handleClose} className={css.blur}>
            <div onClick={(e : React.MouseEvent<HTMLDivElement>) => e.stopPropagation()} className={css.menu__content}>
                <ul>
                    {items.map((item) => {
                        return(
                            <div key={item.id}>
                                <li>{item.title}</li>
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