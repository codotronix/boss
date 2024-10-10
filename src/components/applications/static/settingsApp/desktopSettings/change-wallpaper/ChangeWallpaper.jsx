import { WallpaperConfig } from "./WallpaperConfig"
import styles from './ChangeWallpaper.module.css'
import { useDispatch } from "react-redux"
import { changeWallpaper } from "../../../../../../features/settings/settingsSlice"

function ChangeWallpaper() {
    const dispatch = useDispatch()

    const handleWallpaperChange = wallpaper => {
        dispatch(changeWallpaper(wallpaper))
    }

    return (
        <div>
            <ul className={styles.wallpapers_container}>
                {
                    WallpaperConfig.wallpapers.map(wallpaper => (
                        <li key={wallpaper.path}>
                            <img 
                                src={`${WallpaperConfig.root}${wallpaper.path}`} 
                                alt="wallpaper" 
                                onClick={() => handleWallpaperChange(`${WallpaperConfig.root}${wallpaper.path}`)}
                            />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default ChangeWallpaper