
import { useBurgerMenuOptions } from '../../helpers/useBurgerMenuOptions'
import { RenderNavigationOptions } from '../../helpers/VideoHelpers/RenderNavigationOptions'
import { useAppDispatch, useAppSelector } from '../../hooks/TypedHooks'
import { modalReducer } from '../../reducers/ModalReducer'
import css from './BurgerMenu.module.css'
const BurgerMenu = () => {
  const {CloseSideBar} = modalReducer.actions
  const dispatch = useAppDispatch()
  const {burgerMenuOptions} = useBurgerMenuOptions()
  const showSideBar = useAppSelector(state => state.modal.show_side_bar)
  const device = useAppSelector(state => state.device.device)
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
            <div onClick={(e : React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}  className={css.menu__content}>
                <ul>
                    <RenderNavigationOptions givenOptions={burgerMenuOptions}/>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default BurgerMenu