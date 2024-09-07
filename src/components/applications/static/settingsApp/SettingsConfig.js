import ChangeWallpaper from "./desktop/change-wallpaper/ChangeWallpaper";


export const SettingsConfig = {
    menuItems: [
        { id: 1, name: "Change Wallpaper", component: ChangeWallpaper },
        { id: 2, name: "Menu Item 2", component: () => <div>Menu Item 2</div> },
        { id: 3, name: "Menu Item 3", component: () => <div>Menu Item 3</div> },
        { id: 4, name: "Menu Item 4", component: () => <div>Menu Item 4</div> },
        { id: 5, name: "Menu Item 5", component: () => <div>Menu Item 5</div> }
    ]
}