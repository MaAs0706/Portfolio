
import React, { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ================================================
   1. PROCEDURAL TEXTURES
================================================ */

function createConcreteTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;

  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#77746c";
  ctx.fillRect(0, 0, 1024, 1024);

  // Concrete grain
  for (let i = 0; i < 50000; i++) {
    const shade = Math.random() > 0.5 ? 255 : 0;
    const alpha = Math.random() * 0.09;

    ctx.fillStyle = `rgba(${shade},${shade},${shade},${alpha})`;
    ctx.fillRect(
      Math.random() * 1024,
      Math.random() * 1024,
      1 + Math.random() * 2,
      1 + Math.random() * 2
    );
  }

  // Water stains
  for (let i = 0; i < 90; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const radius = 20 + Math.random() * 110;

    const gradient = ctx.createRadialGradient(
      x, y, 1, x, y, radius
    );

    gradient.addColorStop(0, "rgba(20,19,17,0.24)");
    gradient.addColorStop(0.5, "rgba(30,29,27,0.10)");
    gradient.addColorStop(1, "rgba(20,19,17,0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // Water runoff
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
    const shade = Math.random() > 0.5 ? 255 : 0;

    ctx.fillStyle = `rgba(${shade},${shade},${shade},${Math.random() * 0.07})`;
    ctx.fillRect(
      Math.random() * 512,
      Math.random() * 512,
      1 + Math.random() * 18,
      1
    );
  }

  // Scratches
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(
      x + (Math.random() - 0.5) * 35,
      y + (Math.random() - 0.5) * 8
    );

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

/* ================================================
   2. MATERIALS
================================================ */

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

/* ================================================
   3. CORRIDOR STRUCTURE
================================================ */

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

      {/* Damp patches */}
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

/* ================================================
   4. INTERACTIVE INDUSTRIAL DOOR
================================================ */

function IndustrialDoor({
  arrived,
  doorOpened,
  onHandleClick,
  onDoorOpenComplete,
}) {
  const doorLeaf = useRef();
  const [hovered, setHovered] = useState(false);
  const notified = useRef(false);

  useFrame((_, delta) => {
    if (!doorLeaf.current) return;

    const targetAngle = doorOpened ? 1.32 : 0;

    doorLeaf.current.rotation.y = THREE.MathUtils.damp(
      doorLeaf.current.rotation.y,
      targetAngle,
      doorOpened ? 1.15 : 5,
      delta
    );

    // Notify only when the door has physically opened.
    if (
      doorOpened &&
      !notified.current &&
      Math.abs(doorLeaf.current.rotation.y - targetAngle) < 0.025
    ) {
      notified.current = true;
      onDoorOpenComplete();
    }
  });

  const handlePointerOver = (event) => {
    event.stopPropagation();

    if (!arrived || doorOpened) return;

    setHovered(true);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = "auto";
  };

  const handleClick = (event) => {
    event.stopPropagation();

    if (!arrived || doorOpened) return;

    setHovered(false);
    document.body.style.cursor = "auto";
    onHandleClick();
  };

  return (
    <group position={[0, 0, -9.93]}>
      {/* STATIC FRAME */}
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

      {/* MOVING DOOR LEAF — LEFT HINGE PIVOT */}
      <group ref={doorLeaf} position={[-1.06, 0, 0]}>
        <group position={[1.06, 0, 0]}>
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

          {/* Inset panels */}
          {[-0.68, 0, 0.68].map((x) => (
            <mesh key={x} position={[x, 1.65, 0.119]}>
              <boxGeometry args={[0.55, 2.68, 0.025]} />
              <MetalMaterial
                color="#343a34"
                metalness={0.55}
                roughness={0.82}
              />
            </mesh>
          ))}

          {/* Panel edges */}
          {[-0.68, 0, 0.68].map((x) => (
            <mesh key={`edge-${x}`} position={[x, 1.65, 0.137]}>
              <boxGeometry args={[0.015, 2.58, 0.006]} />
              <meshStandardMaterial
                color="#858477"
                metalness={0.75}
                roughness={0.7}
              />
            </mesh>
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

          {/* Kick plate */}
          <mesh position={[0, 0.16, 0.15]}>
            <boxGeometry args={[1.98, 0.24, 0.035]} />
            <MetalMaterial color="#292e29" metalness={0.8} />
          </mesh>

          {/* Lock plate */}
          <mesh position={[0.76, 1.45, 0.18]}>
            <boxGeometry args={[0.22, 0.46, 0.055]} />
            <MetalMaterial color="#20241f" metalness={0.85} />
          </mesh>

          {/* Handle mounting plate */}
          <mesh position={[0.76, 1.45, 0.215]}>
            <boxGeometry args={[0.12, 0.3, 0.025]} />
            <MetalMaterial color="#77776c" metalness={0.95} />
          </mesh>

          {/* INTERACTIVE HANDLE */}
          <mesh
            position={[0.76, 1.45, 0.29]}
            rotation={[0, 0, Math.PI / 2]}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            onClick={handleClick}
            castShadow
          >
            <cylinderGeometry args={[0.045, 0.045, 0.34, 24]} />

            <meshStandardMaterial
              color={hovered ? "#e4d6b4" : "#b2aa94"}
              emissive={hovered ? "#77633b" : "#000000"}
              emissiveIntensity={hovered ? 0.45 : 0}
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
        </group>
      </group>
    </group>
  );
}

/* ================================================
   5. EXPOSED PIPES
================================================ */

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

/* ================================================
   6. RUBBLE AND DEBRIS
================================================ */

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
  const fragments = useMemo(
    () =>
      Array.from({ length: 30 }, () => ({
        position: [
          (Math.random() - 0.5) * 4,
          0.025 + Math.random() * 0.04,
          -8 + Math.random() * 15,
        ],
        rotation: [
          Math.random() * 2,
          Math.random() * 2,
          Math.random() * 2,
        ],
        scale: [
          0.025 + Math.random() * 0.08,
          0.02 + Math.random() * 0.05,
          0.025 + Math.random() * 0.08,
        ],
      })),
    []
  );

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

      {/* Broken slab */}
      <mesh
        position={[1.2, 0.12, -2.8]}
        rotation={[0.1, 0.4, -0.08]}
        castShadow
      >
        <boxGeometry args={[0.9, 0.16, 0.55]} />
        <meshStandardMaterial color="#555149" roughness={1} />
      </mesh>

      {/* Fallen beam */}
      <mesh
        position={[-0.3, 0.18, -4.8]}
        rotation={[0.04, 0.3, 0.12]}
        castShadow
      >
        <boxGeometry args={[1.3, 0.12, 0.18]} />
        <MetalMaterial color="#3d403b" metalness={0.55} roughness={0.95} />
      </mesh>

      {/* Small fragments */}
      {fragments.map((fragment, i) => (
        <mesh
          key={`fragment-${i}`}
          position={fragment.position}
          rotation={fragment.rotation}
          scale={fragment.scale}
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

/* ================================================
   7. DUST PARTICLES
================================================ */

function createDustTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;

  const ctx = canvas.getContext("2d");

  const gradient = ctx.createRadialGradient(
    32, 32, 0, 32, 32, 32
  );

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
    if (!pointsRef.current) return;

    pointsRef.current.rotation.y += delta * 0.006;
    pointsRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.25) * 0.035;
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

/* ================================================
   8. LIGHTING
================================================ */

function Lighting({ doorOpened }) {
  const spotlightTarget = useMemo(() => {
    const target = new THREE.Object3D();
    target.position.set(0, 1.6, -9.7);
    return target;
  }, []);

  return (
    <>
      <ambientLight intensity={0.32} color="#a9a69d" />
      <hemisphereLight skyColor="#a9a9a4" groundColor="#242321" intensity={0.35} />
      <pointLight position={[0, 4.1, 1.8]} intensity={38} distance={11} decay={2} color="#d8d1bd" />
      <pointLight position={[0, 3.2, -5]} intensity={24} distance={8} decay={2} color="#a9aaa5" />
      <pointLight position={[0, 3.5, -9.2]} intensity={doorOpened ? 24 : 16} distance={doorOpened ? 7 : 4} decay={2} color="#d9cfb9" />
      <primitive object={spotlightTarget} />
      <spotLight position={[-1.8, 3.8, 4]} target={spotlightTarget} intensity={18} angle={0.65} penumbra={0.9} distance={18} color="#b9b6a9" />
      <spotLight position={[0, 3.7, -7.2]} target={spotlightTarget} intensity={24} angle={0.48} penumbra={0.9} distance={7} color="#d5cbb5" />
    </>
  );
}


/* ================================================
   9. GALLERY ARTWORK
================================================ */

const galleryPieces = [
  { side: -1, z: -13.2, title: "THINGS BUILT", subtitle: "PROJECTS / EXPERIMENTS", type: "project" },
  { side: 1, z: -14.8, title: "IN GOOD COMPANY", subtitle: "PEOPLE / COMMUNITIES", type: "people" },
  { side: -1, z: -17.1, title: "THE WORK", subtitle: "IDEAS INTO REALITY", type: "work" },
  { side: 1, z: -18.7, title: "MILESTONES", subtitle: "RECOGNITION / GROWTH", type: "award" },
  { side: -1, z: -21, title: "OUT THERE", subtitle: "HACKATHONS / EVENTS", type: "events" },
  { side: 1, z: -22.6, title: "BEYOND THE SCREEN", subtitle: "WRITING / LIFE", type: "personal" },
  { side: -1, z: -24.2, title: "STILL BECOMING", subtitle: "THE JOURNEY CONTINUES", type: "final" },
];

function createGalleryArtwork(title, subtitle, type) {
  const canvas = document.createElement("canvas");
  canvas.width = 900;
  canvas.height = 650;

  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#171714";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle textured background
  for (let i = 0; i < 12000; i++) {
    const shade = Math.random() > 0.5 ? 255 : 0;
    ctx.fillStyle = `rgba(${shade},${shade},${shade},${Math.random() * 0.035})`;
    ctx.fillRect(Math.random() * 900, Math.random() * 650, 2, 2);
  }

  // Abstract exhibition artwork
  const palettes = {
    project: ["#555b53", "#252a25", "#9b927e"],
    people: ["#756e62", "#35342f", "#a39b8b"],
    work: ["#454b48", "#242724", "#858a7d"],
    award: ["#786e5d", "#302c26", "#b4a78d"],
    events: ["#5c5148", "#292724", "#a18c73"],
    personal: ["#514c50", "#292629", "#a59a9a"],
    final: ["#55564e", "#272923", "#aaa38f"],
  };

  const colors = palettes[type] || palettes.project;

  const gradient = ctx.createLinearGradient(0, 0, 900, 650);
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(0.55, colors[1]);
  gradient.addColorStop(1, colors[2]);

  ctx.fillStyle = gradient;
  ctx.fillRect(55, 55, 790, 440);

  // Abstract architectural composition
  ctx.globalAlpha = 0.55;
  ctx.fillStyle = "#11120f";
  ctx.fillRect(115, 105, 220, 320);
  ctx.fillRect(370, 175, 360, 250);

  ctx.strokeStyle = "#c4b99f";
  ctx.lineWidth = 2;
  ctx.strokeRect(390, 195, 320, 210);

  ctx.globalAlpha = 0.3;
  ctx.beginPath();
  ctx.arc(590, 290, 90, 0, Math.PI * 2);
  ctx.stroke();

  ctx.globalAlpha = 1;

  // Exhibition typography
  ctx.fillStyle = "#e6e0d2";
  ctx.font = "500 25px Arial";
  ctx.fillText(title, 65, 550);

  ctx.fillStyle = "#aaa69a";
  ctx.font = "16px monospace";
  ctx.fillText(subtitle, 65, 585);

  ctx.fillStyle = "#77776e";
  ctx.font = "13px monospace";
  ctx.fillText("A.M. / PERSONAL ARCHIVE", 65, 620);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;

  return texture;
}

function GalleryFrame({ piece }) {
  const texture = useMemo(
    () => createGalleryArtwork(piece.title, piece.subtitle, piece.type),
    [piece.title, piece.subtitle, piece.type]
  );

  const isLeft = piece.side === -1;

  return (
    <group
      position={[isLeft ? -5.78 : 5.78, 2.25, piece.z]}
      rotation={[0, isLeft ? Math.PI / 2 : -Math.PI / 2, 0]}
    >
      {/* Dark outer frame */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.25, 1.85, 0.12]} />
        <meshStandardMaterial
          color="#171815"
          roughness={0.48}
          metalness={0.32}
        />
      </mesh>

      {/* Inner border */}
      <mesh position={[0, 0, 0.071]}>
        <boxGeometry args={[2.08, 1.68, 0.025]} />
        <meshStandardMaterial color="#77766b" metalness={0.65} roughness={0.55} />
      </mesh>

      {/* Artwork */}
      <mesh position={[0, 0, 0.09]}>
        <planeGeometry args={[1.98, 1.58]} />
        <meshStandardMaterial
          map={texture}
          emissive="#8b8068"
          emissiveMap={texture}
          emissiveIntensity={0.32}
          roughness={0.92}
          metalness={0}
        />
      </mesh>

      {/* Small plaque */}
      <mesh position={[0, -1.08, 0.035]}>
        <boxGeometry args={[1.6, 0.18, 0.035]} />
        <meshStandardMaterial color="#292923" roughness={0.8} />
      </mesh>

      {/* Soft local illumination keeps each exhibit readable without washing out the room. */}
      <pointLight
        position={[0, 0.58, 0.62]}
        intensity={2.2}
        distance={3.2}
        decay={2}
        color="#d8c9a9"
      />
      <pointLight
        position={[0, -0.42, 0.48]}
        intensity={0.65}
        distance={1.8}
        decay={2}
        color="#a99a7b"
      />
    </group>
  );
}

/* ================================================
   10. GALLERY ROOM
================================================ */

function GalleryRoom() {
  return (
    <group>
      {/* Dark polished floor */}
      <mesh position={[0, -0.2, -18]} receiveShadow>
        <boxGeometry args={[12, 0.4, 17]} />
        <meshStandardMaterial
          color="#242420"
          roughness={0.68}
          metalness={0.06}
        />
      </mesh>

      {/* Left wall */}
      <mesh position={[-6, 2.5, -18]} receiveShadow>
        <boxGeometry args={[0.3, 5, 17]} />
        <meshStandardMaterial color="#34332f" roughness={0.95} />
      </mesh>

      {/* Right wall */}
      <mesh position={[6, 2.5, -18]} receiveShadow>
        <boxGeometry args={[0.3, 5, 17]} />
        <meshStandardMaterial color="#34332f" roughness={0.95} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 5, -18]}>
        <boxGeometry args={[12, 0.3, 17]} />
        <meshStandardMaterial color="#22221f" roughness={0.95} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 2.5, -26.5]}>
        <boxGeometry args={[12, 5, 0.3]} />
        <meshStandardMaterial color="#292925" roughness={0.95} />
      </mesh>

      {/* Structural ceiling beams */}
      {[-12, -16, -20, -24].map((z) => (
        <mesh key={z} position={[0, 4.72, z]}>
          <boxGeometry args={[11.8, 0.18, 0.25]} />
          <meshStandardMaterial color="#1c1d19" metalness={0.3} />
        </mesh>
      ))}

      {/* Gallery frames */}
      {galleryPieces.map((piece, index) => (
        <GalleryFrame key={`${piece.type}-${index}`} piece={piece} />
      ))}

      {/* Low-output architectural lights along the gallery edges. */}
      {[-14, -18, -22].map((z) => (
        <group key={z}>
          <pointLight
            position={[-4.7, 4.25, z]}
            intensity={2.2}
            distance={4.5}
            decay={2}
            color="#b9aa8d"
          />
          <pointLight
            position={[4.7, 4.25, z + 0.8]}
            intensity={2.2}
            distance={4.5}
            decay={2}
            color="#b9aa8d"
          />
        </group>
      ))}
    </group>
  );
}

/* ================================================
   11. CAMERA RIG
================================================ */

function CameraRig({
  started,
  doorReady,
  onArrive,
  onExit,
  onGalleryComplete,
  onFootstep,
}) {
  const elapsed = useRef(0);
  const lastFootstep = useRef(-1);
  const completed = useRef(false);
  const notified = useRef(false);

  const exitElapsed = useRef(0);
  const exitCompleted = useRef(false);

  const galleryElapsed = useRef(0);
  const galleryCompleted = useRef(false);
  const galleryNotified = useRef(false);

  const startPosition = useMemo(
    () => new THREE.Vector3(0, 1.7, 6.5),
    []
  );

  const endPosition = useMemo(
    () => new THREE.Vector3(0, 1.7, -6.3),
    []
  );

  const interiorPosition = useMemo(
    () => new THREE.Vector3(0, 1.7, -15.5),
    []
  );

  const galleryEnd = useMemo(
    () => new THREE.Vector3(0, 1.7, -24.8),
    []
  );

  const lookTarget = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const camera = state.camera;
    const safeDelta = Math.min(delta, 0.05);

    // FIRST: Walk through the industrial corridor
    if (started && !completed.current) {
      elapsed.current += safeDelta;

      const progress = Math.min(elapsed.current / 9, 1);
      const eased = THREE.MathUtils.smoothstep(progress, 0, 1);

      camera.position.lerpVectors(startPosition, endPosition, eased);

      const walkingStrength = Math.sin(progress * Math.PI);
      const gaitPhase = elapsed.current * ((Math.PI * 2) / 0.96);

      // First-person head movement: vertical bounce, weight transfer and body roll.
      camera.position.y += Math.sin(gaitPhase * 2) * 0.038 * walkingStrength;
      camera.position.x += Math.sin(gaitPhase) * 0.024 * walkingStrength;
      camera.position.z += Math.cos(gaitPhase) * 0.012 * walkingStrength;

      // Alternate footsteps at a natural walking cadence.
      const stepIndex = Math.floor(elapsed.current / 0.48);
      if (stepIndex !== lastFootstep.current && progress < 1) {
        lastFootstep.current = stepIndex;
        onFootstep?.(stepIndex % 2 === 0 ? "left" : "right", 0.9);
      }

      camera.lookAt(0, 1.6, -9.7);
      camera.rotation.z += Math.sin(gaitPhase) * 0.009 * walkingStrength;

      if (progress >= 1) {
        completed.current = true;
        camera.position.copy(endPosition);
        camera.lookAt(0, 1.6, -9.7);

        if (!notified.current) {
          notified.current = true;
          onArrive();
        }
      }

      return;
    }

    // SECOND: Move through the open doorway
    if (
      doorReady &&
      completed.current &&
      !exitCompleted.current
    ) {
      exitElapsed.current += safeDelta;

      const progress = Math.min(exitElapsed.current / 5, 1);
      const eased = THREE.MathUtils.smoothstep(progress, 0, 1);

      camera.position.lerpVectors(
        endPosition,
        interiorPosition,
        eased
      );

      lookTarget.set(
        0,
        1.7,
        THREE.MathUtils.lerp(-9.7, -21, eased)
      );

      camera.lookAt(lookTarget);

      if (progress >= 1) {
        exitCompleted.current = true;
        camera.position.copy(interiorPosition);
        camera.lookAt(0, 1.7, -21);
        onExit();
      }

      return;
    }

    // THIRD: Slowly explore the gallery
    if (
      exitCompleted.current &&
      !galleryCompleted.current
    ) {
      galleryElapsed.current += safeDelta;

      const progress = Math.min(galleryElapsed.current / 11, 1);
      const eased = THREE.MathUtils.smoothstep(progress, 0, 1);

      camera.position.lerpVectors(
        interiorPosition,
        galleryEnd,
        eased
      );

      // A slower, softer walking rhythm through the gallery.
      const galleryPhase = galleryElapsed.current * ((Math.PI * 2) / 1.08);
      const gallerySway = Math.sin(progress * Math.PI * 4) * 0.7;
      camera.position.x = gallerySway + Math.sin(galleryPhase) * 0.014;
      camera.position.y += Math.sin(galleryPhase * 2) * 0.018;

      const galleryStepIndex = Math.floor(galleryElapsed.current / 0.54);
      if (galleryStepIndex !== lastFootstep.current && progress < 1) {
        lastFootstep.current = galleryStepIndex;
        onFootstep?.(galleryStepIndex % 2 === 0 ? "left" : "right", 0.48);
      }

      // Alternate attention between the two gallery walls
      const viewingSide = Math.sin(progress * Math.PI * 4) * 2.2;

      lookTarget.set(
        viewingSide,
        2,
        THREE.MathUtils.lerp(-17, -25, eased)
      );

      camera.lookAt(lookTarget);

      if (progress >= 1) {
        galleryCompleted.current = true;
        camera.position.copy(galleryEnd);
        camera.lookAt(0, 1.7, -26);

        if (!galleryNotified.current) {
          galleryNotified.current = true;
          onGalleryComplete();
        }
      }

      return;
    }

    if (completed.current && !doorReady) {
      camera.lookAt(0, 1.6, -9.7);
    }
  });

  return null;
}

