import styled from "styled-components"
import { DOCK_POSITION } from "../../../../../const/DOCK"
import { CLOSE_BTN_POSITION } from "../../../../../const/WINDOW"
import { useDispatch, useSelector } from "react-redux"
import { changeDockPosition, changeWindowCloseBtnPosition } from "../../../../../features/settings/settingsSlice"

const StyledUISettings = styled.div`
    padding: 10px;

    .section > h2 {
        /* font-size: 1.2rem; */
    }

    .section + .section {
        margin-top: 30px;
    }

    ul.choices {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 10px;

        li input + label {
            margin-left: 5px;
        }
    }
`

const UISettings = () => {
    const dispatch = useDispatch()
    const dockPosition = useSelector(state => state.settings.dock.position)
    const closeBtnPosition = useSelector(state => state.settings.window.closeBtnPosition)
    // console.log(dockPosition)

    return (
        <StyledUISettings>
            <div className="section">
                <h2>Dock Position</h2>
                <ul className="choices">
                {
                    Object.keys(DOCK_POSITION).map(pos => (
                        <li key={pos}>
                            <input 
                                type="radio" 
                                name="dock_position" 
                                id={`dock_position_${pos}`} 
                                value={DOCK_POSITION[pos]} 
                                checked={dockPosition === DOCK_POSITION[pos]}
                                onChange={() => dispatch(changeDockPosition(DOCK_POSITION[pos]))}
                            />
                            <label htmlFor={`dock_position_${pos}`}>{pos}</label>
                        </li>
                    ))
                }
                </ul>
            </div>

            <div className="section">
                <h2>Window Close Button Position</h2>
                <ul className="choices">
                {
                    Object.keys(CLOSE_BTN_POSITION).map(pos => (
                        <li key={pos}>
                            <input 
                                type="radio" 
                                name="window_closebtn_position" 
                                id={`window_closebtn_position_${pos}`}
                                value={CLOSE_BTN_POSITION[pos]} 
                                checked={closeBtnPosition === CLOSE_BTN_POSITION[pos]}
                                onChange={() => dispatch(changeWindowCloseBtnPosition(CLOSE_BTN_POSITION[pos]))}
                            />
                            <label htmlFor={`window_closebtn_position_${pos}`}>{pos}</label>
                        </li>
                    ))
                }
                </ul>
            </div>
        </StyledUISettings>
    )
}

export default UISettings