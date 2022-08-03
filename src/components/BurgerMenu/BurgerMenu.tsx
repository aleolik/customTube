import React,{FC} from 'react'
import css from './BurgerMenu.module.css'
interface BurgerMenuProps{
    children : any
}
export const BurgerMenu : FC<BurgerMenuProps> = ({children}) => {
  return (
    <div className={css.wrapper}>
        <nav>
            <input type="checkbox" id="menu" name="menu" className={css.m_menu__checkbox}/>
            <label className={css.m_menu__toggle} htmlFor="menu">
                <svg  width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="butt" stroke-linejoin="arcs"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                {children}
            </label>
            <label className={css.m_menu__overlay} htmlFor="menu"></label>
        
            <div className={css.m_menu}>
                <div className={css.m_menu__header}>
                    <label className={css.m_menu__toggle} htmlFor="menu">
                    <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="butt" stroke-linejoin="arcs">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    </label>
                    <span>MENU</span>
                </div>
            </div>
        </nav>
    </div>
  )
}

