"use client";

import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { useMapLoader } from "@/hooks/use-map-loader";

interface MapProps {
  glbPath: string;
  metadataPath: string;
}

export function Map({ glbPath, metadataPath }: MapProps) {
  const { scene, metadata, isLoading, error } = useMapLoader(
    glbPath,
    metadataPath
  );

  if (isLoading) return <primitive object={new THREE.Object3D()} />;
  if (error) return <primitive object={new THREE.Object3D()} />;
  if (!metadata || !scene) return null;

  const meshes = metadata.meshes.map((meshData, index) => {
    const object = scene.getObjectByName(meshData.name);
    if (!object) {
      console.warn(`Mesh "${meshData.name}" not found in GLB!`);
      return null;
    }
    return (
      <primitive
        key={`mesh-${index}`}
        object={object}
        position={meshData.position}
        rotation={new THREE.Euler(...meshData.rotation)}
        scale={meshData.scale}
      />
    );
  });

  const colliders = metadata.colliders.map((colliderData, index) => {
    const object = scene.getObjectByName(colliderData.name);
    if (!object) {
      console.warn(`Collider "${colliderData.name}" not found in GLB!`);
      return null;
    }
    return (
      <RigidBody
        key={`collider-${index}`}
        type="fixed"
        colliders={colliderData.type}
        position={colliderData.position}
        rotation={new THREE.Euler(...colliderData.rotation)}
        scale={colliderData.scale}
      >
        <primitive object={object}>
          <meshBasicMaterial visible={false} />
        </primitive>
      </RigidBody>
    );
  });

  return (
    <group>
      {meshes}
      {colliders}
    </group>
  );
}
