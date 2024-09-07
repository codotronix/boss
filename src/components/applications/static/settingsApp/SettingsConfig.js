import ChangeWallpaper from "./desktop/change-wallpaper/ChangeWallpaper";


export const SettingsConfig = {
    menuItems: [
        { id: 1, name: "Change Wallpaper", component: ChangeWallpaper },
        { id: 2, name: "Menu Item 2", component: () => <div>Menu Item 2 Placeholer</div> },
        { id: 3, name: "Menu Item 3", component: () => <div>Menu Item 3 Placeholer</div> },
        { id: 4, name: "Menu Item 4", component: () => <div>Menu Item 4 Placeholer</div> },
        { id: 5, name: "Menu Item 5", component: () => <div>Menu Item 5 Placeholer</div> }
    ]
}