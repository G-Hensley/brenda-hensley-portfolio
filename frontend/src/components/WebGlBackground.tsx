'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { ShaderMaterial } from 'three'

export default function SpacetimeEffect() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const width = containerRef.current.offsetWidth
    const height = containerRef.current.offsetHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 2000)
    camera.position.set(0, 0, 80)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)
    containerRef.current.appendChild(renderer.domElement)

    // Dot sprite texture
    const dotTexture = new THREE.TextureLoader().load('/dotTexture.png')

    const radius = 80
    const baseGeom = new THREE.IcosahedronGeometry(radius, 18)
    const positionAttr = baseGeom.getAttribute('position') as THREE.BufferAttribute
    const numVerts = positionAttr.count

    const positions = new Float32Array(numVerts * 3)
    for (let i = 0; i < numVerts; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(positionAttr, i)
      v.toArray(positions, i * 3)
    }

    const bufferGeom = new THREE.BufferGeometry()
    const posAttr = new THREE.BufferAttribute(positions, 3)
    bufferGeom.setAttribute('position', posAttr)

    const material = new ShaderMaterial({
      uniforms: {
        uTexture: { value: dotTexture },
        time: { value: 0 },
      },
      vertexShader: `
        uniform float time;

        void main() {
          float angle = position.y * 0.15 + time * 0.8;

          // Apply Z-axis warp before rotation
          float warpZ = position.z + sin(position.x * 0.5 + time * 0.005) * 5.0;

          // Apply rotation and wave warping
          float wave = sin(position.x * 0.3 + time * 1.5) * cos(position.y * 0.3 + time * 1.2) * 2.0;

          vec3 warped = vec3(
            position.x * cos(angle) - warpZ * sin(angle),
            position.y + wave,
            position.x * sin(angle) + warpZ * cos(angle)
          );

          gl_PointSize = 1.5 + 1.5 * sin(time + position.y * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(warped, 1.0);
        }

      `,
      fragmentShader: `
        uniform float time;
        uniform sampler2D uTexture;

        void main() {
          vec4 texColor = texture2D(uTexture, gl_PointCoord);

          float dist = distance(gl_PointCoord, vec2(0.5));
          float edgeFade = 1.0 - smoothstep(0.4, 0.5, dist);
          float flicker = 0.5 + 0.5 * sin(time * 2.0 + gl_FragCoord.x * 0.05 + gl_FragCoord.y * 0.05);

          // Optional: soften point edge using distance from center
          vec3 green = vec3(0.0, 1.0, 0.0); // strong green
          float alpha = texColor.a * flicker * edgeFade;

          gl_FragColor = vec4(green, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
    })

    const points = new THREE.Points(bufferGeom, material)
    scene.add(points)

    let time = 0
    const animate = () => {
      requestAnimationFrame(animate)
      time += 0.00005
      material.uniforms.time.value = time

      points.rotation.x += 0.0005;
      points.rotation.y += 0.0003;
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      const w = containerRef.current?.offsetWidth || window.innerWidth
      const h = containerRef.current?.offsetHeight || window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-10 pointer-events-none opacity-40"
      style={{ width: '100%', height: '100%' }}
    />
  )
}
