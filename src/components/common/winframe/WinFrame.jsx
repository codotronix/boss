import clsx from 'clsx'
import styles from './WinFrame.module.css'

const top = 10 + Math.floor(Math.random()*200)
const left = 10 + Math.floor(Math.random()*100)
const getStyles = () => {
    return {
        top, left
    }
}

const menus = {
    File: [],
    Menu2: [],
    Menu3: [],
    Menu4: [],
    Menu5: [],
}


const WinFrame = props => {

    return (
        <div className={styles.root} style={getStyles()}>
            <div className={clsx(styles.bar, styles.namebar)}>
                <div>WinFrame</div>
                <div className={styles.btns}>
                    <i className="fa-regular fa-square"></i>
                    <i className="fa-solid fa-window-minimize"></i>
                    <i className="fa-solid fa-xmark"></i>
                </div>
            </div>
            <div className={clsx(styles.bar, styles.menubar)}>
                {
                    Object.keys(menus).map(m => 
                    <div key={m} className={styles.menu}>
                        {m}
                    </div>)
                }
            </div>
        </div>
    )
}

export default WinFrame