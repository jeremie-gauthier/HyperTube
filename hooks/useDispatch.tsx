import React from "react";
import { StoreContext } from "@/state/store";
import { StoreContextActions } from "@/state/types";

export default function useDispatch(): React.Dispatch<StoreContextActions> {
  const { dispatch } = React.useContext(StoreContext);
  return dispatch;
}
