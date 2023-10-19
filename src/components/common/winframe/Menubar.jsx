import styles from './WinFrame.module.css'
import clsx from 'clsx'
import { useState } from 'react'

const Menubar = props => {
    const { menu, handleMenuCommand } = props
    const [ visibleSubMenuId, setVisibleSubMenuId ] = useState('')

    const toggleSubMenu = id => {
        if(visibleSubMenuId === id) setVisibleSubMenuId('')
        else setVisibleSubMenuId(id)
    }

    return(
        <div className={clsx(styles.bar, styles.menubar)}>
            {
                menu && Object.keys(menu).map(m => 
                <div key={m} className={clsx(styles.menu, visibleSubMenuId===m && styles.visible )}>
                    <span className={styles.menuName} onClick={() => toggleSubMenu(m)}>{ m }</span>
                    <ul className={styles.subMenu}>
                    {   
                        // Loop over the Submenu
                        menu[m].map(sm => 
                        <li key={sm.command} onClick={() => handleMenuCommand(sm.command)} >
                            { sm.name }
                        </li>)
                    }
                    </ul>
                </div>)
            }
        </div>
    )
}

export default Menubar