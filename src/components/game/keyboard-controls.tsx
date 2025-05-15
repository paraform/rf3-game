import { ReactNode } from "react";
import {
  KeyboardControls as DreiKeyboardControls,
  KeyboardControlsEntry,
} from "@react-three/drei";

const keyboardControlMap: KeyboardControlsEntry[] = [
  { name: "forward", keys: ["ArrowUp", "w", "W"] },
  { name: "backward", keys: ["ArrowDown", "s", "S"] },
  { name: "left", keys: ["ArrowLeft", "a", "A"] },
  { name: "right", keys: ["ArrowRight", "d", "D"] },
];

interface KeyboardControlsProps {
  children: ReactNode;
}

export const KeyboardControls = ({ children }: KeyboardControlsProps) => (
  <DreiKeyboardControls map={keyboardControlMap}>
    {children}
  </DreiKeyboardControls>
);
