import { motion } from "framer-motion";

export function BackgroundElements({ isInView }: { isInView: boolean }) {
  return (
    <>
      <motion.div
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #00A0E3 1px, transparent 1px),
            linear-gradient(to bottom, #00A0E3 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
        animate={isInView ? {
          backgroundPosition: ['0px 0px', '40px 40px'],
        } : {}}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${5 + i * 8}%`,
            top: `${10 + (i % 4) * 20}%`,
          }}
          animate={isInView ? {
            y: [0, -40, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          } : {}}
          transition={{
            duration: 3 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        >
          <div className="w-2 h-2 bg-primary-400 rounded-full" />
        </motion.div>
      ))}
    </>
  )
}
