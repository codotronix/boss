# Menu and The App Menubar

This document explains how to work with the menubar and menu 

## How to Add Menu Bar to your App

- Desctructure essential functions from props. They will be passed to your app component whenever it is loaded by the WinFrame
`const { renderMenu, onClose, onNew  } = props`

- Create a menu object with the following structure
```javascript
const menu = {
    File: {
        "New": { handleClick: onNew },
        "SubMenu 2": { handleClick: Your_Fn },
        "SubMenu 3": { handleClick: Your_Fn  },
        "Quit": { handleClick: onClose },
    },
    "Menu 2": {
        "Copy": { handleClick: Your_Fn  },
        "Cut": { handleClick: Your_Fn  },
        "Paste": { handleClick: Your_Fn },
    }
}
```

- Pass the menu object to the renderMenu function and it will return the menu bar
```jsx
<>
    { renderMenu(menu) }
    <div>
        Your App Code Here ...
    </div>
</>
```
- Do not do any of these if your App does not need a menu bar