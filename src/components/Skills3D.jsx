import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import { useRef } from 'react';

function SkillBadge({ text, position, color, delay }) {
  const badgeRef = useRef();

  useFrame((state) => {
    if (badgeRef.current) {
      badgeRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() + delay) * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={badgeRef} position={position}>
        <mesh>
          <boxGeometry args={[2, 0.6, 0.1]} />
          <meshStandardMaterial color={color} transparent opacity={0.8} roughness={0.3} metalness={0.7} />
        </mesh>
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.25}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
        >
          {text}
        </Text>
      </group>
    </Float>
  );
}

export default function Skills3D() {
  const skills = [
    { name: 'C', pos: [-3, 2, 0], color: '#3B82F6', delay: 0 },
    { name: 'C++', pos: [3, 2, 0], color: '#8B5CF6', delay: 0.5 },
    { name: 'React', pos: [-2, 0, 1], color: '#06B6D4', delay: 1 },
    { name: 'JavaScript', pos: [2, 0, 1], color: '#F59E0B', delay: 1.5 },
    { name: 'HTML/CSS', pos: [-3, -2, 0], color: '#EC4899', delay: 2 },
    { name: 'Tailwind', pos: [3, -2, 0], color: '#10B981', delay: 2.5 },
    { name: 'Git', pos: [0, 1.5, -1], color: '#F97316', delay: 0.8 },
    { name: 'DSA', pos: [0, -1.5, -1], color: '#6366F1', delay: 1.3 },
  ];

  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      {skills.map((skill, index) => (
        <SkillBadge
          key={skill.name}
          text={skill.name}
          position={skill.pos}
          color={skill.color}
          delay={skill.delay}
        />
      ))}
    </Canvas>
  );
}
