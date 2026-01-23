import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import scissorsImage from "@/assets/scissors.jpg";

const Method = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const titleScale = useTransform(scrollYProgress, [0.1, 0.4], [0.92, 1.1]);
  const titleY = useTransform(scrollYProgress, [0.1, 0.4], [25, -20]);

  return (
    <section ref={sectionRef} id="metodo" className="relative py-[110px] overflow-hidden">
      <motion.div
        className="absolute z-0 pointer-events-none"
        style={{
          inset: "-90px",
          backgroundImage: `url(${scissorsImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "grayscale(100%) contrast(120%) blur(1px)",
          opacity: 0.55,
          y: bgY,
          rotate: -6,
          scale: 1.22,
        }}
      />

      <div className="absolute inset-0 z-[1] pointer-events-none" style={{
        background: `radial-gradient(900px 500px at 20% 30%, rgba(255,255,255,.06), transparent 60%),
          linear-gradient(to bottom, rgba(0,0,0,.35), rgba(0,0,0,.88))`
      }} />

      <motion.div className="relative z-[2] max-w-[900px] mx-auto px-6">
        <motion.p 
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ 
            opacity: isInView ? 1 : 0, 
            y: isInView ? 0 : 40,
            filter: isInView ? "blur(0px)" : "blur(10px)"
          }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3.5 text-[11px] tracking-[0.42em] uppercase text-primary mb-3.5"
        >
          <motion.span 
            className="h-px w-11 bg-gradient-to-r from-transparent via-primary/55 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isInView ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
          MÉTODO DE ATENDIMENTO
          <motion.span 
            className="h-px w-11 bg-gradient-to-r from-transparent via-primary/55 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isInView ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
          transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ scale: titleScale, y: titleY }}
          className="font-serif font-semibold tracking-tight leading-[1.05] text-[clamp(28px,3.6vw,48px)] text-white origin-left"
        >
          Método C.A.C.H.O
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ 
            opacity: isInView ? 1 : 0, 
            y: isInView ? 0 : 40,
            filter: isInView ? "blur(0px)" : "blur(8px)"
          }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/70 max-w-[60ch] mt-4"
        >
          Curvatura • Anatomia do rosto • Comportamento do fio • Harmonia visual • Orientação prática
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Method;
