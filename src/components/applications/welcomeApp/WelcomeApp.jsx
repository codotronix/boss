import { WinFrame } from "../../common";
import styles from './WelcomeApp.module.css'

const WelcomeApp = (props) => {
    console.log('WelcomeApp props = ', props)
    return (
        <div className={styles.root}>
            <i className="fa-solid fa-face-smile"></i>
            <h2>Welcome to B.O.S.S</h2>
        </div>
    )
}

// let's do a render props pattern
// export default p => <WinFrame render={ c => <WelcomeApp {...c} {...p} />} />

export default props => <WinFrame appProps={props} AppComponent={WelcomeApp} />