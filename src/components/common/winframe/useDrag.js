import { useState, useRef } from "react"
// import _ from 'lodash'

/**
 * the "el" is the element whose shadow is to be shown while dragging
 * e.g. even though users are dragging only the title bar, the users should fee
 * that they are dragging the entire window
 */
function useDrag (el) {
    // the real time position difference due to dragging
    // from initial position and then from each prev position
    // during the drag
    const [posDiff, setPosDiff] = useState({ leftDiff: 0, topDiff: 0 })

    // save the prev position during drag
    const dragPrevPos = useRef(null)

    // When dragging starts
    // Save the initial position
    const onDragStart = (left, top, e) => {
        dragPrevPos.current = { left, top }
        if(el) {
            e.dataTransfer.setDragImage(el, 0, 0)
        }
    }

    // we could throttle it
    // but it's already too slow due to react's wait-and-upate-in-batch update of state
    // TODO: Check if could make it faster...
    const onDrag = (left, top) => {
        if(left===0 && top===0) return

        if(dragPrevPos.current) {
            let leftDiff = left - dragPrevPos.current.left
            let topDiff = top - dragPrevPos.current.top

            // save the diff
            setPosDiff({ leftDiff, topDiff })
        }

        // set new previous drag position
        dragPrevPos.current = { left, top }
    }

    const onDragEnd = (left, top) => {
        dragPrevPos.current = null
    }

    return {
        posDiff,
        onDragStart,
        onDrag,
        onDragEnd
    }

}

export default useDrag

