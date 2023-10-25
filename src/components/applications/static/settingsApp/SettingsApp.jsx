import withWinFrame from "../../withWinFrame"
import { useEffect } from "react"

const SettingsApp = props => {
    const { configMenu } = props

    useEffect(() => {
        // Disable menu by calling the configMenu
        configMenu({ hideMenu: true })
    },
    [configMenu])

    return (
        <div>
            Settings App - Under Development
        </div>
    )
}

export default withWinFrame(SettingsApp)