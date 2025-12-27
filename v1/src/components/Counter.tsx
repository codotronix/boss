import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  increment,
  decrement,
  incrementByAmount,
  reset,
} from "../store/slices/counterSlice";
import { Button } from "@/components/common/ui";

export function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg bg-card">
      <h2 className="text-2xl font-bold">Counter: {count}</h2>

      <div className="flex space-x-2">
        <Button onClick={() => dispatch(increment())}>+1</Button>
        <Button onClick={() => dispatch(decrement())}>-1</Button>
        <Button onClick={() => dispatch(reset())} variant="outline">
          Reset
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <input
          className="px-2 py-1 border rounded"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
          type="number"
        />
        <Button onClick={() => dispatch(incrementByAmount(incrementValue))}>
          Add Amount
        </Button>
      </div>
    </div>
  );
}
