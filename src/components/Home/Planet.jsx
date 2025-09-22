// // import React, { Suspense, useRef } from "react";
// // import { Canvas, useFrame, useThree } from "@react-three/fiber";
// // import { OrbitControls, useTexture, Html } from "@react-three/drei";
// // import { EffectComposer, Bloom } from "@react-three/postprocessing";
// // import * as THREE from "three";

// // function LocationPin({ lat, lon, label }) {
// //   const pinRef = useRef();
// //   const { camera } = useThree(); // access camera
// //   const [visible, setVisible] = React.useState(true);

// //   const radius = 1.03;
// //   const phi = (90 - lat) * (Math.PI / 180);
// //   const theta = (lon + 180) * (Math.PI / 180);

// //   const position = new THREE.Vector3(
// //     -(radius * Math.sin(phi) * Math.cos(theta)),
// //     radius * Math.cos(phi),
// //     radius * Math.sin(phi) * Math.sin(theta)
// //   );

// //   // Check if the pin is facing the camera each frame
// //   useFrame(() => {
// //     if (!pinRef.current) return;

// //     const worldPos = new THREE.Vector3();
// //     pinRef.current.getWorldPosition(worldPos);

// //     // Get direction from camera to pin
// //     const camToPin = new THREE.Vector3().subVectors(worldPos, camera.position).normalize();

// //     // Dot product with camera forward direction
// //     const dot = camToPin.dot(camera.getWorldDirection(new THREE.Vector3()));

// //     setVisible(dot > 0); // Only show if facing the camera
// //   });

// //   return (
// //     <group position={position} ref={pinRef}>
// //       {/* Glowing Location Sphere */}
// //       <mesh>
// //         <sphereGeometry args={[0.02, 16, 16]} />
// //         <meshStandardMaterial emissive="limegreen" emissiveIntensity={2} />
// //       </mesh>

// //       {/* Country Name - only visible when in front */}
// //       {visible && (
// //         <Html
// //           position={[0, 0.04, 0]}
// //           center
// //           style={{
// //             color: "white",
// //             fontSize: "10px",
// //             background: "rgba(0,0,0,0.4)",
// //             padding: "2px 4px",
// //             borderRadius: "4px",
// //             whiteSpace: "nowrap",
// //           }}
// //         >
// //           {label}
// //         </Html>
// //       )}
// //     </group>
// //   );
// // }

// // function Planet() {
// //   const [colorMap, roughnessMap, bumpMap, cloudsMap] = useTexture([
// //     "/textures/exotic-planet/Exotic 02 (Diffuse 4k).png",
// //     "/textures/exotic-planet/Exotic 02 (Roughness 4k).png",
// //     "/textures/exotic-planet/Exotic 02 (Bump 4k).png",
// //     "/textures/exotic-planet/Exotic 02 (Clouds 4k).png",
// //   ]);

// //   const planetRef = useRef();
// //   const cloudsRef = useRef();

// //   useFrame(() => {
// //     if (planetRef.current) planetRef.current.rotation.y += 0.002;
// //     if (cloudsRef.current) cloudsRef.current.rotation.y += 0.003;
// //   });

// //   return (
// //     <>
// //       {/* Clouds */}
// //       <mesh ref={cloudsRef}>
// //         <sphereGeometry args={[1.02, 64, 64]} />
// //         <meshStandardMaterial
// //           map={cloudsMap}
// //           transparent
// //           opacity={0.35}
// //           depthWrite={false}
// //         />
// //       </mesh>

// //       {/* Main Planet with Pins as Children */}
// //       <mesh ref={planetRef} castShadow receiveShadow>
// //         <sphereGeometry args={[1, 64, 64]} />
// //         <meshStandardMaterial
// //           map={colorMap}
// //           roughnessMap={roughnessMap}
// //           bumpMap={bumpMap}
// //           bumpScale={0.05}
// //           metalness={0.1}
// //           roughness={0.9}
// //         />

// //         {/* ✅ Attach pins here so they rotate with planet */}
// //         <LocationPin lat={28.6139} lon={77.2090} label="India" />
// //         <LocationPin lat={40.7128} lon={-74.006} label="New York" />
// //         <LocationPin lat={35.6895} lon={139.6917} label="Tokyo" />
// //         <LocationPin lat={51.5072} lon={-0.1276} label="London" />
// //         <LocationPin lat={-33.8688} lon={151.2093} label="Sydney" />
// //       </mesh>
// //     </>
// //   );
// // }

