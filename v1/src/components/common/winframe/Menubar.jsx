import styles from './WinFrame.module.css'
import clsx from 'clsx'
import { useState } from 'react'

const Menubar = props => {
    const { menu } = props
    const [ visibleSubMenuId, setVisibleSubMenuId ] = useState('')

    const toggleSubMenu = id => {
        if(visibleSubMenuId === id) setVisibleSubMenuId('')
        else setVisibleSubMenuId(id)
    }

    // Handle the click and hide the sub menu
    const handleAndHide = (fn) => {
        fn()
        setVisibleSubMenuId('')
    }

    return(
        <div className={clsx(styles.bar, styles.menubar)}>
            {
                menu && Object.entries(menu).map(([menuName, menuVal]) => 
                <div key={menuName} className={clsx(styles.menu, visibleSubMenuId===menuName && styles.visible )}>
                    <span className={styles.menuName} onClick={() => toggleSubMenu(menuName)}>{ menuName }</span>
                    <ul className={styles.subMenu}>
                    {   
                        // Loop over the Submenu
                        Object.entries(menuVal).map(([subMenuName, subMenuVal]) => 
                        <li key={subMenuName} onClick={() => handleAndHide(subMenuVal.handleClick)} >
                            { subMenuName }
                        </li>)
                    }
                    </ul>
                </div>)
            }
        </div>
    )
}

export default Menubar