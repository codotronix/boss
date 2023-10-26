import withWinFrame from "../../withWinFrame"
import styles from "./TerminalApp.module.css"
import { useState, useRef, useEffect } from "react"
import { process } from "../../../../services/forTerminal/processor"
import { colorify } from "../../../../services/forTerminal/formatter"

const TerminalApp = props => {
    const [prompt, setPrompt] = useState('$ > ')
    const [historyTxt, setHistoryTxt] = useState(colorify('Welcome to the B.O.S.S. terminal', 'lightyellow'))
    const [currentLine, setCurrentLine] = useState(prompt)
    const [cmdHistory, setCmdHistory] = useState([])
    const [cmdHistoryIndex, setCmdHistoryIndex] = useState(0)
    const currentLineRef = useRef()


    // Focus 
    useEffect(() => {
        const el = currentLineRef.current
        el.focus()
        el.selectionStart = el.selectionEnd = el.value.length;
    }, 
    [])
    
    // User is writing
    const onChange = e => {
        let val = e.target.value
        // prompt should not be deleted
        // and it should always be the 1st 
        if(!val.startsWith(prompt)) {
            return
        }
        setCurrentLine(val)
    }

    // onKeyUp
    const onKeyUp = e => {
        const keyCode = e.keyCode
        // console.log(keyCode)

        // Enter pressed - 13
        if(keyCode === 13) {
            // Strip the prompt at the begining
            const currentCmd = currentLine.substring(prompt.length).trim()
            // don't process empty line
            if(currentCmd.length === 0) return

            if(currentCmd === 'cls' || currentCmd === 'clear') {
                setHistoryTxt('')
            }
            else {
                const result = process(currentCmd) // result = { msg, code, ctx }
                const newHistoryTxt = historyTxt 
                                    + colorify(currentLine, 'lightgreen')
                                    + colorify(result.msg, 'lightskyblue')
                setHistoryTxt(newHistoryTxt)
            }
            
            setCurrentLine(prompt)

            // save this command in history for later retrieval
            // only if it is not the same as just the prev one
            if(currentCmd !== cmdHistory[cmdHistory.length-1]) {
                const newCmdHistory = [...cmdHistory, currentCmd]
                setCmdHistory(newCmdHistory)
                setCmdHistoryIndex(newCmdHistory.length)
            }
        }

        // Up pressed - 38
        else if(keyCode === 38) {
            if(cmdHistory.length === 0) return
            // go up the prev command, if possible
            let index = cmdHistoryIndex > 0 ? cmdHistoryIndex-1: 0
            setCmdHistoryIndex(index)
            setCurrentLine(prompt + cmdHistory[index])
        }

        // Down pressed - 40
        else if(keyCode === 40) {
            if(cmdHistory.length === 0) return
            // go down the next command, if possible
            let index = cmdHistoryIndex < (cmdHistory.length-1) ? cmdHistoryIndex+1 : (cmdHistory.length-1)
            setCmdHistoryIndex(index)
            setCurrentLine(prompt + cmdHistory[index])
        }
    }

    return (
        <div className={styles.root}>
            <div 
                className={styles.historyTxt} 
                dangerouslySetInnerHTML={{ __html: historyTxt }}
            ></div>

            <textarea 
                className={styles.inputArea}
                value={currentLine}
                ref={currentLineRef}
                onChange={onChange}
                onKeyUp={onKeyUp}
            ></textarea>
        </div>
    )
}

export default withWinFrame(TerminalApp)