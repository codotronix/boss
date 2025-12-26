import { useState } from "react";
import interact from "interactjs";

/**
 * This custom hook tracks the position 
 * of the given element which may be subject to drag ...
 * 
 * So, it can be used for any number of applications that depend on mouse drag
 * For Example, reposition, resize etc.
 * @param {*} el 
 * @param {*} initPosition 
 * @returns 
 */
function useDragV2(el, initPosition) {
    const [position, setPosition] = useState(initPosition);

    // console.log(el)
    el && interact(el).draggable({
        listeners: {
            start(event) {
                console.log(event.type, event.target)
            },
            move(event) {
                setPosition(pos => ({ x: pos.x + event.dx, y: pos.y + event.dy }))
            },
        }
    })


    return [position, setPosition]
}

export default useDragV2;