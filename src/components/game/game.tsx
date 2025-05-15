"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Map } from "./map";
import { Lighting } from "./lighting";
import { Player } from "./player";
import { CameraController } from "./camera";

const keyboardControlMap = [
  { name: "forward", keys: ["ArrowUp", "w", "W"] },
  { name: "backward", keys: ["ArrowDown", "s", "S"] },
  { name: "left", keys: ["ArrowLeft", "a", "A"] },
  { name: "right", keys: ["ArrowRight", "d", "D"] },
];

export default function Game() {
  return (
    <KeyboardControls map={keyboardControlMap}>
      <Canvas>
        <CameraController isPlaying={true} />
        <Lighting />
        <Suspense>
          <Physics debug>
            <Map
              glbPath="/models/map_01.glb"
              metadataPath="/models/map_01_metadata.json"
            />
            <Player />
          </Physics>
        </Suspense>
      </Canvas>
    </KeyboardControls>
  );
}
