import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Man1 } from "./Man1";
import { FloorPlane } from "./FloorPlane";

interface Props {}

const PlaneConfig = {
  rows: 8,
  cols: 8,
  tileSize: 3,
  margin: 0.1,
};

const CanvasContent: React.FC = () => {
  const xOffset = ((PlaneConfig.rows - 1) * PlaneConfig.tileSize) / 2;
  const yOffset = ((PlaneConfig.cols - 1) * PlaneConfig.tileSize) / 2;

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0, 30, 40]}
        fov={50}
        zoom={1.0}
      />
      <ambientLight />
      {/* <pointLight position={[0, 0, 4]} /> */}
      <Suspense fallback={null}>
        <group position={[-xOffset, yOffset, 0]}>
          <FloorPlane {...PlaneConfig} />
          <Man1
            scale={0.25}
            position={[PlaneConfig.tileSize, 0, 3 * PlaneConfig.tileSize]}
          />
          <Man1
            scale={0.25}
            position={[5 * PlaneConfig.tileSize, 0, 6 * PlaneConfig.tileSize]}
          />
        </group>
      </Suspense>
      <OrbitControls />
    </>
  );
};

export const BaseCanvas: React.FC<Props> = () => {
  return (
    <Canvas className="bg-gray-900" shadows>
      <CanvasContent />
    </Canvas>
  );
};
