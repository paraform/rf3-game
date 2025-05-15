"use client";

import React, { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { usePlayerStore } from "@/utils/stores/player-store";
import { useCameraStore } from "@/utils/stores/camera-store";
import * as THREE from "three";

import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

interface CameraControlsProps {
  isPlaying: boolean;
}

export function CameraControls({ isPlaying }: CameraControlsProps) {
  const { camera, gl } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { playerRef } = usePlayerStore();
  const { height, distance } = useCameraStore();

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.enabled = !isPlaying;
    }
  }, [isPlaying]);

  useFrame(() => {
    if (isPlaying && playerRef.current) {
      const playerPosition = playerRef.current.position;
      const playerRotation = playerRef.current.rotation;

      const cameraPosition = new THREE.Vector3(
        playerPosition.x - distance * Math.sin(playerRotation.y),
        playerPosition.y + height,
        playerPosition.z - distance * Math.cos(playerRotation.y)
      );

      camera.position.lerp(cameraPosition, 0.1);
      camera.lookAt(playerPosition);
    }
    controlsRef.current?.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      camera={camera}
      domElement={gl.domElement}
    />
  );
}
