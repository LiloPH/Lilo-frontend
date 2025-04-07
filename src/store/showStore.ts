import { create } from "zustand";
import { produce } from "immer";

interface ShowStore {
  showStopControl: boolean;
  toggleShowStopControl: () => void;
}

export const showStore = create<ShowStore>((set) => ({
  showStopControl: false,
  toggleShowStopControl: () =>
    set(
      produce((state: ShowStore) => {
        state.showStopControl = !state.showStopControl;
      })
    ),
}));
