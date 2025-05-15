"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Map } from "./map";
import { Lighting } from "./lighting";
import { Player } from "./player";
import { CameraController } from "./camera";
import { KeyboardControls } from "./keyboard-controls";

export default function Game() {
  return (
    <KeyboardControls>
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
