import React from "react";

export function Lighting() {
  return (
    <>
      <ambientLight intensity={3} color="#ddddff" />
      <group>
        <directionalLight
          castShadow
          intensity={1}
          position={[2, 2, -2]}
          shadow-bias={-0.001}
          shadow-mapSize={1024}
          shadow-radius={3}
          shadow-intensity={0.3}
        >
          <orthographicCamera
            args={[-8.5, 8.5, 8.5, -8.5, 0.1, 20]}
            attach="shadow-camera"
          />
        </directionalLight>
      </group>
    </>
  );
}
