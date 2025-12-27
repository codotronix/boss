// import { useState } from "react";
import "./App.css";
// import { Button } from "@/components/ui/button";
import { LockScreen } from "@/components/system";
import { Counter } from "@/components/Counter";
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
  return (
    <div>
      {/* Redux Counter Demo - you can remove this later */}
      <div className="p-4">
        <Counter />
      </div>
    </div>
  );
}

export default App;
