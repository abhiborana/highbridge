import { create } from "zustand";
import { devtools, redux } from "zustand/middleware";
import { reducer } from "./reducer";

export const initialState = {
  user: null,
};

const useHighbridgeStore = create(
  devtools(redux(reducer, initialState), {
    name: "useHighbridgeStore",
  }),
);

export default useHighbridgeStore;
