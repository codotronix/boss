import clsx from 'clsx'
import styled from 'styled-components'
import { APPS_DETAILS } from '../../../../../const/APPS_DETAILS'
import { WINDOW_SIZES } from '../../../../../const/WINDOW'
import useRuntime from '../../../../../features/procs/useRuntime'

const StyledMinimizedAppsList = styled.div`
    position: absolute;
    bottom: 75px;
    right: -12px;
    background: #000;
    color: #1b8ffa;
    border-radius: 9px;
    user-select: none;
    overflow: auto;

    &.left {
        left: 80px;
        right: auto;
        bottom: 0;
    }

    &.right {
        right: 80px;
        left: auto;
        bottom: 0;
    }

    &.top {
        top: 75px;
        bottom: auto;
    }

    .inner_list {
        padding: 0;
        margin: 0;
        list-style: none;
        min-width: 200px;

        li {
            display: grid;
            grid-template-columns: 1fr 35px;

            .appName {
                padding: 10px 20px;

                &:hover {
                    background: rgb(255 255 255 / 12%);
                }
            }

            & > * {
                display: flex;
                align-items: center;
            }

            .closeIco {
                justify-content: center;

                &:hover {
                    color: red;
                    background: rgb(255 255 255 / 12%);
                }
            }
        }
    }
`

const MinimizedAppsList = props => {
    const { visible, setVisible, minimizedApps, className } = props
    const runtime = useRuntime()

    const onAppClick = (runtimeId) => {
        setVisible(false)
        runtime.mize(runtimeId, WINDOW_SIZES.MAXIMIZED)
        runtime.raiseWindow(runtimeId)
    }

    const onAppClose = (runtimeId) => {
        // setVisible(false)
        runtime.terminate(runtimeId)
    }

    return (
        <StyledMinimizedAppsList className={clsx(!visible && 'hidden', className)}>
            <ul className="inner_list">
                { 
                    (!minimizedApps || minimizedApps.length === 0) && 
                    <li className='p-10'>No minimized apps</li>
                }
                {
                    minimizedApps && minimizedApps.map(a => 
                    <li key={a.runtimeId}>
                        <span 
                            className="appName"
                            onClick={() => onAppClick(a.runtimeId)}
                        >
                            { APPS_DETAILS[a.appId].name }
                        </span>
                        <i 
                            className="fa-solid fa-xmark closeIco"
                            title='Close App'
                            onClick={() => onAppClose(a.runtimeId)}
                        ></i>
                    </li>)
                }
            </ul>
        </StyledMinimizedAppsList>
    )
}

export default MinimizedAppsList