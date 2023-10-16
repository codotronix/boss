import { useState, useRef } from "react"
import _ from 'lodash'

function useDrag () {
    // the real time position difference due to dragging
    // from initial position and then from each prev position
    // during the drag
    const [posDiff, setPosDiff] = useState({ leftDiff: 0, topDiff: 0 })

    // save the prev position during drag
    const dragPrevPos = useRef(null)

    // When dragging starts
    // Save the initial position
    const onDragStart = (left, top) => dragPrevPos.current = { left, top }

    const onDrag = _.throttle((left, top) => {
        if(left===0 && top===0) return

        if(dragPrevPos.current) {
            let leftDiff = left - dragPrevPos.current.left
            let topDiff = top - dragPrevPos.current.top

            // save the diff
            setPosDiff({ leftDiff, topDiff })
        }

        // set new previous drag position
        dragPrevPos.current = { left, top }
    }, 0)

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

