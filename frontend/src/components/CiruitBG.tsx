// CircuitLinesBackground.tsx

'use client'

import { useEffect, useRef } from "react"

export default function CircuitLinesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const lines: { x: number, y: number, length: number, speed: number, direction: number }[] = []

    // Create horizontal/diagonal lines across screen
    for (let i = 0; i < 75; i++) {
      lines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: 80 + Math.random() * 50,
        speed: 0.5 + Math.random() * 1.5,
        direction: Math.random() > 0.5 ? 1 : -1, // left or right
      })
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (const line of lines) {
        ctx.beginPath()
        ctx.moveTo(line.x, line.y)
        ctx.lineTo(line.x + line.length * line.direction, line.y)
        ctx.strokeStyle = "#00ffcc"
        ctx.lineWidth = 1
        ctx.shadowColor = "#00ffcc"
        ctx.shadowBlur = 5
        ctx.stroke()

        // glowing dot at the head of the line
        ctx.beginPath()
        ctx.arc(line.x + line.length * line.direction, line.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = "#00ffff"
        ctx.fill()
        ctx.shadowBlur = 0

        line.x += line.speed * line.direction
        if (line.x > canvas.width || line.x < -line.length) {
          line.x = line.direction > 0 ? -line.length : canvas.width + line.length
          line.y = Math.random() * canvas.height
        }
      }
    }

    const interval = setInterval(draw, 40)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-10" />
}
