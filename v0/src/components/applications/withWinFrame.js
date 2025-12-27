import { WinFrame } from "../common"
import React from "react"

// This is a HOC function
// which will take the core / original component
// and then send a WinFrame wrapper version of it
function withWinFrame (AppComponent) {

    // Step 1: Create a Wrapped Component 
    
    const WinFrameWrappedAppComponent = props => 
        <WinFrame appProps={props} AppComponent={AppComponent} />


    // Step 2: Return the Wrapped Component
    return WinFrameWrappedAppComponent
}

export default withWinFrame 