/* ================================================
   12. LIGHTING
================================================ */

function InteriorLighting() {
  return (
    <>
      <ambientLight intensity={0.3} color="#b8b0a0" />
      <hemisphereLight
        skyColor="#77766e"
        groundColor="#171713"
        intensity={0.24}
      />
      <directionalLight
        position={[-3, 5, -16]}
        intensity={0.22}
        color="#d2c5aa"
      />
    </>
  );
}

/* ================================================
   13. COMPLETE SCENE
================================================ */

function Scene({
  started,
  arrived,
  doorOpened,
  doorReady,
  onArrive,
  onExit,
  onDoorClick,
  onDoorOpenComplete,
  onGalleryComplete,
  onFootstep,
}) {
  return (
    <>
      <color attach="background" args={["#11110f"]} />

      <fog attach="fog" args={["#11110f", 13, 37]} />

      <Lighting doorOpened={doorOpened} />

      <CorridorStructure />
      <Pipes />

      <IndustrialDoor
        arrived={arrived}
        doorOpened={doorOpened}
        onHandleClick={onDoorClick}
        onDoorOpenComplete={onDoorOpenComplete}
      />

      <Rubble />

      <GalleryRoom />
      <InteriorLighting />

      <DustParticles />

      <CameraRig
        started={started}
        doorReady={doorReady}
        onArrive={onArrive}
        onExit={onExit}
        onGalleryComplete={onGalleryComplete}
        onFootstep={onFootstep}
      />
    </>
  );
}

