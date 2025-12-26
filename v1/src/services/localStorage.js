const ls = {
    get: k => JSON.parse(localStorage.getItem(k) || null),
    set: (k, v) => localStorage.setItem(k, JSON.stringify(v)),
    clear: k => localStorage.setItem(k, '')
}

export default ls