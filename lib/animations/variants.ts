import { Variants } from 'framer-motion'

export const EASE_CUBIC = [0.4, 0.0, 0.2, 1] as const
export const EASE_OUT = [0.0, 0.0, 0.2, 1] as const


export const createContainerVariants = (scrollDirection: number = 1): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.5,
      staggerDirection: scrollDirection
    }
  }
})

export const createItemVariants = (scrollDirection: number = 1) => ({
  hidden: {
    opacity: 0,
    y: scrollDirection > 0 ? 15 : -15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: EASE_OUT
    }
  }
})


export const createDirectionalFadeVariants = (scrollDirection: number) => ({
  hidden: {
    opacity: 0,
    y: scrollDirection > 0 ? 20 : -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: EASE_OUT
    }
  }
})

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: EASE_OUT }
  }
}

export const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 100,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.5, 
      ease: EASE_CUBIC 
    }
  },
  exit: { 
    opacity: 0, 
    y: -100, 
    scale: 0.9,
    transition: { 
      duration: 0.6, 
      ease: EASE_CUBIC 
    }
  }
}

export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_OUT }
  }
}

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: EASE_OUT }
  }
}

export const createSlideVariants = (from: 'left' | 'right' = 'left') => ({
  hidden: {
    opacity: 0,
    x: from === 'left' ? -30 : 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: EASE_OUT
    }
  }
})

export const countryBadgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: EASE_CUBIC 
    }
  }
}

export const infoItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.5, 
      ease: EASE_CUBIC 
    }
  },
  exit: { 
    opacity: 0, 
    x: -20,
    transition: { 
      duration: 0.4 
    }
  }
}

export const createGradientAnimation = (delay: number = 0.3) => ({
  initial: { backgroundPosition: '0% 50%' },
  animate: { backgroundPosition: '100% 50%' },
  transition: { 
    duration: 1.2, 
    ease: 'easeInOut', 
    delay 
  }
})

export const tableRowVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.3 + index * 0.1,
      ease: EASE_CUBIC
    }
  })
}

export const mediaRevealVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: 0.5,
      ease: EASE_CUBIC
    }
  }
}

export const testimonialVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? 20 : -20
  }),
  center: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE_CUBIC
    }
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction < 0 ? 20 : -20,
    transition: {
      duration: 0.5,
      ease: EASE_CUBIC
    }
  })
}

export const stepBadgeVariants: Variants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      delay: 0.2
    }
  }
}

export const statsPulseVariants: Variants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 12
    }
  }
}

export const industryIconHover = {
  rest: { rotate: 0, scale: 1 },
  hover: { 
    rotate: 360, 
    scale: 1.1,
    transition: { 
      duration: 0.6,
      ease: EASE_CUBIC
    }
  }
}

export const connectorLineVariants = (align: 'left' | 'right'): Variants => ({
  hidden: { 
    scaleX: 0,
    originX: align === 'right' ? 1 : 0
  },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.4,
      delay: 0.3,
      ease: EASE_CUBIC
    }
  }
})

export const ctaButtonVariants: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: EASE_CUBIC
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  }
}

export const infoBoxVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.6,
      ease: EASE_CUBIC
    }
  }
}

export const certBadgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: 0.6 + index * 0.1,
      ease: EASE_CUBIC
    }
  })
}

export const cardHoverVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2, ease: EASE_OUT }
  }
}