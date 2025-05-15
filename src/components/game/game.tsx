"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Map } from "./map";
import { Lighting } from "./lighting";
import { Player } from "./player";
import { CameraControls } from "./controls/camera-controls";
import { KeyboardControls } from "./controls/keyboard-controls";

export default function Game() {
  return (
    <KeyboardControls>
      <Canvas>
        <CameraControls isPlaying={true} />
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
