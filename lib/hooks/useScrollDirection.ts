import { useState, useEffect } from 'react'

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState(1)

  useEffect(() => {
    let lastScrollY = window.scrollY
    
    const updateScrollDirection = () => {
      const direction = window.scrollY > lastScrollY ? 1 : -1
      setScrollDirection(direction)
      lastScrollY = window.scrollY
    }
    
    window.addEventListener('scroll', updateScrollDirection)
    return () => window.removeEventListener('scroll', updateScrollDirection)
  }, [])

  return scrollDirection
}
