import React from "react";
import { StoreContext } from "@/state/store";
import { RootState } from "@/state/types";

type CallbackFn<Data> = (state: RootState) => Data;

export default function useSelector<Data>(callback: CallbackFn<Data>) {
  const { state } = React.useContext(StoreContext);
  return callback(state);
}
