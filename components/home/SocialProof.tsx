'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Quote, Users } from 'lucide-react'
import { scaleInVariants, testimonialVariants } from '@/lib/animations/variants'
import { SectionHeader } from '@/components/ui/SectionHeader'

const TESTIMONIALS = [
  {
    quote: "PakMake's slip sheets have greatly improved the efficiency and convenience of our logistics process.",
    author: "Qaid Ali Yousafzai",
    role: "Sr. Purchase Executive",
    company: "Trofina Food",
  },
  {
    quote: "The quality and service from PakMake have consistently met our export requirements and expectations.",
    author: "Pitor Bakowski",
    role: "Export Manager",
    company: "Hortex",
  },
  {
    quote: "We appreciate PakMake's reliability and commitment to providing sustainable packaging solutions.",
    author: "Mijgona Khaidarzoda",
    role: "Sales Executive",
    company: "Gulf Flavours",
  },
  {
    quote: "PakMake has proven to be a dependable partner with excellent quality and professional service.",
    author: "Ashok Geddam",
    role: "Global Procurement Manager",
    company: "Caremoli",
  },
  {
    quote: "A trusted partner that consistently delivers quality products and great customer support.",
    author: "Arshod Saiyed",
    role: "Vice President Supply Chain Management",
    company: "Barakat Group",
  },
  {
    quote: "We value PakMake's professionalism, innovation, and consistent product performance.",
    author: "Ander S. Nielsen",
    role: "Managing Director",
    company: "Quantum",
  },
  {
    quote: "PakMake's products have added great value to our purchasing and supply operations.",
    author: "Abdulrahman Mohamed",
    role: "Purchasing Manager",
    company: "Fregento",
  },
  {
    quote: "Their dedication to quality and customer satisfaction makes them a pleasure to work with.",
    author: "AG Saleem",
    role: "Sales Executive",
    company: "Fregento",
  },
  {
    quote: "Reliable service, consistent quality, and prompt responses — exactly what we look for in a supplier.",
    author: "Arun Prem Pereia",
    role: "Production Planner",
    company: "Hadaf Foods Industry LLC",
  },
  {
    quote: "Working with PakMake has been smooth and professional from start to finish.",
    author: "AG Saleem",
    role: "Sales Executive",
    company: "Express Pack Print",
  },
  {
    quote: "Excellent packaging solutions with a focus on sustainability and customer satisfaction.",
    author: "Sandeep Neupane",
    role: "Sales Executive",
    company: "Europack Industries LLC",
  },
]

export function SocialProof() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })

  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const total = TESTIMONIALS.length

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent((prev) => (prev + 1) % total)
    }, 7000)
    return () => clearInterval(timer)
  }, [total])

  const handleChange = (index: number) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }

  const active = TESTIMONIALS[current]

  return (
    <section
      ref={ref}
      className="py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-white to-[#E6F7FF]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          icon={Users}
          title="Trusted by"
          highlightedText="Industry Leaders"
          subtitle="Join companies that have transformed their logistics with our solutions"
          isInView={isInView}
        />

        <motion.div
          variants={scaleInVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative bg-white rounded-2xl shadow-xl border border-[#B3E5FC] p-8 sm:p-10 lg:p-12 mb-12 overflow-hidden"
        >
          {/* Gradient accent line */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#00A0E3] via-[#4DC4F5] to-[#007CB8]" />

          {/* Faint background quote icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute top-8 left-8 opacity-10"
          >
            <Quote className="w-20 h-20 sm:w-24 sm:h-24 text-[#00A0E3]" />
          </motion.div>

          {/* Active testimonial */}
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={testimonialVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <blockquote className="text-lg sm:text-xl lg:text-2xl text-[#334155] mb-8 sm:mb-10 italic leading-relaxed">
                  &quot;{active.quote}&quot;
                </blockquote>
                <div className="flex flex-col items-center">
                  <p className="text-lg sm:text-xl font-bold text-[#003E5C] mb-1">
                    {active.author}
                  </p>
                  <p className="text-base sm:text-lg font-semibold bg-gradient-to-r from-[#00A0E3] to-[#007CB8] bg-clip-text text-transparent mb-1">
                    {active.role}
                  </p>
                  <p className="text-sm sm:text-base text-[#334155]">
                    {active.company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 sm:mt-10 space-x-3">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => handleChange(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === current
                    ? 'w-12 h-3 bg-gradient-to-r from-[#00A0E3] to-[#007CB8]'
                    : 'w-3 h-3 bg-[#B3E5FC] hover:bg-[#80D4F8]'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