// // export default function PlanetSection() {
// //   return (
// //     <div className="w-full h-[700px] bg-[rgb(0,11,18)]">
// //       <Canvas
// //         shadows
// //         camera={{ position: [0, 0, 3], fov: 45 }}
// //         gl={{ physicallyCorrectLights: true }}
// //       >
// //         {/* Directional "Sun" Light */}
// //         <directionalLight
// //           position={[5, 2, 3]}
// //           intensity={2}
// //           castShadow
// //           shadow-mapSize-width={2048}
// //           shadow-mapSize-height={2048}
// //         />
// //         {/* Soft Fill Light */}
// //         <hemisphereLight skyColor={"#b5d9ff"} groundColor={"#222"} intensity={0.35} />
// //         <pointLight position={[-3, -3, -5]} intensity={0.1} />

// //         <Suspense fallback={null}>
// //           <Planet />
// //           <EffectComposer>
// //             <Bloom intensity={1.3} luminanceThreshold={0.3} luminanceSmoothing={0.6} />
// //           </EffectComposer>
// //         </Suspense>

// //         <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
// //       </Canvas>
// //     </div>
// //   );
// // }

// import React, { Suspense, useRef } from "react";
// import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
// import { OrbitControls, useTexture, Html } from "@react-three/drei";
// import { EffectComposer, Bloom } from "@react-three/postprocessing";
// import * as THREE from "three";
// import { MapPin } from "lucide-react"; // ✅ Lucide icon
// import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader";

// // function LocationPin({ lat, lon, label }) {
// //   const pinRef = useRef();

// //   // Convert latitude and longitude to 3D coordinates
// //   const radius = 1.03;
// //   const phi = (90 - lat) * (Math.PI / 180);
// //   const theta = (lon + 180) * (Math.PI / 180);

// //   const position = new THREE.Vector3(
// //     -(radius * Math.sin(phi) * Math.cos(theta)),
// //     radius * Math.cos(phi),
// //     radius * Math.sin(phi) * Math.sin(theta)
// //   );

// //   return (
// //     <group position={position} ref={pinRef}>
// //       {/* Lucide Location Pin rendered in 3D space as HTML overlay */}
// //       <Html center occlude>
// //         <div
// //           style={{
// //             display: "flex",
// //             flexDirection: "column",
// //             alignItems: "center",
// //             zIndex: 100,
// //           }}
// //         >
// //           <MapPin
// //             size={20}
// //             color="limegreen"
// //             style={{
// //               filter:
// //                 "drop-shadow(0 0 6px limegreen) drop-shadow(0 0 10px limegreen)",
// //             }}
// //           />
// //           <span
// //             style={{
// //               color: "white",
// //               fontSize: "10px",
// //               background: "rgba(0,0,0,0.4)",
// //               padding: "2px 4px",
// //               borderRadius: "4px",
// //               marginTop: "2px",
// //               whiteSpace: "nowrap",
// //             }}
// //           >
// //             {label}
// //           </span>
// //         </div>
// //       </Html>
// //     </group>
// //   );
// // }

// function LocationPin({ lat, lon, label, planetRef }) {
//   const { camera } = useThree();
//   const pinRef = useRef();
//   const [visible, setVisible] = React.useState(false); // start hidden

//   const radius = 1.03;
//   const phi = (90 - lat) * (Math.PI / 180);
//   const theta = (lon + 180) * (Math.PI / 180);

//   const position = new THREE.Vector3(
//     -(radius * Math.sin(phi) * Math.cos(theta)),
//     radius * Math.cos(phi),
//     radius * Math.sin(phi) * Math.sin(theta)
//   );

//   // wait one tick so planet + camera have correct transforms
//   React.useEffect(() => {
//     const id = requestAnimationFrame(() => setVisible(true));
//     return () => cancelAnimationFrame(id);
//   }, []);

//   useFrame(() => {
//     if (!pinRef.current || !planetRef.current) return;
//     if (!visible) return;

