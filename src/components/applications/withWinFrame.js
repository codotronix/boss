import { WinFrame } from "../common"
import React, { Suspense } from "react"
import { LoadingBasic } from "../common/loadings"

// This is a HOC function
// which will take the core / original component
// and then send a WinFrame wrapper version of it
function withWinFrame (AppComponent) {

    // Step 1: Create a Wrapped Component 
    const WinFrameWrappedAppComponent = props => {
        return (
            // Suspense Components could be remotely loaded 
            // via Webpack Module Federation - Micro-frontend
            <Suspense fallback={<LoadingBasic />}>
                <WinFrame appProps={props} AppComponent={AppComponent} />
            </Suspense>
        )
    }

    // Step 2: Return the Wrapped Component
    return WinFrameWrappedAppComponent
}

export default withWinFrame 