/* ================================================
   14. INTRO EXPERIENCE
================================================ */

export default function IntroPreview() {
  const [started, setStarted] = useState(false);
  const [arrived, setArrived] = useState(false);
  const [doorOpened, setDoorOpened] = useState(false);
  const [doorReady, setDoorReady] = useState(false);
  const [entered, setEntered] = useState(false);
  const [blackout, setBlackout] = useState(false);
  const audioContextRef = useRef(null);
  const introVoiceRef = useRef(null);

  // Audio is initialized by the visitor's click to satisfy browser autoplay rules.
  // Add your supplied "Ah, shit. Here we go again." recording at:
  // public/audio/intro-voice.mp3
  const startExperience = () => {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass && !audioContextRef.current) {
      audioContextRef.current = new AudioContextClass();
    }
    if (audioContextRef.current?.state === "suspended") {
      audioContextRef.current.resume();
    }

    // The audio file is optional until you provide it. The intro still works without it.
    if (introVoiceRef.current) {
      introVoiceRef.current.currentTime = 0;
      introVoiceRef.current.play().catch(() => {});
    }

    setStarted(true);
  };

  // Procedural concrete footsteps: filtered grit + a short low-frequency impact.
  const playFootstep = (foot = "left", volume = 0.8) => {
    const context = audioContextRef.current;
    if (!context || context.state !== "running") return;

    const now = context.currentTime;
    const duration = 0.19;
    const bufferSize = Math.floor(context.sampleRate * duration);
    const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
    const samples = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      samples[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2.2);
    }

    const noise = context.createBufferSource();
    noise.buffer = buffer;
    const filter = context.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(foot === "left" ? 720 : 590, now);
    filter.frequency.exponentialRampToValueAtTime(180, now + duration);
    const noiseGain = context.createGain();
    noiseGain.gain.setValueAtTime(0.0001, now);
    noiseGain.gain.exponentialRampToValueAtTime((foot === "left" ? 0.105 : 0.09) * volume, now + 0.012);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(context.destination);
    noise.start(now);
    noise.stop(now + duration);

    const thud = context.createOscillator();
    const thudGain = context.createGain();
    thud.type = "sine";
    thud.frequency.setValueAtTime(foot === "left" ? 92 : 82, now);
    thud.frequency.exponentialRampToValueAtTime(48, now + 0.11);
    thudGain.gain.setValueAtTime(0.0001, now);
    thudGain.gain.exponentialRampToValueAtTime(0.16 * volume, now + 0.008);
    thudGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.13);
    thud.connect(thudGain);
    thudGain.connect(context.destination);
    thud.start(now);
    thud.stop(now + 0.14);
  };

  return (
    <div className={`intro-preview ${blackout ? "intro-blackout" : ""}`}>
      <audio
        ref={introVoiceRef}
        src="/audio/intro-voice.mp3"
        preload="auto"
      />
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{
          position: [0, 1.7, 6.5],
          fov: 60,
          near: 0.1,
          far: 60,
        }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 0.85;
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
      >
        <Scene
          started={started}
          arrived={arrived}
          doorOpened={doorOpened}
          doorReady={doorReady}
          onArrive={() => setArrived(true)}
          onDoorClick={() => setDoorOpened(true)}
          onDoorOpenComplete={() => setDoorReady(true)}
          onExit={() => setEntered(true)}
          onFootstep={playFootstep}
          onGalleryComplete={() => {
            setBlackout(true);
            setTimeout(() => {
              window.location.assign("/");
            }, 2200);
          }}
        />
      </Canvas>

      <div className="intro-preview-top">
        <span>ENVIRONMENT STUDY / 004</span>
        <span>THE ARCHIVE</span>
      </div>

      {!started && (
        <div className="intro-start-screen">
          <div className="intro-start-content">
            <span className="intro-eyebrow">AN INTRODUCTION</span>

            <h1>
              Every story
              <br />
              begins somewhere.
            </h1>

            <p>Some doors are worth opening.</p>

            <button
              className="intro-start-button"
              onClick={startExperience}
            >
              <span>CLICK TO BEGIN</span>
              <span className="intro-button-arrow">→</span>
            </button>
          </div>
        </div>
      )}

      {arrived && !doorOpened && (
        <div className="intro-arrival">
          <span>YOU'VE MADE IT THIS FAR.</span>
          <p>Reach for the handle.</p>
        </div>
      )}

      {doorOpened && !doorReady && !entered && (
        <div className="intro-arrival">
          <span>THE WAY IS OPEN.</span>
          <p>There's more on the other side.</p>
        </div>
      )}

      {entered && !blackout && (
        <div className="intro-arrival">
          <span>THE ARCHIVE.</span>
          <p>A few things along the way.</p>
        </div>
      )}

      {blackout && (
        <div className="intro-blackout-message">
          <span>ASWANTH MADHAV</span>
        </div>
      )}

      <div className="intro-preview-bottom">
        {blackout
          ? "THE END OF THE INTRODUCTION"
          : entered
          ? "STAGE 04 — THE ARCHIVE"
          : doorReady && !entered
          ? "STAGE 03 — THE PASSAGE"
          : arrived
          ? "STAGE 02 — THE THRESHOLD"
          : "STAGE 01 — INDUSTRIAL CORRIDOR"}
      </div>
    </div>
  );
}


/* ================================================
   12. INTRO EXPERIENCE
================================================ */
