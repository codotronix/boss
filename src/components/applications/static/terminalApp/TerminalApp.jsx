import withWinFrame from "../../withWinFrame"
import styles from "./TerminalApp.module.css"
import { useState, useRef, useEffect } from "react"

const TerminalApp = props => {
    const [prompt, setPrompt] = useState('$ ')
    const [historyTxt, setHistoryTxt] = useState('')
    const [currentLine, setCurrentLine] = useState(prompt)
    const currentLineRef = useRef()

    useEffect(() => {
        const el = currentLineRef.current
        el.focus()
        el.selectionStart = el.selectionEnd = el.value.length;
        // setTimeout(() => {
            
        //     currentLineRef.current.innerText = '$'
        // }, 2000)
        
    }, 
    [])
    
    const onChange = e => {
        let val = e.target.value
        if(val.length < prompt.length) val = prompt
        setCurrentLine(val)
    }

    return (
        <div className={styles.root}>
            <div>{historyTxt}</div>
            {/* <div 
                className={styles.currentline}
                contentEditable={true}
                ref={currentLineRef}
                onKeyUp={handleKeyUp}
            ></div> */}

            <textarea 
                className={styles.inputArea}
                value={currentLine}
                ref={currentLineRef}
                onChange={onChange}
            ></textarea>
                
        </div>
    )
}

export default withWinFrame(TerminalApp)