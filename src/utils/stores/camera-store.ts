import { create } from "zustand";
import * as THREE from "three";
import { createRef } from "react";

interface CameraState {
  cameraRef: React.RefObject<THREE.Camera | null>;
  setCameraRef: (ref: React.RefObject<THREE.Camera | null>) => void;
  height: number;
  distance: number;
  setHeight: (height: number) => void;
  setDistance: (distance: number) => void;
}

export const useCameraStore = create<CameraState>((set) => ({
  cameraRef: createRef<THREE.Camera | null>(),
  setCameraRef: (ref) => set({ cameraRef: ref }),
  height: 5,
  distance: 10,
  setHeight: (height) => set({ height }),
  setDistance: (distance) => set({ distance }),
}));
