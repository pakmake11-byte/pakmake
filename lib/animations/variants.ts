import { Variants, Easing } from 'framer-motion'

export const EASE_CUBIC: Easing = [0.65, 0, 0.35, 1]

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

export const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.7,
      ease: EASE_CUBIC
    }
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

export const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: EASE_CUBIC 
    }
  }
}

export const scaleInVariants: Variants = {
  hidden: { scale: 0 },
  visible: { 
    scale: 1,
    transition: { 
      duration: 1.2, 
      type: "spring", 
      stiffness: 200 
    }
  }
}

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