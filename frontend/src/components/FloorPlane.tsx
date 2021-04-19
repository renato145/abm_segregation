import { Plane } from "@react-three/drei";
import React from "react";
import { DoubleSide } from "three";

interface Props {
  rows: number;
  cols: number;
  tileSize: number;
  margin: number;
}

export const FloorPlane: React.FC<Props> = ({
  rows,
  cols,
  tileSize,
  margin,
}) => {
  return (
    <mesh receiveShadow position={[0, -0.01, 0]} rotation={[Math.PI / 2, 0, 0]}>
      {Array(rows * cols)
        .fill(0)
        .map((_, i) => {
          const x = (i % rows) * tileSize;
          const y = Math.floor(i / rows) * tileSize;
          return (
            <group key={i}>
              <Plane
                receiveShadow
                args={[tileSize - margin, tileSize - margin]}
                position={[x, y, 0]}
              >
                <meshBasicMaterial
                  attach="material"
                  color="#55565e"
                  side={DoubleSide}
                  opacity={0.5}
                />
              </Plane>
              <Plane
                receiveShadow
                args={[tileSize - margin, tileSize - margin]}
                position={[x, y, 0]}
              >
                <shadowMaterial
                  attach="material"
                  color="#000"
                  side={DoubleSide}
                  opacity={0.5}
                />
              </Plane>
            </group>
          );
        })}
    </mesh>
  );
};
