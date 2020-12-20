import React from "react";
import { StoreContext } from "@/state/store";
import { RootState } from "@/state/types";

type CallbackFn = (state: RootState) => unknown;

export default function useSelector(callback: CallbackFn): unknown {
  const { state } = React.useContext(StoreContext);
  return callback(state);
}
