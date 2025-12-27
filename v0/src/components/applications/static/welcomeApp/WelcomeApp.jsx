import styles from './WelcomeApp.module.css'
import withWinFrame from '../../withWinFrame'

const WelcomeApp = (props) => {
    // console.log('WelcomeApp props = ', props)
    return (
        <div className={styles.root}>
            <i className="fa-solid fa-face-smile"></i>
            <h2>Welcome to B.O.S.S</h2>
            <div><u>B</u>asic <u>OS</u> <u>S</u>imulation</div>
        </div>
    )
}

export default withWinFrame(WelcomeApp)