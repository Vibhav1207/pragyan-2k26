import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface SdgbadgeCanvasProps {
  onMarkerClick?: () => void;
}

export const SdgbadgeCanvas: React.FC<SdgbadgeCanvasProps> = ({ onMarkerClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Main Neo-Brutalist 3D Innovation Prism
    const group = new THREE.Group();
    scene.add(group);

    // Core Octahedron / Cube mesh
    const geo = new THREE.OctahedronGeometry(2, 0);
    const mat = new THREE.MeshBasicMaterial({
      color: 0xFC3D21,
      wireframe: true,
      wireframeLinewidth: 2,
    });
    const mesh = new THREE.Mesh(geo, mat);
    group.add(mesh);

    // Inner Solid Cube
    const innerGeo = new THREE.BoxGeometry(1.6, 1.6, 1.6);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xFFD600,
      wireframe: false,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerMesh);

    // Outer Orbiting Rings
    const ringGeo = new THREE.TorusGeometry(3.2, 0.04, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    const ringMesh1 = new THREE.Mesh(ringGeo, ringMat);
    ringMesh1.rotation.x = Math.PI / 4;
    group.add(ringMesh1);

    const ringMesh2 = new THREE.Mesh(ringGeo, ringMat);
    ringMesh2.rotation.y = Math.PI / 3;
    group.add(ringMesh2);

    // Ambient particles
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 12;
      positions[i + 1] = (Math.random() - 0.5) * 12;
      positions[i + 2] = (Math.random() - 0.5) * 12;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xFFD600,
      size: 0.08,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      group.rotation.x += 0.005;
      group.rotation.y += 0.008;
      innerMesh.rotation.x -= 0.01;
      innerMesh.rotation.y -= 0.01;
      particleSystem.rotation.y += 0.002;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={onMarkerClick}
      className="w-full h-full cursor-pointer relative"
    />
  );
};

export const EarthCanvas = SdgbadgeCanvas;
