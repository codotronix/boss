import { useEffect } from "react";
import { getExternalApps } from "@/services/externalApps";
import { registerApps } from "@/store/slices/appsSlice";
import { LockScreen, Desktop } from "@/components/system";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { unlockSystem } from "./store/slices/systemSlice";

function App() {
  const dispatch = useAppDispatch();

  // load the external apps on app startup
  useEffect(() => {
    const fetchExternalApps = async () => {
      const externalApps = await getExternalApps();
      console.log("Fetched external apps:", externalApps);
      if (Object.keys(externalApps).length > 0) {
        dispatch(registerApps(externalApps));
      }
    };
    fetchExternalApps();
  }, []);

  const isSystemUnLocked = useAppSelector(
    (state) => state.system.isSystemUnLocked
  );

  const handleUnlockSystem = () => dispatch(unlockSystem());

  if (!isSystemUnLocked) {
    return <LockScreen onUnlock={handleUnlockSystem} />;
  }
  return <Desktop />;
}

export default App;
