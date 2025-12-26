import { useState } from "react";

export default function useFilter(allItems, filterKeys) {
    const [filteredItems, setFilteredItems] = useState(allItems)
    const [filterTxt, setFilterTxt] = useState('')

    const onChangeFilterTxt = e => {
        const txt = e.target.value
        setFilterTxt(txt)
        const filtered = allItems.filter(item => {
            return filterKeys.some(key => item[key] && item[key].toLowerCase().includes(txt.toLowerCase()))
        })
        setFilteredItems(filtered)
    }

    return [ filteredItems, filterTxt, onChangeFilterTxt ]
}