//     const worldPos = new THREE.Vector3();
//     pinRef.current.getWorldPosition(worldPos);

//     const camToPin = new THREE.Vector3().subVectors(worldPos, camera.position).normalize();
//     const camDir = camera.getWorldDirection(new THREE.Vector3());

//     const dot = camToPin.dot(camDir);

//     const planetPos = new THREE.Vector3();
//     planetRef.current.getWorldPosition(planetPos);

//     const distToPin = camera.position.distanceTo(worldPos);
//     const distToPlanet = camera.position.distanceTo(planetPos);

//     const shouldBeVisible = dot > 0 && distToPin < distToPlanet + 1.0;
//     setVisible(shouldBeVisible);
//   });

//   return (
//     <group position={position} ref={pinRef}>
//       {visible && (
//         <Html center>
//           <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//             <MapPin
//               size={20}
//               color="limegreen"
//               style={{
//                 filter: "drop-shadow(0 0 6px limegreen) drop-shadow(0 0 10px limegreen)",
//               }}
//             />
//             <span
//               style={{
//                 color: "white",
//                 fontSize: "10px",
//                 background: "rgba(0,0,0,0.4)",
//                 padding: "2px 4px",
//                 borderRadius: "4px",
//                 marginTop: "2px",
//                 whiteSpace: "nowrap",
//               }}
//             >
//               {label}
//             </span>
//           </div>
//         </Html>
//       )}
//     </group>
//   );
// }

// function Planet() {
//   const { gl } = useThree();
//   const locations = [
//     { lat: 28.6139, lon: 77.209, label: "India" },
//     { lat: 51.5072, lon: -0.1276, label: "London" },
//     { lat: -33.8688, lon: 151.2093, label: "Sydney" },
//     { lat: 55.7558, lon: 37.6173, label: "Moscow" },
//     { lat: 34.0522, lon: -118.2437, label: "Los Angeles" },
//     { lat: -23.5505, lon: -46.6333, label: "São Paulo" },
//     { lat: 19.4326, lon: -99.1332, label: "Mexico City" },
//     { lat: -1.2921, lon: 36.8219, label: "Nairobi" },
//     { lat: 37.5665, lon: 126.978, label: "Seoul" },
//     { lat: -34.6037, lon: -58.3816, label: "Buenos Aires" },
//     { lat: 48.8566, lon: 2.3522, label: "Paris" },
//     { lat: 45.4215, lon: -75.6972, label: "Ottawa" },
//     { lat: 59.3293, lon: 18.0686, label: "Stockholm" },
//     { lat: 31.2304, lon: 121.4737, label: "Shanghai" },
//     { lat: 39.9042, lon: 116.4074, label: "Beijing" },
//     { lat: 25.2048, lon: 55.2708, label: "Dubai" },
//   ];
//   const [colorMap, roughnessMap, bumpMap, cloudsMap] = useLoader(
//     KTX2Loader,
//     [
//       "/textures/exotic-planet/Exotic 02 (Diffuse 4k).ktx2",
//       "/textures/exotic-planet/Exotic 02 (Roughness 4k).ktx2",
//       "/textures/exotic-planet/Exotic 02 (Bump 4k).ktx2",
//       "/textures/exotic-planet/Exotic 02 (Clouds 4k).ktx2",
//     ],
//     (loader) => {
//       loader.setTranscoderPath("/basis/"); // you need to host basis_transcoder .wasm/.js in /public/basis/
//       loader.detectSupport(gl);
//     }
//   );

//   const planetRef = useRef();
//   const cloudsRef = useRef();
//   const planetGroup = useRef();
//   const { viewport } = useThree();

//   useFrame(() => {
//     if (planetRef.current) planetRef.current.rotation.y += 0.002;
//     if (cloudsRef.current) cloudsRef.current.rotation.y += 0.003;

//     if (planetGroup.current) {
//       const newScale = Math.min(viewport.width, viewport.height) / 2.3;
//       planetGroup.current.scale.set(newScale, newScale, newScale);
//     }
//   });

