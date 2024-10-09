import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
// import styles from './Dock.module.css'
import DockIcon from './dockIcon/DockIcon'
import MinimizedAppsViewer from './minimizedAppsViewer/MinimizedAppsViewer'
import useRuntime from '../../../features/procs/useRuntime'

const StyledDock = styled.div`
    position: fixed;
    bottom: 5px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .inner {
        background: #000;
        height: 80px;
        max-width: 80vw;
        border-radius: 9px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 12px;
        position: relative;

        .scrollable_holder {
            display: flex;
            overflow: auto;
        }
    }

    &.top {
        top: 5px;
        bottom: auto;
    }

    &.left, 
    &.right {
        top: 0;
        bottom: 0;
        
        .inner {
            height: auto;
            max-height: 80vh;
            flex-direction: column;
            width: 80px;
            max-width: 80px;

            .scrollable_holder {
                flex-direction: column;
            }
        }
    }

    &.left {
        left: 5px;
        right: auto;
    }

    &.right {
        right: 5px;
        left: auto;
    }
`

const Dock = props => {
    // const { dockDetails } = props
    const [zIndex, setZIndex] = useState(1)
    const apps = useSelector(state => state.apps)
    const dockPosition = useSelector(state => state.settings.dock.position)

    const dockedApps = Object.values(apps).filter(a => a.docked)
    const runtime = useRuntime()
    
    const onClick = () => {
        setZIndex(runtime.getMaxZIndex()+1)
    }

    return (
        <StyledDock 
            id="thedock" 
            style={{ zIndex }} 
            onClick={onClick}
            className={dockPosition}
        >

            <div className="inner">
                <div className="scrollable_holder">
                {
                    dockedApps && dockedApps.map(da => <DockIcon 
                        key={da.appId} {...da}
                    />)
                }
                </div>
                <MinimizedAppsViewer className={dockPosition} />
            </div>
            
        </StyledDock>
    )
}

export default Dock