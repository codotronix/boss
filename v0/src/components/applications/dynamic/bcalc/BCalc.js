import React from "react"
import withWinFrame from "../../withWinFrame"
const BCalc = React.lazy(() => import("bcalc/BCalc"))

export default withWinFrame(BCalc)