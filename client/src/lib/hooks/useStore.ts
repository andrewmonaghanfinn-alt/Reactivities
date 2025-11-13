import { useContext } from "react";
import { StoreContext } from "../stores/store";

export default function useSyncExternalStore() {
  return useContext(StoreContext);
}
