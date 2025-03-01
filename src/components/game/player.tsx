"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useKeyboardControls } from "@react-three/drei";
import { usePlayerStore } from "@/stores/player-store";

export function Player() {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const { playerRef } = usePlayerStore();
  const [, getKeys] = useKeyboardControls();

  useFrame((state, delta) => {
    const { forward, backward, left, right } = getKeys();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 1 * delta;
    const torqueStrength = 1 * delta;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }

    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }

    if (left) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }

    if (right) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }

    rigidBodyRef.current?.applyImpulse(impulse, true);
    rigidBodyRef.current?.applyTorqueImpulse(torque, true);
  });

  return (
    <RigidBody
      ref={rigidBodyRef}
      colliders="ball"
      restitution={0.2}
      friction={1}
    >
      <group ref={playerRef.current ? playerRef : undefined}>
        <mesh castShadow>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      </group>
    </RigidBody>
  );
}
