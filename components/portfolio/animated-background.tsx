"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let particles: Particle[] = []

    interface Particle {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      opacity: number
      fadeDirection: number
    }

    function resize() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function createParticle(): Particle {
      if (!canvas) {
        return {
          x: 0, y: 0, vx: 0, vy: 0,
          radius: 1, opacity: 0, fadeDirection: 1,
        }
      }
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5,
        opacity: 0,
        fadeDirection: 1,
      }
    }

    function init() {
      resize()
      const count = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 18000), 60)
      particles = Array.from({ length: count }, createParticle)
    }

    function draw() {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const isDark = resolvedTheme === "dark"
      const dotColor = isDark ? "180, 210, 255" : "14, 165, 233"

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        p.opacity += p.fadeDirection * 0.003
        if (p.opacity >= 0.6) p.fadeDirection = -1
        if (p.opacity <= 0) {
          p.fadeDirection = 1
          p.x = Math.random() * canvas.width
          p.y = Math.random() * canvas.height
        }

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${dotColor}, ${p.opacity})`
        ctx.fill()
      }

      animationId = requestAnimationFrame(draw)
    }

    init()
    draw()
    window.addEventListener("resize", init)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", init)
    }
  }, [resolvedTheme])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden="true"
    />
  )
}
