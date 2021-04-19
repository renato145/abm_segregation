import React, { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Model, ModelType } from "./Model";
import { FloorPlane } from "./FloorPlane";
import { SegregationEngine } from "engine-wasm";

interface Props {}

const PlaneConfig = {
  rows: 20,
  cols: 20,
  tileSize: 3,
  margin: 0.1,
};

const CanvasContent: React.FC = () => {
  // const ref = useRef();
  // useHelper(ref, PointLightHelper, 2, "yellow");
  const xOffset = ((PlaneConfig.rows - 1) * PlaneConfig.tileSize) / 2;
  const yOffset = ((PlaneConfig.cols - 1) * PlaneConfig.tileSize) / 2;
  const { engine, positions, modelTypes } = useMemo(() => {
    const engine = new SegregationEngine(PlaneConfig.rows, PlaneConfig.cols, 0.5, 0.75);
    const positions = engine.get_positions() as Array<number>[];
    const modelTypes = engine.get_agent_types() as string[];
    return { engine, positions, modelTypes };
  }, []);

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[10, 40, 70]}
        fov={50}
        zoom={1.0}
      />
      <ambientLight intensity={0.2} />
      <pointLight
        // ref={ref}
        castShadow
        position={[5, 30, 35]}
        intensity={0.5}
      />

      <Suspense fallback={null}>
        <group position={[-xOffset, 0, -yOffset]}>
          <FloorPlane {...PlaneConfig} />
          {positions.map((o, i) => (
            <Model
              key={i}
              scale={0.25}
              modelType={modelTypes[i] as any}
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
