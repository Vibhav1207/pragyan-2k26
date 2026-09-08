import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface SpacecraftCanvasProps {
  scrollProgress?: number;
  className?: string;
}

export const SpacecraftCanvas: React.FC<SpacecraftCanvasProps> = ({ scrollProgress = 0, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const craftRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);
    craftRef.current = group;

    // Neo-Brutalist Gear / Innovation Core
    const bodyGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0xFC3D21,
      roughness: 0.1,
      metalness: 0.2,
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    group.add(body);

    const ringGeo = new THREE.TorusGeometry(1.8, 0.08, 16, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xFFD600, wireframe: true });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    group.add(ring);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
    sunLight.position.set(5, 5, 5);
    scene.add(sunLight);

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();
      group.rotation.y = time * 0.5 + scrollProgress * Math.PI;
      group.rotation.x = Math.sin(time * 0.8) * 0.2;
      group.position.y = Math.sin(time * 1.2) * 0.1;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      bodyGeo.dispose();
      bodyMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [scrollProgress]);

  return <div ref={containerRef} className={`w-full h-full ${className}`} />;
};
