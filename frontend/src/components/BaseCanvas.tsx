import React, { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Model } from "./Model";
import { FloorPlane } from "./FloorPlane";
import { BoardState, TStore, useStore } from "../store";

interface Props {
  className: string;
}

const PlaneConfig = {
  tileSize: 3,
  margin: 0.1,
};

const selector = ({
  boardSize,
  positions,
  modelTypes,
  boardState,
  ticksPerSecond,
  step,
}: TStore) => ({
  boardSize,
  positions,
  modelTypes,
  boardState,
  ticksPerSecond,
  step,
});

const CanvasContent: React.FC = () => {
  const {
    boardSize,
    positions,
    modelTypes,
    boardState,
    ticksPerSecond,
    step,
  } = useStore(selector);
  // const ref = useRef();
  // useHelper(ref, PointLightHelper, 2, "yellow");
  const offset = ((boardSize - 1) * PlaneConfig.tileSize) / 2;

  // useFrame(({ clock: { elapsedTime } }) => {
  useFrame(({ clock }) => {
    if (
      boardState === BoardState.Running &&
      clock.elapsedTime > 1 / ticksPerSecond
    ) {
      step();
      clock.start();
    }
  });

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
        <group position={[-offset, 0, -offset]}>
          <FloorPlane boardSize={boardSize} {...PlaneConfig} />
          {positions.map(({ x, y, is_happy }, i) => (
            <Model
              key={i}
              scale={0.25}
              modelType={modelTypes[i]}
              position={[x * PlaneConfig.tileSize, 0, y * PlaneConfig.tileSize]}
              isHappy={is_happy}
            />
          ))}
        </group>
      </Suspense>
      <OrbitControls />
    </>
  );
};

export const BaseCanvas: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <Canvas shadows>
        <CanvasContent />
      </Canvas>
    </div>
  );
};
