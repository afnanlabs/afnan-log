import { useEffect, useRef } from 'react'
import { useAppStore } from '@/store/app-store'

const STIFFNESS = 0.12
const DAMPING = 0.80

export function CustomCursor() {
  // Only cursorState (hover/default/hidden) comes from Zustand — it changes
  // infrequently (hover transitions only), not on every frame.
  const { cursorState } = useAppStore()

  // Separate layers — each positioned via direct style mutation, never React state.
  const dotRef = useRef<HTMLDivElement>(null)   // direct tracking, zero lag
  const boxRef = useRef<HTMLDivElement>(null)   // spring-interpolated, satisfying drag

  // Click ripple — positioned at click point, re-triggered per click.
  const rippleWrapRef = useRef<HTMLDivElement>(null)
  const rippleRingRef = useRef<HTMLDivElement>(null)

  // Spring state — lives in refs, invisible to React.
  const spring = useRef({ x: 0, y: 0, vx: 0, vy: 0 })
  const mouse = useRef({ x: 0, y: 0 })
  const raf = useRef<number | undefined>(undefined)
  const seeded = useRef(false)

  useEffect(() => {
    function tick() {
      const s = spring.current
      const m = mouse.current

      s.vx += (m.x - s.x) * STIFFNESS
      s.vy += (m.y - s.y) * STIFFNESS
      s.vx *= DAMPING
      s.vy *= DAMPING
      s.x += s.vx
      s.y += s.vy

      if (boxRef.current) {
        boxRef.current.style.transform = `translate3d(${s.x}px, ${s.y}px, 0)`
      }

      raf.current = requestAnimationFrame(tick)
    }

    raf.current = requestAnimationFrame(tick)

    function onMove(e: MouseEvent) {
      mouse.current = { x: e.clientX, y: e.clientY }

      // Dot tracks cursor frame-perfectly — no interpolation.
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }

      // Seed spring at first move so box doesn't sweep from (0, 0).
      if (!seeded.current) {
        seeded.current = true
        spring.current.x = e.clientX
        spring.current.y = e.clientY
        if (dotRef.current) dotRef.current.style.opacity = '1'
        if (boxRef.current) boxRef.current.style.opacity = '1'
      }
    }

    function onLeave() {
      useAppStore.getState().setCursorState('hidden')
      if (dotRef.current) dotRef.current.style.opacity = '0'
      if (boxRef.current) boxRef.current.style.opacity = '0'
      seeded.current = false
    }

    function onEnter() {
      if (useAppStore.getState().cursorState === 'hidden') {
        useAppStore.getState().setCursorState('default')
      }
    }

    function onClick(e: MouseEvent) {
      if (!rippleWrapRef.current || !rippleRingRef.current) return
      rippleWrapRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      // Reset animation so it can re-fire on repeated clicks.
      rippleRingRef.current.style.animation = 'none'
      void rippleRingRef.current.offsetWidth
      rippleRingRef.current.style.animation =
        'cursor-ripple 0.52s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    window.addEventListener('click', onClick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      window.removeEventListener('click', onClick)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  const isHover = cursorState === 'hover'

  return (
    <div aria-hidden="true" className="pointer-events-none hidden md:block">

      {/* ── Dot layer: direct tracking, zero spring lag ─────────────────── */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999]"
        style={{
          opacity: 0,
          transition: 'opacity 150ms ease',
          willChange: 'transform',
        }}
      >
        {/* Glow breathe — soft halo behind the dot, cursor-glow-breathe keyframe */}
        <div
          className="absolute rounded-full bg-foreground"
          style={{
            width: '16px',
            height: '16px',
            left: '-8px',
            top: '-8px',
            animation: 'cursor-glow-breathe 2.6s ease-in-out infinite',
            animationFillMode: 'both',
            willChange: 'transform, opacity',
          }}
        />
        {/* Core dot: 6px, mix-blend-mode difference for inversion on any bg */}
        <div
          className="absolute rounded-full bg-foreground"
          style={{
            width: '6px',
            height: '6px',
            left: '-3px',
            top: '-3px',
            mixBlendMode: 'difference',
          }}
        />
      </div>

      {/* ── Box layer: spring-interpolated ─────────────────────────────── */}
      <div
        ref={boxRef}
        className="fixed top-0 left-0 z-[9998]"
        style={{
          opacity: 0,
          transition: 'opacity 150ms ease',
          willChange: 'transform',
        }}
      >
        {/* Pulse ring — concentric ring expanding outward from center */}
        <div
          className="absolute rounded-full border border-foreground"
          style={{
            width: '40px',
            height: '40px',
            left: '-20px',
            top: '-20px',
            mixBlendMode: 'difference',
            animation: 'cursor-pulse 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            animationFillMode: 'backwards',
            transformOrigin: 'center center',
            willChange: 'transform, opacity',
          }}
        />

        {/* VIEW box — appears on hover with 0.15s ease-out entrance */}
        <div
          style={{
            transition: 'transform 0.15s ease-out, opacity 0.15s ease-out',
            transform: isHover ? 'scale(1)' : 'scale(0.55)',
            opacity: isHover ? 1 : 0,
          }}
        >
          <div
            className="absolute flex items-center justify-center rounded-full border border-foreground"
            style={{
              width: '72px',
              height: '72px',
              left: '-36px',
              top: '-36px',
              mixBlendMode: 'difference',
            }}
          >
            <span
              className="font-mono text-[9px] tracking-[0.18em] uppercase select-none text-foreground"
              style={{ mixBlendMode: 'difference' }}
            >
              VIEW
            </span>
          </div>
        </div>
      </div>

      {/* ── Ripple layer: click micro-interaction ───────────────────────── */}
      <div
        ref={rippleWrapRef}
        className="fixed top-0 left-0 z-[9997]"
        style={{ willChange: 'transform' }}
      >
        <div
          ref={rippleRingRef}
          className="absolute rounded-full border border-foreground"
          style={{
            width: '28px',
            height: '28px',
            left: '-14px',
            top: '-14px',
            mixBlendMode: 'difference',
          }}
        />
      </div>
    </div>
  )
}
