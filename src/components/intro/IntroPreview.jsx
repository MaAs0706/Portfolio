
import React, { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* --------------------------------
   PROCEDURAL SURFACE TEXTURES
-------------------------------- */

function createConcreteTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;

  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#77746c";
  ctx.fillRect(0, 0, 1024, 1024);

  // Fine surface grain
  for (let i = 0; i < 65000; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const shade = Math.random() > 0.5 ? 255 : 0;
    const alpha = Math.random() * 0.09;

    ctx.fillStyle = `rgba(${shade},${shade},${shade},${alpha})`;
    ctx.fillRect(x, y, 1 + Math.random() * 2, 1 + Math.random() * 2);
  }

  // Large water stains
  for (let i = 0; i < 90; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const radius = 20 + Math.random() * 110;

    const gradient = ctx.createRadialGradient(
      x, y, 1,
      x, y, radius
    );

    gradient.addColorStop(0, "rgba(20,19,17,0.24)");
    gradient.addColorStop(0.5, "rgba(30,29,27,0.10)");
    gradient.addColorStop(1, "rgba(20,19,17,0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // Vertical runoff marks
  for (let i = 0; i < 110; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const length = 15 + Math.random() * 150;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(
      x + Math.random() * 8,
      y + length * 0.3,
      x - Math.random() * 8,
      y + length * 0.7,
      x + Math.random() * 4,
      y + length
    );

    ctx.strokeStyle = `rgba(25,24,22,${Math.random() * 0.15})`;
    ctx.lineWidth = 1 + Math.random() * 4;
    ctx.stroke();
  }

  // Hairline cracks
  for (let i = 0; i < 45; i++) {
    let x = Math.random() * 1024;
    let y = Math.random() * 1024;

    ctx.beginPath();
    ctx.moveTo(x, y);

    for (let j = 0; j < 5; j++) {
      x += (Math.random() - 0.5) * 30;
      y += 5 + Math.random() * 24;
      ctx.lineTo(x, y);
    }

    ctx.strokeStyle = "rgba(20,19,17,0.25)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;

  return texture;
}

function createMetalTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;

  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#555951";
  ctx.fillRect(0, 0, 512, 512);

  // Brushed metal grain
  for (let i = 0; i < 12000; i++) {
    const y = Math.random() * 512;
    const shade = Math.random() > 0.5 ? 255 : 0;

    ctx.fillStyle = `rgba(${shade},${shade},${shade},${Math.random() * 0.07})`;
    ctx.fillRect(Math.random() * 512, y, 1 + Math.random() * 18, 1);
  }

  // Scratches
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + (Math.random() - 0.5) * 35, y + (Math.random() - 0.5) * 8);
    ctx.strokeStyle = `rgba(220,220,210,${Math.random() * 0.16})`;
    ctx.lineWidth = Math.random() * 1.5;
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;

  return texture;
}

/* --------------------------------
   MATERIALS
-------------------------------- */

function ConcreteMaterial({
  repeat = [2, 2],
  color = "#77736b",
}) {
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
      bumpScale={0.055}
    />
  );
}

function MetalMaterial({
  color = "#454943",
  metalness = 0.75,
  roughness = 0.58,
  textured = false,
}) {
  const texture = useMemo(
    () => (textured ? createMetalTexture() : null),
    [textured]
  );

  return (
    <meshStandardMaterial
      map={texture || undefined}
      color={color}
      metalness={metalness}
      roughness={roughness}
    />
  );
}

/* --------------------------------
   CONCRETE GEOMETRY
-------------------------------- */

