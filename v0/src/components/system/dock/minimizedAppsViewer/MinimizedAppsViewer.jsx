import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import clsx from 'clsx'
import dockIconStyles from "../dockIcon/DockIcon.module.css"
import { WINDOW_SIZES } from '../../../../const/WINDOW'
import MinimizedAppsList from './minimizedAppsList/MinimizedAppsList'

const StyledMinimizedAppsViewer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    border-left: 1px solid #555;

    .minimizeCount {
        background: #ff0;
        display: inline-flex;
        font-size: 9px;
        font-weight: bold;
        position: absolute;
        top: 0;
        right: 0;
        border-radius: 50%;
        padding: 1px;
        min-height: 15px;
        min-width: 15px;
        justify-content: center;
        align-items: center;
        z-index: 1;
    }

    &.left,
    &.right {
        border-left: none;
        border-top: 1px solid #555;
    }
`

const MinimizedAppsViewer = props => {
    const { className='' } = props  // dockPosition will be sent as className
    const [ minimizeListVisible, setMinimizeListVisible ] = useState(false)
    const runningApps = useSelector(state => state.procs)
    // const dockPosition = useSelector(state => state.settings.dock.position)
    const minimizedApps = Object.values(runningApps).filter(r => r.winSize === WINDOW_SIZES.MINIMIZED)

    // useEffect(() => {
    //     console.log(thisElRef.current)
    //     console.log('offsetTop=', thisElRef.current.offsetTop)
    //     console.log('offsetHeight=', thisElRef.current.offsetHeight)
    //     console.log('offsetLeft=', thisElRef.current.offsetLeft)
    //     console.log('offsetWidth=', thisElRef.current.offsetWidth)
    // }, 
    // [window.innerWidth])

    return (
        <StyledMinimizedAppsViewer className={className}>
            <MinimizedAppsList 
                visible={minimizeListVisible} 
                setVisible={setMinimizeListVisible}
                minimizedApps={minimizedApps}
                className={className}
            />

            <div className={clsx(dockIconStyles.root)}>
                { 
                    minimizedApps.length > 0 && 
                    <span className="minimizeCount">{minimizedApps.length}</span>
                }
                <button 
                    type="button" 
                    className={clsx(dockIconStyles.root)}
                    title="toggle minimized apps"
                    onClick={() => setMinimizeListVisible(!minimizeListVisible)}
                >
                    <i className={clsx("fa-solid fa-bars", dockIconStyles.ico)} ></i>
                </button>
            </div>
        </StyledMinimizedAppsViewer>
    )
}

export default MinimizedAppsViewer