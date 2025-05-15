"use client";

import { useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";

interface MeshMetadata {
  name: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}

interface ColliderMetadata {
  name: string;
  type: "trimesh" | "hull" | "cuboid";
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}

interface MapMetadata {
  meshes: MeshMetadata[];
  colliders: ColliderMetadata[];
}

export function useMapLoader(glbPath: string, metadataPath: string) {
  const [metadata, setMetadata] = useState<MapMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { scene } = useGLTF(glbPath);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await fetch(metadataPath);
        if (!response.ok) {
          throw new Error(`Failed to fetch metadata: ${response.status}`);
        }
        const data: MapMetadata = await response.json();
        setMetadata(data);
        setIsLoading(false);
      } catch (error) {
        setError((error as Error).message);
        setIsLoading(false);
      }
    };

    fetchMetadata();
  }, [metadataPath]);

  return { scene, metadata, isLoading, error };
}
