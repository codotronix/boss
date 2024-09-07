import { useState } from "react"
import withWinFrame from "../../withWinFrame"
import { useEffect } from "react"
import styles from "./SettingsApp.module.css"
import { SettingsConfig } from "./SettingsConfig"
import clsx from "clsx"
import TypeToFilter from "../../../common/type-to-filter/TypeToFilter"

const SettingsApp = props => {
    const { configMenu } = props
    const { menuItems } = SettingsConfig
    const [selected, setSelected] = useState(menuItems[0].id)
    const [isMenuClosed, setIsMenuClosed] = useState(false)
    const [filteredMenuItems, setFilteredMenuItems] = useState(menuItems)

    useEffect(() => {
        // Disable menu by calling the configMenu
        configMenu({ hideMenu: true })
    },
    [configMenu])

    return (
        <div className={styles.root}>
            <div className={clsx(styles.container, isMenuClosed && styles.menu_closed)}>

                {/* The Menu Toggle Button */}
                <div className={styles.btn_panel}>
                    <button className={styles.toggle_btn} onClick={() => setIsMenuClosed(!isMenuClosed)}>
                        <i className="fa-solid fa-arrow-left-long"></i>
                    </button>
                </div>
                

                {/* Left Column */}
                <section className={styles.left}>
                    <TypeToFilter
                        allItems={menuItems}
                        filterKeys={['name']}
                        setFilteredItems={setFilteredMenuItems}
                    />
                    <ul className={styles.left_inner}>
                        {filteredMenuItems.map(item => (
                            <li key={item.id} className={clsx(selected === item.id && styles.selected)} onClick={() => setSelected(item.id)}>
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Mid Column / Main area */}
                <section className={styles.mid}>
                    <section className={styles.mid_inner}>
                        {menuItems.map(item => (
                            <div key={item.id} className={clsx(selected !== item.id && 'hidden')}>
                                {item.component()}
                            </div>
                        ))}
                    </section>
                </section>
            </div>
        </div>
    )
}

export default withWinFrame(SettingsApp)