//   return (
//     <group ref={planetGroup}>
//       {/* Clouds */}
//       <mesh ref={cloudsRef}>
//         <sphereGeometry
//           args={[
//             1.02,
//             window.innerWidth < 768 ? 32 : 64,
//             window.innerWidth < 768 ? 32 : 64,
//           ]}
//         />
//         <meshStandardMaterial
//           map={cloudsMap}
//           transparent
//           opacity={0.35}
//           depthWrite={false}
//         />
//       </mesh>

//       {/* Main Planet with Pins as Children */}
//       <mesh ref={planetRef} castShadow receiveShadow>
//         <sphereGeometry
//           args={[
//             1,
//             window.innerWidth < 768 ? 32 : 64,
//             window.innerWidth < 768 ? 32 : 64,
//           ]}
//         />
//         <meshStandardMaterial
//           map={colorMap}
//           roughnessMap={roughnessMap}
//           bumpMap={bumpMap}
//           bumpScale={0.05}
//           metalness={0.1}
//           roughness={0.9}
//         />

//         {locations.map((loc) => (
//           <LocationPin
//             key={loc.label}
//             lat={loc.lat}
//             lon={loc.lon}
//             label={loc.label}
//             planetRef={planetRef}
//           />
//         ))}
//       </mesh>
//     </group>
//   );
// }

// export default function PlanetSection() {
//   return (
//     <div className="w-full lg:w-1/2 h-full min-h-[300px] pt-6 lg:pt-3 bg-dark">
//       <Canvas
//         resize={{ scroll: true, debounce: { scroll: 50, resize: 50 } }}
//         shadows
//         camera={{ position: [0, 0, 3], fov: 45 }}
//         gl={{ physicallyCorrectLights: true }}
//       >
//         {/* Directional "Sun" Light */}
//         <directionalLight
//           position={[5, 2, 3]}
//           intensity={2}
//           castShadow
//           shadow-mapSize-width={2048}
//           shadow-mapSize-height={2048}
//         />
//         <hemisphereLight
//           skyColor={"#b5d9ff"}
//           groundColor={"#222"}
//           intensity={0.35}
//         />
//         <pointLight position={[-3, -3, -5]} intensity={0.1} />

//         <Suspense fallback={null}>
//           <Planet />
//           <EffectComposer>
//             <Bloom
//               intensity={1.3}
//               luminanceThreshold={0.3}
//               luminanceSmoothing={0.6}
//             />
//           </EffectComposer>
//         </Suspense>

//         <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
//       </Canvas>
//     </div>
//   );
// }

import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { MapPin } from "lucide-react"; // ✅ Lucide icon
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader";
import ErrorBoundary from "../ErrorBoundary";

