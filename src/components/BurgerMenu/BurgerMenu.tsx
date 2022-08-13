
import { useBurgerMenuOptions } from '../../helpers/useBurgerMenuOptions'
import { RenderNavigationOptions } from '../../helpers/VideoHelpers/RenderNavigationOptions'
import { useAppDispatch, useAppSelector } from '../../hooks/TypedHooks'
import { modalReducer } from '../../reducers/ModalReducer'
import css from './BurgerMenu.module.css'
const BurgerMenu = () => {
  const {CloseSideBar} = modalReducer.actions
  const dispatch = useAppDispatch()
  const items = useBurgerMenuOptions()
  const showSideBar = useAppSelector(state => state.modal.show_side_bar)
  const device = useAppSelector(state => state.device.device)
  const handleClose = () => {
    dispatch(CloseSideBar())
  }
  const rootClases = [css.menu]
   if (showSideBar){
        rootClases.push(css.active)
  }

  const menu__content_widths = {
    'tablet':20,
    'desktop':10,
    'mobile':40
  }
  return (
    <div className={rootClases.join(' ')}>
        <div onClick={handleClose} className={css.blur}>
            <div onClick={(e : React.MouseEvent<HTMLDivElement>) => e.stopPropagation()} style={{width:menu__content_widths[device]+'%'}} className={css.menu__content}>
                <ul>
                    <RenderNavigationOptions/>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default BurgerMenu