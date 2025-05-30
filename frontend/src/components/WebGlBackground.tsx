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
    const dotTexture = new THREE.TextureLoader().load('/dotTexture.png') // place in public/

    const radius = 50
    const baseGeom = new THREE.IcosahedronGeometry(radius, 5)
    const positionAttr = baseGeom.getAttribute('position') as THREE.BufferAttribute
    const numVerts = positionAttr.count

    const positions = new Float32Array(numVerts * 3)
    const originalPositions: THREE.Vector3[] = []

    for (let i = 0; i < numVerts; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(positionAttr, i)
      originalPositions.push(v.clone())
      v.toArray(positions, i * 3)
    }

    const bufferGeom = new THREE.BufferGeometry()
  const posAttr = new THREE.BufferAttribute(positions, 3)
  bufferGeom.setAttribute('position', posAttr)


    // Shader material with texture
    const material = new ShaderMaterial({
      uniforms: {
        uTexture: { value: dotTexture },
      },
      vertexShader: `
        
        void main() {
          gl_PointSize = 2.0;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }

      `,
      fragmentShader: `
        uniform sampler2D uTexture;

        void main() {
          vec4 texColor = texture(uTexture, gl_PointCoord);
          gl_FragColor = texColor;
        }
      `,
      transparent: true,
      depthWrite: false
    })

    const points = new THREE.Points(bufferGeom, material)
    scene.add(points)

    // Animation loop
    let time = 0
    const animate = () => {
      requestAnimationFrame(animate)
      time += 0.02

      // Animate vertices breathing in/out toward center
      originalPositions.forEach((base, i) => {
        const offset = Math.abs(base.y / radius)
        const factor = Math.sin(time + offset * 2) * 0.15

        const index = i * 3
        const target = base.clone().multiplyScalar(1 - factor)

        positions[index] = target.x
        positions[index + 1] = target.y
        positions[index + 2] = target.z
      })

      posAttr.needsUpdate = true
      renderer.render(scene, camera)
    }
    animate()

    // Mouse rotation
    const mouse = { x: 0.5, y: 0.5 }
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth - 0.5
      mouse.y = e.clientY / window.innerHeight - 0.5

      points.rotation.x = mouse.y * Math.PI * 0.5
      points.rotation.z = mouse.x * Math.PI * 0.2
    }
    window.addEventListener('mousemove', onMouseMove)

    const onResize = () => {
      const w = containerRef.current?.offsetWidth || window.innerWidth
      const h = containerRef.current?.offsetHeight || window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-10 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  )
}