function LocationPin({ lat, lon, label, planetRef }) {
  const radius = 1.03;
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const position = new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );

  return (
    <group position={position}>
      {/* Html occludes behind planet automatically */}
      <Html center occlude={[planetRef]}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <MapPin
            size={20}
            color="limegreen"
            style={{
              filter:
                "drop-shadow(0 0 6px limegreen) drop-shadow(0 0 10px limegreen)",
            }}
          />
          <span
            style={{
              color: "white",
              fontSize: "10px",
              background: "rgba(0,0,0,0.4)",
              padding: "2px 4px",
              borderRadius: "4px",
              marginTop: "2px",
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </span>
        </div>
      </Html>
    </group>
  );
}

function Planet() {
  const { gl, viewport } = useThree();
  const planetRef = useRef();
  const cloudsRef = useRef();
  const planetGroup = useRef();
  const [planetReady, setPlanetReady] = useState(false);

  const locations = [
    { lat: 28.6139, lon: 77.209, label: "India" },
    { lat: 51.5072, lon: -0.1276, label: "London" },
    { lat: -33.8688, lon: 151.2093, label: "Sydney" },
    { lat: 55.7558, lon: 37.6173, label: "Moscow" },
    { lat: 34.0522, lon: -118.2437, label: "Los Angeles" },
    { lat: -23.5505, lon: -46.6333, label: "São Paulo" },
    { lat: 19.4326, lon: -99.1332, label: "Mexico City" },
    { lat: -1.2921, lon: 36.8219, label: "Nairobi" },
    { lat: 37.5665, lon: 126.978, label: "Seoul" },
    { lat: -34.6037, lon: -58.3816, label: "Buenos Aires" },
    { lat: 48.8566, lon: 2.3522, label: "Paris" },
    { lat: 45.4215, lon: -75.6972, label: "Ottawa" },
    { lat: 59.3293, lon: 18.0686, label: "Stockholm" },
    { lat: 31.2304, lon: 121.4737, label: "Shanghai" },
    { lat: 39.9042, lon: 116.4074, label: "Beijing" },
    { lat: 25.2048, lon: 55.2708, label: "Dubai" },
  ];

  const [colorMap, roughnessMap, bumpMap, cloudsMap] = useLoader(
    KTX2Loader,
    [
      "/textures/exotic-planet/Exotic 02 (Diffuse 4k).ktx2",
      "/textures/exotic-planet/Exotic 02 (Roughness 4k).ktx2",
      "/textures/exotic-planet/Exotic 02 (Bump 4k).ktx2",
      "/textures/exotic-planet/Exotic 02 (Clouds 4k).ktx2",
    ],
    (loader) => {
      loader.setTranscoderPath("/basis/"); // host basis_transcoder .wasm/.js in /public/basis/
      loader.detectSupport(gl);
    }
  );

  useEffect(() => {
    if (colorMap && roughnessMap && bumpMap && cloudsMap) {
      setPlanetReady(true);
    }
  }, [colorMap, roughnessMap, bumpMap, cloudsMap]);

  useFrame(() => {
    if (planetRef.current) planetRef.current.rotation.y += 0.002;
    if (cloudsRef.current) cloudsRef.current.rotation.y += 0.003;

    if (planetGroup.current) {
      const newScale = Math.min(viewport.width, viewport.height) / 2.3;
      planetGroup.current.scale.set(newScale, newScale, newScale);
    }
  });
  useEffect(() => {
    if (planetRef.current) {
      planetRef.current.updateWorldMatrix(true, true);
    }
  }, []);

  return (
    <group ref={planetGroup}>
      {/* Clouds */}
      <mesh ref={cloudsRef}>
        <sphereGeometry
          args={[
            1.02,
            window.innerWidth < 768 ? 32 : 64,
            window.innerWidth < 768 ? 32 : 64,
          ]}
        />
        <meshStandardMaterial
          map={cloudsMap}
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </mesh>

      {/* Planet */}
      <mesh ref={planetRef} castShadow receiveShadow>
        <sphereGeometry
          args={[
            1,
            window.innerWidth < 768 ? 32 : 64,
            window.innerWidth < 768 ? 32 : 64,
          ]}
        />
        <meshStandardMaterial
          map={colorMap}
          roughnessMap={roughnessMap}
          bumpMap={bumpMap}
          bumpScale={0.05}
          metalness={0.1}
          roughness={0.9}
        />
        {/* Pins */}
        {planetReady &&
          locations.map((loc) => (
            <LocationPin key={loc.label} {...loc} planetRef={planetRef} />
          ))}
      </mesh>
    </group>
  );
}

export default function PlanetSection() {
  return (
    <ErrorBoundary>
      <div className="w-full lg:w-1/2 h-full min-h-[300px] z-10 pt-6 lg:pt-3 bg-dark">
        <Canvas
          resize={{ scroll: true, debounce: { scroll: 50, resize: 50 } }}
          shadows
          camera={{ position: [0, 0, 3], fov: 45 }}
          gl={{ physicallyCorrectLights: true }}
          onCreated={({ camera, scene, gl }) => {
            camera.updateProjectionMatrix();
            camera.updateMatrixWorld(true);
            scene.updateMatrixWorld(true);
            gl.render(scene, camera); // Force an immediate render
          }}
        >
          {/* Lighting */}
          <directionalLight
            position={[5, 2, 3]}
            intensity={2}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <hemisphereLight
            skyColor={"#b5d9ff"}
            groundColor={"#222"}
            intensity={0.35}
          />
          <pointLight position={[-3, -3, -5]} intensity={0.1} />

          <Suspense fallback={null}>
            <Planet />
            <EffectComposer>
              <Bloom
                intensity={1.3}
                luminanceThreshold={0.3}
                luminanceSmoothing={0.6}
              />
            </EffectComposer>
          </Suspense>

          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
        </Canvas>
      </div>
    </ErrorBoundary>
  );
}
