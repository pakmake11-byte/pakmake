'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Quote, Users } from 'lucide-react'
import { scaleInVariants, testimonialVariants } from '@/lib/animations/variants'
import { SectionHeader } from '@/components/ui/SectionHeader'

export function SocialProof() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [direction, setDirection] = useState(0)

  const testimonials = [
    {
      quote: "PakMake's slip sheets transformed our logistics. We've seen 75% cost reduction and significantly faster loading times.",
      author: "Sarah Johnson",
      company: "Global Foods Inc",
      role: "Supply Chain Director",
    },
    {
      quote: "The environmental benefits align perfectly with our sustainability goals. 100% recyclable and massive space savings.",
      author: "Michael Chen",
      company: "EcoTech Solutions",
      role: "Sustainability Manager",
    },
    {
      quote: "Switching to slip sheets was the best decision for our export operations. ISPM 15 exemption saves us weeks of processing.",
      author: "Ahmed Al-Rashid",
      company: "Middle East Trading Co",
      role: "Operations Manager",
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [testimonials.length])

  const handleTestimonialChange = (index: number) => {
    setDirection(index > currentTestimonial ? 1 : -1)
    setCurrentTestimonial(index)
  }

  return (
    <section ref={ref} className="py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-white to-[#E6F7FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header with Icon */}
        <SectionHeader
          icon={Users}
          title="Trusted by"
          highlightedText="Industry Leaders"
          subtitle="Join hundreds of companies that have transformed their logistics with our solutions"
          isInView={isInView}
        />

        <motion.div
          variants={scaleInVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative bg-white rounded-2xl shadow-xl border border-[#B3E5FC] p-8 sm:p-10 lg:p-12 mb-12 overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#00A0E3] via-[#4DC4F5] to-[#007CB8]" />

          {/* Quote Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute top-8 left-8 opacity-10"
          >
            <Quote className="w-20 h-20 sm:w-24 sm:h-24 text-[#00A0E3]" />
          </motion.div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentTestimonial}
                custom={direction}
                variants={testimonialVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="text-center"
              >
                <blockquote className="text-lg sm:text-xl lg:text-2xl text-[#334155] mb-8 sm:mb-10 italic leading-relaxed text-center">
                  &quot;{testimonials[currentTestimonial].quote}&quot;
                </blockquote>

                <div className="flex flex-col items-center">
                  <p className="text-lg sm:text-xl font-bold text-[#003E5C] mb-1">
                    {testimonials[currentTestimonial].author}
                  </p>
                  <p className="text-base sm:text-lg font-semibold bg-gradient-to-r from-[#00A0E3] to-[#007CB8] bg-clip-text text-transparent mb-1">
                    {testimonials[currentTestimonial].role}
                  </p>
                  <p className="text-sm sm:text-base text-[#334155]">
                    {testimonials[currentTestimonial].company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Testimonial indicators */}
          <div className="flex justify-center mt-8 sm:mt-10 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleTestimonialChange(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentTestimonial
                    ? 'w-12 h-3 bg-gradient-to-r from-[#00A0E3] to-[#007CB8]'
                    : 'w-3 h-3 bg-[#B3E5FC] hover:bg-[#80D4F8]'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
