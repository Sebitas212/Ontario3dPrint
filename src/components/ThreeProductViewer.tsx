import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Eye, Layers, Compass, Sparkles, RefreshCw, ZoomIn, ZoomOut } from 'lucide-react';

interface ThreeProductViewerProps {
  initialColor?: string;
  className?: string;
}

type RenderMode = 'studio' | 'wireframe' | 'slicer' | 'xray';

export const ThreeProductViewer: React.FC<ThreeProductViewerProps> = ({
  initialColor = '#12141A',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [renderMode, setRenderMode] = useState<RenderMode>('studio');
  const [activeColor, setActiveColor] = useState(initialColor);
  const [autoRotate, setAutoRotate] = useState(true);
  const [layerProgress, setLayerProgress] = useState(100); // 0 - 100 for slicer simulation
  const [isInteracting, setIsInteracting] = useState(false);

  // References for Three.js instances
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const materialsRef = useRef<Record<string, THREE.Material>>({});
  const animationFrameId = useRef<number | null>(null);
  const slicePlaneRef = useRef<THREE.Plane | null>(null);

  // Mouse interaction state
  const mouseState = useRef({
    isDown: false,
    prevX: 0,
    prevY: 0,
    targetRotX: 0.15,
    targetRotY: 0.8,
    rotX: 0.15,
    rotY: 0.8,
    distance: 4.8,
    targetDistance: 4.8,
  });

  const availableColors = [
    { name: 'Carbon Black', hex: '#14161C', label: 'PETG-CF' },
    { name: 'Cyber Cyan', hex: '#00D8F6', label: 'Electric' },
    { name: 'Signal Orange', hex: '#F97316', label: 'High-Vis' },
    { name: 'Titanium White', hex: '#E2E8F0', label: 'Glacier' },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera setup
    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 4.8);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.localClippingEnabled = true;
    rendererRef.current = renderer;

    // Clean container and append canvas
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 4. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Key Light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(4, 6, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    // Cyber Rim Light (electric blue/cyan)
    const rimLight = new THREE.DirectionalLight(0x00E5FF, 3.5);
    rimLight.position.set(-4, 3, -3);
    scene.add(rimLight);

    // Soft Warm Fill Light
    const fillLight = new THREE.DirectionalLight(0xFF8844, 1.2);
    fillLight.position.set(2, -2, -2);
    scene.add(fillLight);

    // 5. Build Parametric 3D Model: Sculptural Voronoi Headphone Stand & Base
    const modelGroup = new THREE.Group();
    modelGroupRef.current = modelGroup;

    // Clipping plane for Slicer simulation
    const slicePlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 2.5);
    slicePlaneRef.current = slicePlane;

    // Base plate (Aerodynamic chamfered hexagon)
    const baseGeo = new THREE.CylinderGeometry(1.2, 1.35, 0.14, 32);
    // Upper cradle ring
    const cradleTorus = new THREE.TorusGeometry(0.75, 0.14, 24, 48, Math.PI);
    cradleTorus.rotateX(Math.PI / 2);
    cradleTorus.rotateZ(Math.PI);
    cradleTorus.translate(0, 1.8, 0);

    // Central parametric Voronoi lattice spine
    const spineCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.25, 0.6, 0.1),
      new THREE.Vector3(-0.2, 1.2, -0.05),
      new THREE.Vector3(0, 1.8, 0),
    ]);
    const spineGeo = new THREE.TubeGeometry(spineCurve, 40, 0.18, 16, false);

    // Secondary aerodynamic rib
    const ribCurve1 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.6, 0, 0.3),
      new THREE.Vector3(-0.4, 0.9, 0.15),
      new THREE.Vector3(-0.15, 1.7, 0.1),
    ]);
    const ribGeo1 = new THREE.TubeGeometry(ribCurve1, 30, 0.1, 14, false);

    // Third aerodynamic rib
    const ribCurve2 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.6, 0, -0.3),
      new THREE.Vector3(0.4, 0.9, -0.15),
      new THREE.Vector3(0.15, 1.7, -0.1),
    ]);
    const ribGeo2 = new THREE.TubeGeometry(ribCurve2, 30, 0.1, 14, false);

    // Build print build plate grid bed (3D printer heated bed)
    const bedGeo = new THREE.PlaneGeometry(3.6, 3.6, 18, 18);
    const bedMat = new THREE.MeshBasicMaterial({
      color: 0x1E2330,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const bedMesh = new THREE.Mesh(bedGeo, bedMat);
    bedMesh.rotation.x = -Math.PI / 2;
    bedMesh.position.y = -0.07;
    modelGroup.add(bedMesh);

    // PBR Material (Studio)
    const studioMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(activeColor),
      roughness: 0.35,
      metalness: 0.25,
      clippingPlanes: [slicePlane],
      clipShadows: true,
    });
    materialsRef.current.studio = studioMat;

    // Wireframe Material
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x00E5FF,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    materialsRef.current.wireframe = wireframeMat;

    // Slicer Toolpath Material (layered cyan & orange with print nozzle effect)
    const slicerMat = new THREE.MeshStandardMaterial({
      color: 0x00D8F6,
      roughness: 0.2,
      metalness: 0.1,
      clippingPlanes: [slicePlane],
      wireframe: false,
    });
    materialsRef.current.slicer = slicerMat;

    // X-Ray Material
    const xrayMat = new THREE.MeshPhysicalMaterial({
      color: 0x00E5FF,
      roughness: 0.1,
      transmission: 0.9,
      thickness: 1.2,
      transparent: true,
      opacity: 0.6,
      wireframe: false,
    });
    materialsRef.current.xray = xrayMat;

    // Mesh elements
    const baseMesh = new THREE.Mesh(baseGeo, studioMat);
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    modelGroup.add(baseMesh);

    const cradleMesh = new THREE.Mesh(cradleTorus, studioMat);
    cradleMesh.castShadow = true;
    modelGroup.add(cradleMesh);

    const spineMesh = new THREE.Mesh(spineGeo, studioMat);
    spineMesh.castShadow = true;
    modelGroup.add(spineMesh);

    const ribMesh1 = new THREE.Mesh(ribGeo1, studioMat);
    ribMesh1.castShadow = true;
    modelGroup.add(ribMesh1);

    const ribMesh2 = new THREE.Mesh(ribGeo2, studioMat);
    ribMesh2.castShadow = true;
    modelGroup.add(ribMesh2);

    // Geometric accent details
    const accentGeo = new THREE.CylinderGeometry(0.76, 0.76, 0.04, 32);
    accentGeo.rotateX(Math.PI / 2);
    accentGeo.translate(0, 1.82, 0);
    const accentMat = new THREE.MeshStandardMaterial({
      color: 0x00E5FF,
      roughness: 0.2,
      metalness: 0.8,
    });
    const accentMesh = new THREE.Mesh(accentGeo, accentMat);
    modelGroup.add(accentMesh);

    // Recenter model
    modelGroup.position.y = -0.9;
    scene.add(modelGroup);

    // 6. Interaction Event Listeners
    const onMouseDown = (e: MouseEvent) => {
      mouseState.current.isDown = true;
      mouseState.current.prevX = e.clientX;
      mouseState.current.prevY = e.clientY;
      setIsInteracting(true);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!mouseState.current.isDown) return;
      const deltaX = e.clientX - mouseState.current.prevX;
      const deltaY = e.clientY - mouseState.current.prevY;
      mouseState.current.prevX = e.clientX;
      mouseState.current.prevY = e.clientY;

      mouseState.current.targetRotY += deltaX * 0.008;
      mouseState.current.targetRotX = Math.max(-0.6, Math.min(0.8, mouseState.current.targetRotX + deltaY * 0.008));
    };

    const onMouseUp = () => {
      mouseState.current.isDown = false;
      setIsInteracting(false);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      mouseState.current.targetDistance = Math.max(2.8, Math.min(7.5, mouseState.current.targetDistance + e.deltaY * 0.003));
    };

    // Touch Support
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        mouseState.current.isDown = true;
        mouseState.current.prevX = e.touches[0].clientX;
        mouseState.current.prevY = e.touches[0].clientY;
        setIsInteracting(true);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && mouseState.current.isDown) {
        const deltaX = e.touches[0].clientX - mouseState.current.prevX;
        const deltaY = e.touches[0].clientY - mouseState.current.prevY;
        mouseState.current.prevX = e.touches[0].clientX;
        mouseState.current.prevY = e.touches[0].clientY;

        mouseState.current.targetRotY += deltaX * 0.008;
        mouseState.current.targetRotX = Math.max(-0.6, Math.min(0.8, mouseState.current.targetRotX + deltaY * 0.008));
      }
    };

    const onTouchEnd = () => {
      mouseState.current.isDown = false;
      setIsInteracting(false);
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domElement.addEventListener('wheel', onWheel, { passive: false });
    domElement.addEventListener('touchstart', onTouchStart);
    domElement.addEventListener('touchmove', onTouchMove);
    domElement.addEventListener('touchend', onTouchEnd);

    // Handle Resize
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 7. Render Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);

      const delta = clock.getDelta();

      // Smooth camera orbit
      if (autoRotate && !mouseState.current.isDown) {
        mouseState.current.targetRotY += delta * 0.35;
      }

      // Slerp damping
      mouseState.current.rotX += (mouseState.current.targetRotX - mouseState.current.rotX) * 0.08;
      mouseState.current.rotY += (mouseState.current.targetRotY - mouseState.current.rotY) * 0.08;
      mouseState.current.distance += (mouseState.current.targetDistance - mouseState.current.distance) * 0.08;

      if (modelGroupRef.current) {
        modelGroupRef.current.rotation.x = mouseState.current.rotX;
        modelGroupRef.current.rotation.y = mouseState.current.rotY;
      }

      if (cameraRef.current) {
        cameraRef.current.position.z = mouseState.current.distance;
      }

      // Slicer layer simulation animation if slicer mode active
      if (renderMode === 'slicer' && slicePlaneRef.current) {
        // Plane clips height from -0.8 to +1.2
        const normalized = (layerProgress / 100);
        const planeHeight = -0.9 + normalized * 2.6;
        slicePlaneRef.current.constant = planeHeight;
      } else if (slicePlaneRef.current) {
        slicePlaneRef.current.constant = 10.0; // unclipped
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('wheel', onWheel);
      domElement.removeEventListener('touchstart', onTouchStart);
      domElement.removeEventListener('touchmove', onTouchMove);
      domElement.removeEventListener('touchend', onTouchEnd);

      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
      renderer.dispose();
      baseGeo.dispose();
      cradleTorus.dispose();
      spineGeo.dispose();
      ribGeo1.dispose();
      ribGeo2.dispose();
      bedGeo.dispose();
      accentGeo.dispose();
      Object.values(materialsRef.current).forEach(m => m.dispose());
    };
  }, []);

  // Update Material or Color when mode or color changes
  useEffect(() => {
    if (!modelGroupRef.current || !materialsRef.current) return;

    let targetMat: THREE.Material = materialsRef.current.studio;
    if (renderMode === 'wireframe') targetMat = materialsRef.current.wireframe;
    else if (renderMode === 'slicer') targetMat = materialsRef.current.slicer;
    else if (renderMode === 'xray') targetMat = materialsRef.current.xray;

    // Update color on studio material
    if (materialsRef.current.studio instanceof THREE.MeshStandardMaterial) {
      materialsRef.current.studio.color.set(activeColor);
    }

    modelGroupRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh && child.geometry.type !== 'PlaneGeometry' && child.material !== materialsRef.current.accent) {
        child.material = targetMat;
      }
    });
  }, [renderMode, activeColor]);

  // Reset Camera View
  const resetView = () => {
    mouseState.current.targetRotX = 0.15;
    mouseState.current.targetRotY = 0.8;
    mouseState.current.targetDistance = 4.8;
  };

  const setViewPreset = (angle: 'front' | 'iso' | 'top') => {
    if (angle === 'front') {
      mouseState.current.targetRotX = 0;
      mouseState.current.targetRotY = 0;
    } else if (angle === 'iso') {
      mouseState.current.targetRotX = 0.35;
      mouseState.current.targetRotY = 0.78;
    } else if (angle === 'top') {
      mouseState.current.targetRotX = 0.8;
      mouseState.current.targetRotY = 0;
    }
  };

  return (
    <div className={`relative w-full h-full min-h-[460px] bg-gradient-to-b from-[#0D0F17]/90 to-[#07080B] rounded-2xl border border-slate-800/80 overflow-hidden select-none group ${className}`}>
      {/* 3D Canvas mount point */}
      <div 
        ref={containerRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Top Floating Control Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-3 pointer-events-none">
        {/* Render Mode Segmented Selector */}
        <div className="pointer-events-auto flex items-center gap-1 p-1 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-lg shadow-xl">
          <button
            onClick={() => setRenderMode('studio')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 whitespace-nowrap ${
              renderMode === 'studio'
                ? 'bg-slate-800 text-cyan-300 border border-cyan-500/30 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Studio PBR
          </button>

          <button
            onClick={() => setRenderMode('wireframe')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 whitespace-nowrap ${
              renderMode === 'wireframe'
                ? 'bg-slate-800 text-cyan-300 border border-cyan-500/30 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            CAD Mesh
          </button>

          <button
            onClick={() => setRenderMode('slicer')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 whitespace-nowrap ${
              renderMode === 'slicer'
                ? 'bg-slate-800 text-orange-400 border border-orange-500/30 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Layer Slicer
          </button>

          <button
            onClick={() => setRenderMode('xray')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 whitespace-nowrap ${
              renderMode === 'xray'
                ? 'bg-slate-800 text-cyan-300 border border-cyan-500/30 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            X-Ray
          </button>
        </div>

        {/* Rotation & Reset Actions */}
        <div className="pointer-events-auto flex items-center gap-1 p-1 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-lg shadow-xl">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            title={autoRotate ? "Pause rotation" : "Enable rotation"}
            className={`p-1.5 rounded-md text-xs transition-colors ${
              autoRotate ? 'text-cyan-400 bg-cyan-950/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          </button>

          <button
            onClick={resetView}
            title="Reset perspective"
            className="p-1.5 rounded-md text-slate-400 hover:text-white transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Slicer Animation Slider (Visible when in Slicer mode) */}
      {renderMode === 'slicer' && (
        <div className="absolute top-18 left-4 right-4 p-3 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-lg flex items-center gap-3">
          <div className="text-xs text-orange-400 font-mono whitespace-nowrap">
            Slice Height: {Math.round((layerProgress / 100) * 275)}mm / 275mm
          </div>
          <input
            type="range"
            min="5"
            max="100"
            value={layerProgress}
            onChange={(e) => setLayerProgress(Number(e.target.value))}
            className="w-full accent-orange-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
          <span className="text-xs text-slate-400 font-mono tabular-nums whitespace-nowrap">
            {layerProgress}%
          </span>
        </div>
      )}

      {/* Bottom Floating Bar: Color Swatches & Telemetry info */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4 pointer-events-none">
        {/* Color Palette Switcher */}
        <div className="pointer-events-auto flex items-center gap-2 p-1.5 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-lg shadow-lg">
          <span className="text-[11px] text-slate-400 px-2 font-medium">Finishes:</span>
          {availableColors.map((col) => (
            <button
              key={col.hex}
              onClick={() => setActiveColor(col.hex)}
              title={`${col.name} (${col.label})`}
              className={`w-6 h-6 rounded-md transition-all flex items-center justify-center border ${
                activeColor === col.hex
                  ? 'border-cyan-400 scale-110 shadow-md shadow-cyan-500/20'
                  : 'border-slate-700 hover:border-slate-500'
              }`}
              style={{ backgroundColor: col.hex }}
            >
              {activeColor === col.hex && (
                <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
              )}
            </button>
          ))}
        </div>

        {/* View Angle Presets */}
        <div className="pointer-events-auto hidden sm:flex items-center gap-1 p-1 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-lg shadow-lg text-[11px] text-slate-400">
          <button
            onClick={() => setViewPreset('front')}
            className="px-2 py-1 rounded hover:text-white hover:bg-slate-800 transition-colors"
          >
            Front
          </button>
          <button
            onClick={() => setViewPreset('iso')}
            className="px-2 py-1 rounded hover:text-white hover:bg-slate-800 transition-colors"
          >
            Isometric
          </button>
          <button
            onClick={() => setViewPreset('top')}
            className="px-2 py-1 rounded hover:text-white hover:bg-slate-800 transition-colors"
          >
            Top
          </button>
        </div>

        {/* CAD Resolution Metadata */}
        <div className="pointer-events-auto text-right text-[11px] text-slate-400 bg-slate-900/80 backdrop-blur-sm px-2.5 py-1 rounded border border-slate-800/80 font-mono">
          <span>0.12mm FFF · CAD 3D Preview</span>
        </div>
      </div>

      {/* Drag interaction hint on hover */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 flex items-center justify-center ${isInteracting ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}>
        <div className="bg-slate-900/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-slate-700/80 text-xs text-slate-300 shadow-xl pointer-events-none">
          Click & drag to rotate 360° · Scroll to zoom
        </div>
      </div>
    </div>
  );
};
