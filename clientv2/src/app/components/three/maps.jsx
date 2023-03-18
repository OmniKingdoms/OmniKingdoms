"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useEnvironment, OrbitControls } from "@react-three/drei";
import { mergeBufferGeometries } from "three-stdlib";
import { BoxGeometry, CylinderGeometry, Vector2 } from "three";
import { useMemo } from "react";
import { env } from "process";

let hexagonGeometries = new BoxGeometry(0, 0, 0);

function hexGeometry(height, position) {
  let geo = new CylinderGeometry(1, 1, height, 6, 1, false);
  geo.translate(position.x, height * 0.5, position.y);

  return geo;
}

function MakeHex({ height, position }) {
  const envMap = useEnvironment({ files: "/assets/envmap.hdr" });
  let geo = hexGeometry(height, position);
  hexagonGeometries = mergeBufferGeometries([hexagonGeometries, geo]);
  return (
    <mesh geometry={hexagonGeometries}>
      <meshNormalMaterial nvMap={envMap} />
    </mesh>
  );
}

export default function Maps() {
  //  <MakeHex key={x} height={3} position={new Vector2(x, x - 1)} />
  return (
    <div className="w-screen h-screen">
      <Canvas
        camera={{
          position: [10, 10, 50],
          far: 1000,
          near: 0.1,
          focus: 45,
          aspect: innerWidth / innerHeight,
        }}
      >
        {Array.from({ length: 20 }, (_, i) =>
          Array.from({ length: 20 }, (_, j) => (
            <MakeHex key={i * 20 + j} height={3} position={new Vector2(i, j)} />
          ))
        )}

        <OrbitControls />
      </Canvas>
    </div>
  );
}
