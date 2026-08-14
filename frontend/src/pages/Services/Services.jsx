import React, { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Line } from "@react-three/drei";

const SERVICES = [
  {
    id: "auth",
    name: "Authentication",
    position: [-3, 1.5, 0],
    issues: 4,
    risk: 0.25,
  },
  {
    id: "api",
    name: "Core API",
    position: [0, 0, 0],
    issues: 8,
    risk: 0.7,
  },
  {
    id: "ai",
    name: "AI Engine",
    position: [3, 1.5, 0],
    issues: 6,
    risk: 0.55,
  },
  {
    id: "database",
    name: "Database",
    position: [0, -2.5, 0],
    issues: 3,
    risk: 0.2,
  },
  {
    id: "notifications",
    name: "Notifications",
    position: [3, -2, 1.5],
    issues: 5,
    risk: 0.85,
  },
];

const DEPENDENCIES = [
  ["auth", "api"],
  ["api", "ai"],
  ["api", "database"],
  ["api", "notifications"],
  ["ai", "database"],
];

function getService(id) {
  return SERVICES.find((service) => service.id === id);
}

function getRiskLabel(risk) {
  if (risk >= 0.75) return "HIGH";
  if (risk >= 0.5) return "MEDIUM";
  return "LOW";
}

function Serices({ service, selected, onSelect }) {
  const scale = 0.7 + service.issues * 0.08;

  return (
    <group
      position={service.position}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(service);
      }}
    >
      <mesh scale={selected ? scale * 1.2 : scale}>
        <sphereGeometry args={[0.65, 32, 32]} />

        <meshStandardMaterial
          color={
            service.risk >= 0.75
              ? "#ff1744"
              : service.risk >= 0.5
              ? "#ff9800"
              : "#00e5ff"
          }
          emissive={
            service.risk >= 0.75
              ? "#ff1744"
              : service.risk >= 0.5
              ? "#ff9800"
              : "#00e5ff"
          }
          emissiveIntensity={selected ? 2.5 : 0.8}
          roughness={0.25}
          metalness={0.7}
        />
      </mesh>

      <Text
        position={[0, -1.15, 0]}
        fontSize={0.28}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {service.name}
      </Text>

      <Text
        position={[0, 0, 0.72]}
        fontSize={0.22}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {service.issues} issues
      </Text>
    </group>
  );
}

function DependencyLines() {
  return (
    <>
      {DEPENDENCIES.map(([sourceId, targetId]) => {
        const source = getService(sourceId);
        const target = getService(targetId);

        return (
          <Line
            key={`${sourceId}-${targetId}`}
            points={[source.position, target.position]}
            color="#64748b"
            lineWidth={1}
            transparent
            opacity={0.55}
          />
        );
      })}
    </>
  );
}

function Scene({ selected, setSelected }) {
  return (
    <>
      <ambientLight intensity={0.5} />

      <directionalLight
        position={[5, 8, 5]}
        intensity={2}
      />

      <pointLight
        position={[0, 0, 5]}
        intensity={20}
        distance={15}
      />

      <DependencyLines />

      {SERVICES.map((service) => (
        <ServiceNode
          key={service.id}
          service={service}
          selected={selected?.id === service.id}
          onSelect={setSelected}
        />
      ))}

      <gridHelper
        args={[20, 20, "#334155", "#111827"]}
        position={[0, -4, 0]}
      />

      <OrbitControls
        enableDamping
        dampingFactor={0.08}
        minDistance={5}
        maxDistance={20}
      />
    </>
  );
}

export default function ServiceMap3D() {
  const [selected, setSelected] = useState(null);

  return (
    <div
      style={{
        width: "100%",
        height: "650px",
        position: "relative",
        background:
          "radial-gradient(circle at center, #111827 0%, #020617 70%)",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      <Canvas
        camera={{
          position: [7, 5, 10],
          fov: 45,
        }}
        dpr={[1, 2]}
      >
        <Scene
          selected={selected}
          setSelected={setSelected}
        />
      </Canvas>

      {/* Information panel */}
      {selected && (
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            width: 260,
            padding: 20,
            borderRadius: 14,
            background: "rgba(15, 23, 42, 0.92)",
            border: "1px solid rgba(148, 163, 184, 0.25)",
            color: "white",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            style={{
              fontSize: 13,
              color: "#94a3b8",
              marginBottom: 6,
            }}
          >
            SERVICE
          </div>

          <h2
            style={{
              margin: "0 0 16px",
              fontSize: 20,
            }}
          >
            {selected.name}
          </h2>

          <div style={{ marginBottom: 12 }}>
            <span style={{ color: "#94a3b8" }}>
              Open issues
            </span>

            <strong
              style={{
                display: "block",
                fontSize: 24,
              }}
            >
              {selected.issues}
            </strong>
          </div>

          <div>
            <span style={{ color: "#94a3b8" }}>
              Risk
            </span>

            <strong
              style={{
                display: "block",
                fontSize: 18,
              }}
            >
              {getRiskLabel(selected.risk)}
            </strong>
          </div>
        </div>
      )}

      {!selected && (
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            padding: "10px 14px",
            borderRadius: 10,
            background: "rgba(15, 23, 42, 0.8)",
            color: "#cbd5e1",
            fontSize: 13,
          }}
        >
          Click a service to inspect it
        </div>
      )}
    </div>
  );
}