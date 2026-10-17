"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { LowPowerEarthFallback } from "./LowPowerEarthFallback";

// Convert latitude and longitude to 3D sphere coordinate
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Generate animated 3D Arc between two cities
function FlightArc({
  start,
  end,
  radius,
  color = "#C9A24B",
}: {
  start: [number, number];
  end: [number, number];
  radius: number;
  color?: string;
}) {
  const lineRef = useRef<THREE.Line>(null);

  const { points, curve } = useMemo(() => {
    const vStart = latLngToVector3(start[0], start[1], radius);
    const vEnd = latLngToVector3(end[0], end[1], radius);

    // Calculate arc apex
    const mid = new THREE.Vector3().addVectors(vStart, vEnd).multiplyScalar(0.5);
    const distance = vStart.distanceTo(vEnd);
    const midHeight = radius + distance * 0.28;
    mid.normalize().multiplyScalar(midHeight);

    const qCurve = new THREE.QuadraticBezierCurve3(vStart, mid, vEnd);
    return { points: qCurve.getPoints(50), curve: qCurve };
  }, [start, end, radius]);

  const lineObject = useMemo(() => {
    const geom = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.45,
    });
    return new THREE.Line(geom, mat);
  }, [points, color]);

  // Animated pulse dot traveling along arc
  const pulseRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (pulseRef.current) {
      const t = (clock.getElapsedTime() * 0.35 + (start[0] % 1)) % 1;
      const pos = curve.getPoint(t);
      pulseRef.current.position.copy(pos);
    }
  });

  return (
    <group>
      {/* Arc Line */}
      <primitive object={lineObject} />

      {/* Traveling Jet Pulse */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial color="#FFF1C2" />
      </mesh>
    </group>
  );
}

// Floating Luxury Gold Dust Particles
function GoldDust({ count = 350, radius = 5 }: { count?: number; radius?: number }) {
  const pointsObject = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = radius * (0.8 + Math.random() * 0.8);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(p, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.035,
      color: new THREE.Color("#E6CF8E"),
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
    });
    return new THREE.Points(geom, mat);
  }, [count, radius]);

  useFrame(({ clock }) => {
    if (pointsObject) {
      pointsObject.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  return <primitive object={pointsObject} />;
}

// City Hub Marker
function CityMarker({
  coords,
  name,
  radius,
}: {
  coords: [number, number];
  name: string;
  radius: number;
}) {
  const pos = useMemo(
    () => latLngToVector3(coords[0], coords[1], radius * 1.01),
    [coords, radius]
  );

  return (
    <group position={pos}>
      <mesh>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#C9A24B" />
      </mesh>
      <mesh>
        <ringGeometry args={[0.07, 0.09, 24]} />
        <meshBasicMaterial color="#E6CF8E" side={THREE.DoubleSide} transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

// Earth Globe Mesh with atmospheric rim
function EarthGlobe({ radius = 2.4 }: { radius?: number }) {
  const globeRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0.2, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotation.current.x = 0.2 + normY * 0.25;
      targetRotation.current.y = normX * 0.45;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((_, delta) => {
    if (globeRef.current) {
      // Gentle constant rotation + mouse parallax interpolation
      globeRef.current.rotation.y += delta * 0.12;
      globeRef.current.rotation.x = THREE.MathUtils.lerp(
        globeRef.current.rotation.x,
        targetRotation.current.x,
        0.05
      );
    }
  });

  // Real world luxury flight pairs:
  // Mumbai [19.0760, 72.8777]
  // Zurich / Swiss Alps [47.3769, 8.5417]
  // Dubai [25.2048, 55.2708]
  // Maldives [4.1755, 73.5093]
  // Tokyo [35.6762, 139.6503]
  // New York [40.7128, -74.0060]
  // London [51.5074, -0.1278]
  const routes: Array<{ from: [number, number]; to: [number, number] }> = [
    { from: [19.076, 72.8777], to: [47.3769, 8.5417] }, // Mumbai -> Zurich
    { from: [19.076, 72.8777], to: [25.2048, 55.2708] }, // Mumbai -> Dubai
    { from: [25.2048, 55.2708], to: [4.1755, 73.5093] }, // Dubai -> Maldives
    { from: [51.5074, -0.1278], to: [40.7128, -74.006] }, // London -> NY
    { from: [25.2048, 55.2708], to: [35.6762, 139.6503] }, // Dubai -> Tokyo
    { from: [47.3769, 8.5417], to: [4.1755, 73.5093] }, // Zurich -> Maldives
  ];

  const cities: Array<{ name: string; coords: [number, number] }> = [
    { name: "BOM", coords: [19.076, 72.8777] },
    { name: "ZRH", coords: [47.3769, 8.5417] },
    { name: "DXB", coords: [25.2048, 55.2708] },
    { name: "MLE", coords: [4.1755, 73.5093] },
    { name: "TYO", coords: [35.6762, 139.6503] },
    { name: "NYC", coords: [40.7128, -74.006] },
    { name: "LON", coords: [51.5074, -0.1278] },
  ];

  return (
    <group ref={globeRef}>
      {/* Base Dark Earth Sphere */}
      <mesh>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          color="#0B0F15"
          roughness={0.7}
          metalness={0.25}
          emissive="#040608"
        />
      </mesh>

      {/* Atmospheric Rim Glow */}
      <mesh>
        <sphereGeometry args={[radius * 1.03, 64, 64]} />
        <meshBasicMaterial
          color="#3A7BD5"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[radius * 1.08, 64, 64]} />
        <meshBasicMaterial
          color="#C9A24B"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>

      {/* City Hub Markers */}
      {cities.map((city) => (
        <CityMarker
          key={city.name}
          name={city.name}
          coords={city.coords}
          radius={radius}
        />
      ))}

      {/* Animated Flight Arcs */}
      {routes.map((route, i) => (
        <FlightArc
          key={i}
          start={route.from}
          end={route.to}
          radius={radius}
          color="#C9A24B"
        />
      ))}
    </group>
  );
}

export function EarthCanvas() {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    // WebGL capability check
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL || isReducedMotion) {
    return <LowPowerEarthFallback />;
  }

  return (
    <div className="relative w-full h-[520px] md:h-[680px] lg:h-[780px] cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[6, 4, 5]} intensity={1.5} color="#FFF8E7" />
        <pointLight position={[-6, -4, -3]} intensity={0.6} color="#3A7BD5" />

        <EarthGlobe radius={2.3} />
        <GoldDust count={300} radius={4.5} />
      </Canvas>
    </div>
  );
}
