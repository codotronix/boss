import { LockScreen, Desktop } from "@/components/system";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { unlockSystem } from "./store/slices/systemSlice";

function App() {
  const isSystemUnLocked = useAppSelector(
    (state) => state.system.isSystemUnLocked
  );

  const dispatch = useAppDispatch();
  const handleUnlockSystem = () => dispatch(unlockSystem());

  if (!isSystemUnLocked) {
    return <LockScreen onUnlock={handleUnlockSystem} />;
  }
  return <Desktop />;
}

export default App;
