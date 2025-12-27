import { useEffect } from "react"
import useFilter from "./useFilter"

/**
 * 
 * @param { { allItems, filterKeys, setFilteredItems } } props
 * @param { itemsArray } allItems - The items to filter
 * @param { [key1, key2, ...] } filterKeys - The keys to filter
 * @param { Function } setFilteredItems - The function to set the filtered items
 * @returns 
 */
const TypeToFilter = props => {
    const { allItems, filterKeys, setFilteredItems, className='' } = props
    const [ filteredItems, filterTxt, onChangeFilterTxt ] = useFilter(allItems, filterKeys)

    // Whenever filtered item changes, notify the parent
    useEffect(() => {
        setFilteredItems(filteredItems)
    }, 
    [filteredItems, setFilteredItems])

    return(
        <div style={{marginBottom: '15px'}} className={className}>
            <input 
                type="text" 
                value={filterTxt} 
                onChange={onChangeFilterTxt} 
                placeholder="Type to filter"
                style={{ width: '100%', padding: '5px' }}
            />
        </div>
    )
}

export default TypeToFilter