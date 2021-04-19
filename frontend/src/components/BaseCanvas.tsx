import React, { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Man1 } from "./Man1";
import { FloorPlane } from "./FloorPlane";
import { SegregationEngine } from "engine-wasm";

interface Props {}

const PlaneConfig = {
  rows: 8,
  cols: 8,
  tileSize: 3,
  margin: 0.1,
};

type Positions = Array<number>[];

const CanvasContent: React.FC = () => {
  // const ref = useRef();
  // useHelper(ref, PointLightHelper, 2, "yellow");
  const xOffset = ((PlaneConfig.rows - 1) * PlaneConfig.tileSize) / 2;
  const yOffset = ((PlaneConfig.cols - 1) * PlaneConfig.tileSize) / 2;
  const { engine, positions } = useMemo(() => {
    const engine = new SegregationEngine(8, 8, 0.5, 0.75);
    const positions = engine.get_positions() as Positions;
    return { engine, positions };
  }, []);

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0, 30, 40]}
        fov={50}
        zoom={1.0}
      />
      <ambientLight intensity={0.25} />
      <pointLight
        // ref={ref}
        castShadow
        position={[5, 30, 15]}
        intensity={0.75}
      />

      <Suspense fallback={null}>
        <group position={[-xOffset, 0, -yOffset]}>
          <FloorPlane {...PlaneConfig} />
          {positions.map((o, i) => (
            <Man1
              key={i}
              scale={0.25}
              position={[
                o[0] * PlaneConfig.tileSize,
                0,
                o[1] * PlaneConfig.tileSize,
              ]}
            />
          ))}
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
