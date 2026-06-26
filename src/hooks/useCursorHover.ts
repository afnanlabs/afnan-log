import { useEffect } from 'react'
import { useAppStore } from '@/store/app-store'

export function useCursorHover(ref: React.RefObject<HTMLElement | null>) {
  const setCursorState = useAppStore((state) => state.setCursorState)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseEnter = () => setCursorState('hover')
    const handleMouseLeave = () => setCursorState('default')

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [ref, setCursorState])
}
