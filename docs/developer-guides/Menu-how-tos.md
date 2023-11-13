# Menu and The App Menubar

This document explains how to work with the menubar and menu 

## Index
- [Configure the menu](#configure-menu-with-configmenu)
- [Add menus and submenus](#add-menu-items-and-submenu-items)
- [Handle click on Submenus](#handle-submenu-click)


## Configure Menu with `configMenu`

- Take out `configMenu` from the props
```
const { configMenu } = props
```


## Add Menu Items and Submenu Items

- When the App Component loads, in the useEffect add new menu items, here is an example
```
// Configure the menu
    useEffect(() => {
        configMenu({
            replace?: boolean // default is merge, i.e. replace: false
            menu: {
                File: { 
                    2: { name: 'New File', command: COMMANDS.NEW_FILE },
                    3: { name: 'New Folder', command: COMMANDS.NEW_FOLDER },
                },
                View: {
                    1: { name: 'List View', command: 'List View' },
                    2: { name: 'Grid View', command: 'Grid View' },
                    3: { name: 'Icon View', command: 'Icon View' },
                }
            }
        })
    }, 
    [configMenu])
```

On each submenu, name is the string to be shown to the user and command is an unique string that will be passed as `menuCommand` prop to the App whenever user clicks on that menu

- if `replace` is set to true, it will replace the default menu provided by WinFrame, i.e. File menu with submenu `New Window` and `Close Window`



## Handle Submenu Click

- When user clicks on a submenu, the corresponding command (a string) will be passed to the App Component via `menuCommand`. Let's see how to handle it.

- Take out `menuCommand` from props.
```
const { menuCommand } = props
```

- Import `useCMDHandler` hook from `/common/winframe/useCMDHandler`

- This `useCMDHandler` hook takes in 2 arguments, the `menuCommand` to watch and a handler function to callback whenever a new menuCommand is recieved

```
useCMDHandler (menuCommand, cmd => {
    if(cmd === COMMANDS.NEW_FILE) {
        console.log('Create new file')
        // Code to create New File
    }
    else if(cmd === COMMANDS.NEW_FOLDER) {
        console.log('Create new folder')
        const cnt = Math.floor(Math.random()*999) 
        fs.createDir(`Folder_${cnt}`, currentFolderId)
    }

    // More if-else or switch case ladders
    // for each submenu command to handle
})
```


## Hide Menu

If your app does not need to show the menuubar, just hide it using the following

```
const { configMenu } = props

useEffect(() => {
    // Disable menu by calling the configMenu
    configMenu({ hideMenu: true })
},
[configMenu])
```

