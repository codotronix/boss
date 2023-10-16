import React, { Suspense } from "react"
import { WinFrame } from "../../../common"
const BCalc = React.lazy(() => import("bcalc/BCalc"))

const RemoteBCalc = (props) => {
    // console.log('WelcomeApp props = ', props)
    return (
        <Suspense fallback="loading...">
            <BCalc props={props} />
        </Suspense>
    )
}

// let's do a render props pattern
// export default p => <WinFrame render={ c => <WelcomeApp {...c} {...p} />} />

const AppWithinWinframe = props => <WinFrame appProps={props} AppComponent={RemoteBCalc} />

export default AppWithinWinframe