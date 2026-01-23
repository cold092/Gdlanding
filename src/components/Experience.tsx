import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const titleScale = useTransform(scrollYProgress, [0.1, 0.4], [0.92, 1.08]);
  const titleY = useTransform(scrollYProgress, [0.1, 0.4], [20, -15]);

  return (
    <section
      ref={sectionRef}
      id="experiencia"
      className="relative py-[110px] overflow-hidden text-center"
      style={{
        background: `radial-gradient(800px 260px at 50% 0%, rgba(201,164,106,.08), transparent 60%),
          linear-gradient(to bottom, #0d0b0a, #000)`
      }}
    >
      <motion.div 
        className="w-full max-w-[1180px] mx-auto px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.p 
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ 
            opacity: isInView ? 1 : 0, 
            y: isInView ? 0 : 40,
            filter: isInView ? "blur(0px)" : "blur(10px)"
          }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-3.5 text-[11px] tracking-[0.42em] uppercase text-primary mb-3.5"
        >
          <motion.span 
            className="h-px w-11 bg-gradient-to-r from-transparent via-primary/55 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isInView ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
          EXPERIÊNCIA
          <motion.span 
            className="h-px w-11 bg-gradient-to-r from-transparent via-primary/55 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isInView ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.p>

        <motion.h2 
          initial={{ opacity: 0, y: 60, filter: "blur(15px)", scale: 0.9 }}
          animate={{ 
            opacity: isInView ? 1 : 0, 
            y: isInView ? 0 : 60, 
            filter: isInView ? "blur(0px)" : "blur(15px)",
            scale: isInView ? 1 : 0.9
          }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ scale: titleScale, y: titleY }}
          className="font-serif font-semibold tracking-tight leading-[1.05] text-[clamp(28px,3.6vw,48px)] text-white"
        >
          Transformação real com técnica e direção.
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ 
            opacity: isInView ? 1 : 0, 
            y: isInView ? 0 : 40,
            filter: isInView ? "blur(0px)" : "blur(8px)"
          }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 mx-auto max-w-[74ch] text-white/70 text-[15px]"
        >
          Me chamo Gideone Oliveira, tenho 27 anos e há 9 anos me dedico a transformar postura e autoestima.
          Hoje sou especialista em cabelos cacheados, focado em entregar transformação real e praticidade para o dia a dia.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Experience;
