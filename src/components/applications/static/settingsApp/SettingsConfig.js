import ChangeWallpaper from "./desktop/change-wallpaper/ChangeWallpaper";
import DockSettings from "./dockSettings/DockSettings";

export const SettingsConfig = {
    menuItems: [
        { id: 1, name: "Wallpaper", component: ChangeWallpaper },
        { id: 2, name: "Dock", component: DockSettings },
        { id: 3, name: "Menu Item 3", component: () => <div>Menu Item 3 Placeholer</div> },
        { id: 4, name: "Menu Item 4", component: () => <div>Menu Item 4 Placeholer</div> },
        { id: 5, name: "Menu Item 5", component: () => <div>Menu Item 5 Placeholer</div> }
    ]
}