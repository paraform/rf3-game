import { create } from "zustand";
import * as THREE from "three";
import { createRef } from "react";

interface PlayerState {
  playerRef: React.RefObject<THREE.Group | null>;
  setPlayerRef: (ref: React.RefObject<THREE.Group | null>) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  playerRef: createRef<THREE.Group | null>(),
  setPlayerRef: (ref) => set({ playerRef: ref }),
}));
