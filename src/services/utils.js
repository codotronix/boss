
export const trimNDot = (s, n) => s.length > n ? (s.substring(0,n) + '...') : s

export const isFileNameValid = fileName => {
    const VALID_FILENAME_REGEX = /^[a-zA-Z0-9-._ ]{1,}$/
    return VALID_FILENAME_REGEX.test(fileName)
}
/**
 * Splits a string accross space 
 * but keeps Double-Quoted strings intact
 * @param {String} line
 */
export function splitter(line) {
    line = line.trim()
    let parts = []
    let s = ''          // current part
    let q = ''          // current quote
    let qMap = {}       // { qID1: String1, qID2: String2, ... }
    let qInProg = false // quote in progress
    let cnt = 0
    let prefix = '__QS__'   // to identify a QuotedString

    for(let c of line) {
        // Quote found ?
        if(c === '"') {
            // already a quote in progress?
            // end it
            if(qInProg) {
                // if there was something in this quote
                q = q.trim()
                if(q.length > 0) {
                    let qId = `${prefix}${++cnt}`
                    s += qId
                    qMap[qId] = q 
                    q = ''
                }
                qInProg = false
            }
            // else start a quote
            else {
                qInProg = true
            }
        }

        // if a space is found
        else if(c === ' ') {
            // if inside a quote?
            // then add it to the quote
            if(qInProg) q += c 
            // else make a splitted-part
            else {
                // if at all it contains something
                s = s.trim()
                if(s.length > 0) {
                    parts.push(s)
                    s = ''
                }
            }
        }
        // else, add it to appropriate place
        else {
            if(qInProg) q += c
            else s += c 
        }
    }

    // care for the last part
    // which might not have a space after it
    if(s.length > 0) parts.push(s)

    // restore all the prefix quotes
    parts = parts.map(p => p.replaceAll(/__QS__[0-9]{1,}/gm, qId => qMap[qId] || qId))

    return parts
}