function ConcreteBox({
  position,
  scale,
  rotation,
  color = "#77736b",
  repeat = [2, 2],
}) {
  return (
    <mesh
      position={position}
      scale={scale}
      rotation={rotation || [0, 0, 0]}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <ConcreteMaterial repeat={repeat} color={color} />
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
        color="#77736a"
      />

      {/* Side walls */}
      <ConcreteBox
        position={[-2.42, 2.2, -0.5]}
        scale={[0.3, 4.4, 20]}
        repeat={[2, 8]}
        color="#66635c"
      />

      <ConcreteBox
        position={[2.42, 2.2, -0.5]}
        scale={[0.3, 4.4, 20]}
        repeat={[2, 8]}
        color="#66635c"
      />

      {/* Ceiling */}
      <ConcreteBox
        position={[0, 4.45, -0.5]}
        scale={[4.8, 0.3, 20]}
        repeat={[3, 8]}
        color="#57544e"
      />

      {/* Ceiling beams */}
      {[-7, -3, 1, 5].map((z) => (
        <ConcreteBox
          key={z}
          position={[0, 4.05, z]}
          scale={[4.6, 0.24, 0.28]}
          color="#514e48"
        />
      ))}

      {/* Structural supports */}
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

      {/* Door end wall */}
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

      {/* Damp patches along the lower walls */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[side * 2.255, 0.48, -5]}
          rotation={[0, side * Math.PI / 2, 0]}
        >
          <planeGeometry args={[5, 0.7]} />
          <meshBasicMaterial
            color="#252723"
            transparent
            opacity={0.24}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* --------------------------------
   INDUSTRIAL STEEL DOOR
-------------------------------- */

function IndustrialDoor() {
  return (
    <group position={[0, 0, -9.93]}>
      {/* Deep outer frame */}
      <mesh position={[-1.13, 1.65, -0.15]} castShadow>
        <boxGeometry args={[0.2, 3.42, 0.48]} />
        <MetalMaterial color="#242824" metalness={0.8} />
      </mesh>

      <mesh position={[1.13, 1.65, -0.15]} castShadow>
        <boxGeometry args={[0.2, 3.42, 0.48]} />
        <MetalMaterial color="#242824" metalness={0.8} />
      </mesh>

      <mesh position={[0, 3.32, -0.15]} castShadow>
        <boxGeometry args={[2.45, 0.2, 0.48]} />
        <MetalMaterial color="#292d28" metalness={0.8} />
      </mesh>

      {/* Recessed shadow behind door */}
      <mesh position={[0, 1.62, -0.09]}>
        <boxGeometry args={[2.12, 3.16, 0.12]} />
        <meshStandardMaterial color="#090b09" roughness={1} />
      </mesh>

      {/* Main slab */}
      <mesh position={[0, 1.62, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.12, 3.12, 0.22]} />
        <MetalMaterial
          color="#424840"
          metalness={0.72}
          roughness={0.7}
          textured
        />
      </mesh>

      {/* Vertical inset panels */}
      {[-0.68, 0, 0.68].map((x) => (
        <group key={x}>
          <mesh position={[x, 1.65, 0.119]}>
            <boxGeometry args={[0.55, 2.68, 0.025]} />
            <MetalMaterial
              color="#343a34"
              metalness={0.55}
              roughness={0.82}
            />
          </mesh>

          {/* Panel inner edge */}
          <mesh position={[x, 1.65, 0.137]}>
            <boxGeometry args={[0.015, 2.58, 0.006]} />
            <meshStandardMaterial
              color="#858477"
              metalness={0.75}
              roughness={0.7}
            />
          </mesh>
        </group>
      ))}

      {/* Reinforcement bars */}
      {[-0.68, 0.68, 1.42].map((y) => (
        <mesh key={y} position={[0, y, 0.16]} castShadow>
          <boxGeometry args={[2.04, 0.055, 0.045]} />
          <MetalMaterial
            color="#686b61"
            metalness={0.86}
            roughness={0.43}
          />
        </mesh>
      ))}

      {/* Bottom kick plate */}
      <mesh position={[0, 0.16, 0.15]}>
        <boxGeometry args={[1.98, 0.24, 0.035]} />
        <MetalMaterial color="#292e29" metalness={0.8} />
      </mesh>

      {/* Lock plate */}
      <mesh position={[0.76, 1.45, 0.18]}>
        <boxGeometry args={[0.22, 0.46, 0.055]} />
        <MetalMaterial color="#20241f" metalness={0.85} />
      </mesh>

      {/* Handle mounting plates */}
      <mesh position={[0.76, 1.45, 0.215]}>
        <boxGeometry args={[0.12, 0.3, 0.025]} />
        <MetalMaterial color="#77776c" metalness={0.95} roughness={0.25} />
      </mesh>

      {/* Handle */}
      <mesh
        position={[0.76, 1.45, 0.27]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
      >
        <cylinderGeometry args={[0.035, 0.035, 0.32, 24]} />
        <MetalMaterial
          color="#b2aa94"
          metalness={0.98}
          roughness={0.23}
        />
      </mesh>

      {/* Hinges */}
      {[-1.12, 0, 1.12].map((y) => (
        <group key={y} position={[-1.075, 1.62 + y, 0.13]}>
          <mesh castShadow>
            <boxGeometry args={[0.15, 0.26, 0.14]} />
            <MetalMaterial color="#77766d" metalness={0.85} />
          </mesh>
          <mesh position={[0, 0, 0.08]}>
            <cylinderGeometry args={[0.045, 0.045, 0.29, 12]} />
            <MetalMaterial color="#aaa18d" metalness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Rivets */}
      {[-0.92, 0.92].map((x) =>
        [0.28, 2.96].map((y) => (
          <mesh key={`${x}-${y}`} position={[x, y, 0.125]}>
            <cylinderGeometry args={[0.025, 0.025, 0.025, 12]} />
            <MetalMaterial color="#a09a88" metalness={0.9} />
          </mesh>
        ))
      )}

      {/* Warning light housing */}
      <mesh position={[0, 3.48, 0.02]}>
        <boxGeometry args={[0.46, 0.13, 0.12]} />
        <MetalMaterial color="#242723" metalness={0.7} />
      </mesh>

      <mesh position={[0, 3.49, 0.09]}>
        <boxGeometry args={[0.38, 0.075, 0.045]} />
        <meshStandardMaterial
          color="#b27643"
          emissive="#a64d19"
          emissiveIntensity={0.7}
          roughness={0.35}
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
  color = "#454944",
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow>
      <cylinderGeometry args={[radius, radius, length, 20]} />
      <MetalMaterial color={color} metalness={0.82} roughness={0.48} />
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
        color="#56564c"
      />

      {/* Pipe brackets */}
      {[-6, -2, 2].map((z) => (
        <group key={z}>
          <Pipe
            position={[2.16, 2.6, z]}
            length={2.6}
            radius={0.07}
          />

          <mesh position={[2.16, 3.9, z]}>
            <boxGeometry args={[0.12, 0.1, 0.2]} />
            <MetalMaterial color="#292d29" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* --------------------------------
   RUBBLE / DEBRIS
-------------------------------- */

const debris = [
  { p: [-1.45, 0.12, 3.2], s: [0.48, 0.22, 0.4], r: [0.2, 0.5, 0.1] },
  { p: [1.15, 0.1, 0.5], s: [0.3, 0.18, 0.32], r: [0.4, 0.2, 0.8] },
  { p: [-0.7, 0.08, -3.4], s: [0.22, 0.15, 0.28], r: [0.2, 1, 0.1] },
  { p: [1.3, 0.1, -5.5], s: [0.38, 0.24, 0.34], r: [0.5, 0.2, 0.4] },
  { p: [-1.1, 0.09, -7.2], s: [0.25, 0.15, 0.3], r: [0.2, 0.4, 0.1] },
  { p: [0.3, 0.08, -8.4], s: [0.18, 0.12, 0.22], r: [0.5, 0.8, 0.2] },
  { p: [1.7, 0.09, 5.5], s: [0.32, 0.14, 0.28], r: [0.3, 0.2, 0.5] },
  { p: [-1.9, 0.06, -1.5], s: [0.12, 0.08, 0.18], r: [0.4, 0.7, 0.3] },
  { p: [0.8, 0.06, -6.4], s: [0.13, 0.08, 0.12], r: [0.7, 0.3, 0.5] },
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
            flatShading
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
        <meshStandardMaterial color="#555149" roughness={1} />
      </mesh>

      {/* Fallen structural beam */}
      <mesh
        position={[-0.3, 0.18, -4.8]}
        rotation={[0.04, 0.3, 0.12]}
        castShadow
      >
        <boxGeometry args={[1.3, 0.12, 0.18]} />
        <MetalMaterial color="#3d403b" metalness={0.55} roughness={0.95} />
      </mesh>

      {/* Small concrete fragments */}
      {Array.from({ length: 30 }, (_, i) => (
        <mesh
          key={`fragment-${i}`}
          position={[
            (Math.random() - 0.5) * 4,
            0.025 + Math.random() * 0.04,
            -8 + Math.random() * 15,
          ]}
          rotation={[
            Math.random() * 2,
            Math.random() * 2,
            Math.random() * 2,
          ]}
          scale={[
            0.025 + Math.random() * 0.08,
            0.02 + Math.random() * 0.05,
            0.025 + Math.random() * 0.08,
          ]}
          castShadow
        >
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#56534c"
            roughness={1}
            flatShading
          />
        </mesh>
      ))}
    </group>
  );
}

/* --------------------------------
   DUST PARTICLES
-------------------------------- */

function createDustTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;

  const ctx = canvas.getContext("2d");

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);

  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.25, "rgba(255,255,255,0.8)");
  gradient.addColorStop(0.65, "rgba(255,255,255,0.18)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  return new THREE.CanvasTexture(canvas);
}

function DustParticles() {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const values = new Float32Array(450 * 3);

    for (let i = 0; i < 450; i++) {
      values[i * 3] = (Math.random() - 0.5) * 4;
      values[i * 3 + 1] = Math.random() * 4;
      values[i * 3 + 2] = -9 + Math.random() * 18;
    }

    return values;
  }, []);

  const dustTexture = useMemo(() => createDustTexture(), []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.006;
      pointsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.035;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={450}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        map={dustTexture}
        color="#d4cdbb"
        size={0.04}
        transparent
        opacity={0.3}
        alphaTest={0.01}
        sizeAttenuation
        depthWrite={false}
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
    target.position.set(0, 1.6, -9.7);
    return target;
  }, []);

  return (
    <>
      <ambientLight intensity={0.32} color="#a9a69d" />

      <hemisphereLight
        skyColor="#a9a9a4"
        groundColor="#242321"
        intensity={0.35}
      />

      {/* Main overhead light */}
      <pointLight
        position={[0, 4.1, 1.8]}
        intensity={38}
        distance={11}
        decay={2}
        color="#d8d1bd"
        castShadow
      />

      {/* Mid-corridor illumination */}
      <pointLight
        position={[0, 3.2, -5]}
        intensity={24}
        distance={8}
        decay={2}
        color="#a9aaa5"
      />

      {/* Door illumination */}
      <pointLight
        position={[0, 3.5, -9.2]}
        intensity={16}
        distance={4}
        color="#d4c9ad"
      />

      <primitive object={spotlightTarget} />

      <spotLight
        position={[-1.8, 3.8, 4]}
        target={spotlightTarget}
        intensity={18}
        angle={0.65}
        penumbra={0.9}
        distance={18}
        color="#b9b6a9"
      />

      <spotLight
        position={[0, 3.7, -7.2]}
        target={spotlightTarget}
        intensity={35}
        angle={0.48}
        penumbra={0.9}
        distance={9}
        color="#d5cbb5"
      />

      {/* Subtle floor bounce */}
      <pointLight
        position={[0, 0.35, -4]}
        intensity={3}
        distance={6}
        color="#777568"
      />
    </>
  );
}

/* --------------------------------
   CINEMATIC CAMERA
-------------------------------- */

function CameraRig({ started, onArrive }) {
  const elapsed = useRef(0);
  const completed = useRef(false);
  const notified = useRef(false);

  const startPosition = useMemo(
    () => new THREE.Vector3(0, 1.7, 6.5),
    []
  );

  const endPosition = useMemo(
    () => new THREE.Vector3(0, 1.7, -6.3),
    []
  );

  const duration = 9;

  useFrame((state, delta) => {
    const camera = state.camera;

    if (!started || completed.current) return;

    elapsed.current += Math.min(delta, 0.05);

    const progress = Math.min(elapsed.current / duration, 1);

    const eased = THREE.MathUtils.smoothstep(progress, 0, 1);

    camera.position.lerpVectors(startPosition, endPosition, eased);

    const walkingStrength = Math.sin(progress * Math.PI);

    const bob =
      Math.sin(elapsed.current * 8) *
      0.018 *
      walkingStrength;

    const sway =
      Math.sin(elapsed.current * 4) *
      0.009 *
      walkingStrength;

    camera.position.y += bob;
    camera.position.x += sway;

    camera.lookAt(0, 1.6, -9.7);

    if (progress >= 1) {
      completed.current = true;

      camera.position.copy(endPosition);
      camera.lookAt(0, 1.6, -9.7);

      if (!notified.current) {
        notified.current = true;
        onArrive();
      }
    }
  });

  return null;
}

/* --------------------------------
   SCENE
-------------------------------- */

function Scene({ started, onArrive }) {
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

      <CameraRig started={started} onArrive={onArrive} />
    </>
  );
}

/* --------------------------------
   PREVIEW PAGE
-------------------------------- */

export default function IntroPreview() {
  const [started, setStarted] = useState(false);
  const [arrived, setArrived] = useState(false);

  return (
    <div className="intro-preview">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{
          position: [0, 1.7, 6.5],
          fov: 60,
          near: 0.1,
          far: 50,
        }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
      >
        <Scene
          started={started}
          onArrive={() => setArrived(true)}
        />
      </Canvas>

      {/* Top labels */}
      <div className="intro-preview-top">
        <span>ENVIRONMENT STUDY / 002</span>
        <span>THE THRESHOLD</span>
      </div>

      {/* Initial interaction */}
      {!started && (
        <div className="intro-start-screen">
          <div className="intro-start-content">
            <span className="intro-eyebrow">
              AN INTRODUCTION
            </span>

            <h1>
              Every story
              <br />
              begins somewhere.
            </h1>

            <p>Some doors are worth opening.</p>

            <button
              className="intro-start-button"
              onClick={() => setStarted(true)}
            >
              <span>CLICK TO BEGIN</span>
              <span className="intro-button-arrow">→</span>
            </button>
          </div>
        </div>
      )}

      {/* Arrival message */}
      {arrived && (
        <div className="intro-arrival">
          <span>YOU'VE MADE IT THIS FAR.</span>
          <p>Some doors are harder to open.</p>
        </div>
      )}

      {/* Bottom label */}
      <div className="intro-preview-bottom">
        {arrived
          ? "STAGE 02 — THE THRESHOLD"
          : "STAGE 01 — INDUSTRIAL CORRIDOR"}
      </div>
    </div>
  );
}
