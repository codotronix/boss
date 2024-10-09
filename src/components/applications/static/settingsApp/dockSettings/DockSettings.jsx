import styled from "styled-components"
import { DOCK_POSITION } from "../../../../../const/DOCK"
import { useDispatch, useSelector } from "react-redux"
import { changeDockPosition } from "../../../../../features/settings/settingsSlice"

const StyledDockSettings = styled.div`
    padding: 10px;

    ul.choices {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 10px;

        li input + label {
            margin-left: 5px;
        }
    }
`

const DockSettings = () => {
    const dispatch = useDispatch()
    const dockPosition = useSelector(state => state.settings.dock.position)
    // console.log(dockPosition)

    return (
        <StyledDockSettings>
            {/* <h1>Dock Settings</h1> */}
            <div className="sec">
                <h2>Select Dock Position</h2>
                <ul className="choices">
                {
                    Object.keys(DOCK_POSITION).map(pos => (
                        <li key={pos}>
                            <input 
                                type="radio" 
                                name="dock_position" 
                                id={pos} 
                                value={DOCK_POSITION[pos]} 
                                checked={dockPosition === DOCK_POSITION[pos]}
                                onChange={() => dispatch(changeDockPosition(DOCK_POSITION[pos]))}
                            />
                            <label htmlFor={pos}>{pos}</label>
                        </li>
                    ))
                }
                </ul>
            </div>
        </StyledDockSettings>
    )
}

export default DockSettings