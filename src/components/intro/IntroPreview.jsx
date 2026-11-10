
import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

/* --------------------------------
   PROCEDURAL CONCRETE TEXTURE
-------------------------------- */

function createConcreteTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;

  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#77736b";
  ctx.fillRect(0, 0, 512, 512);

  // Fine concrete grain
  for (let i = 0; i < 18000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const shade = Math.random() > 0.5 ? 255 : 0;
    const alpha = Math.random() * 0.12;

    ctx.fillStyle = `rgba(${shade},${shade},${shade},${alpha})`;
    ctx.fillRect(x, y, 1.5, 1.5);
  }

  // Water stains
  for (let i = 0; i < 65; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const radius = 10 + Math.random() * 55;

    const gradient = ctx.createRadialGradient(
      x, y, 1, x, y, radius
    );

    gradient.addColorStop(0, "rgba(25,24,22,0.12)");
    gradient.addColorStop(1, "rgba(25,24,22,0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;

  return texture;
}

/* --------------------------------
   CONCRETE MATERIAL
-------------------------------- */

function ConcreteMaterial({ repeat = [2, 4], color = "#77736b" }) {
  const texture = useMemo(() => {
    const map = createConcreteTexture();
    map.repeat.set(...repeat);
    return map;
  }, [repeat[0], repeat[1]]);

  return (
    <meshStandardMaterial
      map={texture}
      color={color}
      roughness={0.96}
      metalness={0.02}
      bumpMap={texture}
      bumpScale={0.09}
    />
  );
}

/* --------------------------------
   CONCRETE STRUCTURE
-------------------------------- */

function ConcreteBox({ position, scale, rotation, color, repeat }) {
  return (
    <mesh
      position={position}
      scale={scale}
      rotation={rotation || [0, 0, 0]}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <ConcreteMaterial repeat={repeat || [2, 2]} color={color} />
    </mesh>
  );
}

function CorridorStructure() {
  return (
    <group>
      {/* Floor */}
      <ConcreteBox
        position={[0, -0.16, -0.5]}
        scale={[4.8, 0.32, 20]}
        repeat={[3, 10]}
        color="#77746c"
      />

      {/* Side walls */}
      <ConcreteBox
        position={[-2.42, 2.2, -0.5]}
        scale={[0.3, 4.4, 20]}
        repeat={[2, 8]}
        color="#66635d"
      />

      <ConcreteBox
        position={[2.42, 2.2, -0.5]}
        scale={[0.3, 4.4, 20]}
        repeat={[2, 8]}
        color="#66635d"
      />

      {/* Ceiling */}
      <ConcreteBox
        position={[0, 4.45, -0.5]}
        scale={[4.8, 0.3, 20]}
        repeat={[3, 8]}
        color="#57544e"
      />

      {/* Exposed structural beams */}
      {[-7, -3, 1, 5].map((z) => (
        <ConcreteBox
          key={z}
          position={[0, 4.05, z]}
          scale={[4.6, 0.24, 0.28]}
          color="#514e48"
        />
      ))}

      {/* Damaged concrete supports */}
      <ConcreteBox
        position={[-2.05, 2.4, -5.6]}
        scale={[0.48, 4.8, 1.2]}
        rotation={[0, 0, -0.06]}
        color="#504d47"
      />

      <ConcreteBox
        position={[2.02, 2.2, -6.8]}
        scale={[0.42, 4.4, 1.4]}
        rotation={[0, 0, 0.08]}
        color="#55514b"
      />

      {/* Door end wall, with opening */}
      <ConcreteBox
        position={[-1.85, 2.2, -10.2]}
        scale={[1.1, 4.4, 0.45]}
        color="#69655e"
      />

      <ConcreteBox
        position={[1.85, 2.2, -10.2]}
        scale={[1.1, 4.4, 0.45]}
        color="#69655e"
      />

      <ConcreteBox
        position={[0, 3.9, -10.2]}
        scale={[2.6, 1, 0.45]}
        color="#625e57"
      />
    </group>
  );
}

/* --------------------------------
   INDUSTRIAL STEEL DOOR
-------------------------------- */

function IndustrialDoor() {
  return (
    <group position={[0, 0, -9.93]}>
      {/* Outer steel frame */}
      <mesh position={[-1.13, 1.65, -0.12]} castShadow>
        <boxGeometry args={[0.16, 3.3, 0.34]} />
        <meshStandardMaterial
          color="#343633"
          metalness={0.8}
          roughness={0.5}
        />
      </mesh>

      <mesh position={[1.13, 1.65, -0.12]} castShadow>
        <boxGeometry args={[0.16, 3.3, 0.34]} />
        <meshStandardMaterial
          color="#343633"
          metalness={0.8}
          roughness={0.5}
        />
      </mesh>

      <mesh position={[0, 3.25, -0.12]}>
        <boxGeometry args={[2.4, 0.16, 0.34]} />
        <meshStandardMaterial
          color="#343633"
          metalness={0.8}
          roughness={0.5}
        />
      </mesh>

      {/* Main steel slab */}
      <mesh position={[0, 1.62, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.12, 3.12, 0.18]} />
        <meshStandardMaterial
          color="#454943"
          metalness={0.78}
          roughness={0.64}
        />
      </mesh>

      {/* Door inset panels */}
      {[-0.66, 0, 0.66].map((x) => (
        <mesh key={x} position={[x, 1.65, 0.105]}>
          <boxGeometry args={[0.55, 2.65, 0.025]} />
          <meshStandardMaterial
            color="#343834"
            metalness={0.65}
            roughness={0.72}
          />
        </mesh>
      ))}

      {/* Horizontal reinforcement */}
      {[-0.65, 0.65, 1.42].map((y) => (
        <mesh key={y} position={[0, y, 0.14]}>
          <boxGeometry args={[2.05, 0.045, 0.035]} />
          <meshStandardMaterial
            color="#77786e"
            metalness={0.85}
            roughness={0.4}
          />
        </mesh>
      ))}

      {/* Handle */}
      <mesh
        position={[0.76, 1.45, 0.19]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry args={[0.035, 0.035, 0.32, 16]} />
        <meshStandardMaterial
          color="#a09b8d"
          metalness={0.95}
          roughness={0.25}
        />
      </mesh>

      {/* Lock plate */}
      <mesh position={[0.76, 1.45, 0.13]}>
        <boxGeometry args={[0.2, 0.42, 0.035]} />
        <meshStandardMaterial
          color="#252825"
          metalness={0.8}
          roughness={0.4}
        />
      </mesh>

      {/* Hinges */}
      {[-1.15, 0, 1.15].map((y) => (
        <mesh key={y} position={[-1.08, 1.62 + y, 0.13]}>
          <boxGeometry args={[0.13, 0.24, 0.1]} />
          <meshStandardMaterial
            color="#77766d"
            metalness={0.85}
            roughness={0.45}
          />
        </mesh>
      ))}

      {/* Small warning light above door */}
      <mesh position={[0, 3.42, 0.02]}>
        <boxGeometry args={[0.38, 0.08, 0.08]} />
        <meshStandardMaterial
          color="#a46d3d"
          emissive="#9a4f1e"
          emissiveIntensity={0.65}
        />
      </mesh>
    </group>
  );
}

/* --------------------------------
   EXPOSED PIPES
-------------------------------- */

function Pipe({
  position,
  rotation = [0, 0, 0],
  length = 12,
  radius = 0.055,
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow>
      <cylinderGeometry args={[radius, radius, length, 16]} />
      <meshStandardMaterial
        color="#454944"
        metalness={0.82}
        roughness={0.48}
      />
    </mesh>
  );
}

function Pipes() {
  return (
    <group>
      <Pipe
        position={[-1.65, 3.95, -1]}
        rotation={[Math.PI / 2, 0, 0]}
        length={17}
        radius={0.075}
      />

      <Pipe
        position={[1.82, 3.78, -1]}
        rotation={[Math.PI / 2, 0, 0]}
        length={17}
        radius={0.045}
      />

      <Pipe
        position={[-2.1, 3.25, -2]}
        rotation={[Math.PI / 2, 0, 0]}
        length={13}
        radius={0.04}
      />

      {/* Vertical pipe sections */}
      {[-6, -2, 2].map((z) => (
        <Pipe
          key={z}
          position={[2.16, 2.6, z]}
          length={2.6}
          radius={0.07}
        />
      ))}
    </group>
  );
}

/* --------------------------------
   RUBBLE / DEBRIS
-------------------------------- */

const debris = [
  {
    p: [-1.45, 0.12, 3.2],
    s: [0.48, 0.22, 0.4],
    r: [0.2, 0.5, 0.1],
  },
  {
    p: [1.15, 0.1, 0.5],
    s: [0.3, 0.18, 0.32],
    r: [0.4, 0.2, 0.8],
  },
  {
    p: [-0.7, 0.08, -3.4],
    s: [0.22, 0.15, 0.28],
    r: [0.2, 1, 0.1],
  },
  {
    p: [1.3, 0.1, -5.5],
    s: [0.38, 0.24, 0.34],
    r: [0.5, 0.2, 0.4],
  },
  {
    p: [-1.1, 0.09, -7.2],
    s: [0.25, 0.15, 0.3],
    r: [0.2, 0.4, 0.1],
  },
  {
    p: [0.3, 0.08, -8.4],
    s: [0.18, 0.12, 0.22],
    r: [0.5, 0.8, 0.2],
  },
  {
    p: [1.7, 0.11, 5.5],
    s: [0.55, 0.28, 0.48],
    r: [0.3, 0.2, 0.5],
  },
];

function Rubble() {
  return (
    <group>
      {debris.map((rock, index) => (
        <mesh
          key={index}
          position={rock.p}
          scale={rock.s}
          rotation={rock.r}
          castShadow
          receiveShadow
        >
          <dodecahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color={index % 2 === 0 ? "#68645b" : "#4d4b45"}
            roughness={1}
          />
        </mesh>
      ))}

      {/* Broken concrete slab */}
      <mesh
        position={[1.2, 0.12, -2.8]}
        rotation={[0.1, 0.4, -0.08]}
        castShadow
      >
        <boxGeometry args={[0.9, 0.16, 0.55]} />
        <meshStandardMaterial
          color="#555149"
          roughness={1}
        />
      </mesh>

      {/* Fallen structural beam */}
      <mesh
        position={[-0.3, 0.18, -4.8]}
        rotation={[0.04, 0.3, 0.12]}
        castShadow
      >
        <boxGeometry args={[1.3, 0.12, 0.18]} />
        <meshStandardMaterial
          color="#3d403b"
          roughness={0.95}
        />
      </mesh>
    </group>
  );
}

/* --------------------------------
   DUST PARTICLES
-------------------------------- */

function DustParticles() {
  const positions = useMemo(() => {
    const values = new Float32Array(650 * 3);

    for (let i = 0; i < 650; i++) {
      values[i * 3] = (Math.random() - 0.5) * 4;
      values[i * 3 + 1] = Math.random() * 4;
      values[i * 3 + 2] = -9 + Math.random() * 18;
    }

    return values;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={650}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#c5c0ad"
        size={0.018}
        transparent
        opacity={0.38}
        sizeAttenuation
      />
    </points>
  );
}

/* --------------------------------
   LIGHTING
-------------------------------- */

function Lighting() {
  const spotlightTarget = useMemo(() => {
    const target = new THREE.Object3D();
    target.position.set(0, 0, -5);
    return target;
  }, []);

  return (
    <>
      <ambientLight intensity={0.55} color="#a9a69d" />

      <hemisphereLight
        skyColor="#a9a9a4"
        groundColor="#242321"
        intensity={0.45}
      />

      {/* Main ceiling light */}
      <pointLight
        position={[0, 4.1, 1.8]}
        intensity={48}
        distance={10}
        decay={2}
        color="#d8d1bd"
      />

      {/* Mid-corridor illumination */}
      <pointLight
        position={[0, 3.2, -5]}
        intensity={28}
        distance={8}
        decay={2}
        color="#a9aaa5"
      />

      {/* Door backlight */}
      <pointLight
        position={[0, 3.5, -9.2]}
        intensity={18}
        distance={4}
        color="#d4c9ad"
      />

      {/* Subtle directional spotlight */}
      <primitive object={spotlightTarget} />

      <spotLight
        position={[-1.8, 3.8, 4]}
        target={spotlightTarget}
        intensity={22}
        angle={0.65}
        penumbra={0.8}
        distance={18}
        color="#b9b6a9"
      />
    </>
  );
}

/* --------------------------------
   SCENE
-------------------------------- */

function Scene() {
  return (
    <>
      <color attach="background" args={["#11110f"]} />

      <fog attach="fog" args={["#11110f", 7, 23]} />

      <Lighting />
      <CorridorStructure />
      <Pipes />
      <IndustrialDoor />
      <Rubble />
      <DustParticles />
    </>
  );
}

/* --------------------------------
   PREVIEW PAGE
-------------------------------- */

export default function IntroPreview() {
  return (
    <div className="intro-preview">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{
          position: [0, 1.7, 8],
          fov: 66,
          near: 0.1,
          far: 50,
        }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <Scene />
      </Canvas>

      <div className="intro-preview-top">
        <span>ENVIRONMENT STUDY / 001</span>
        <span>THE THRESHOLD</span>
      </div>

      <div className="intro-preview-bottom">
        STAGE 01 — INDUSTRIAL CORRIDOR
      </div>
    </div>
  );
}
