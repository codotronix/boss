import { useState } from "react"
import withWinFrame from "../../withWinFrame"
import { useEffect } from "react"
import styles from "./SettingsApp.module.css"
import { SettingsConfig } from "./SettingsConfig"
import clsx from "clsx"

const SettingsApp = props => {
    const { configMenu } = props
    const { menuItems } = SettingsConfig
    const [selected, setSelected] = useState(menuItems[0].id)
    

    useEffect(() => {
        // Disable menu by calling the configMenu
        configMenu({ hideMenu: true })
    },
    [configMenu])

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                {/* Left Column */}
                <section className={styles.left}>
                    <ul className={styles.left_inner}>
                        {menuItems.map(item => (
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