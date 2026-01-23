import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import pensativaImage from "@/assets/foto-pensativa.jpg";
import grainImage from "@/assets/grain.png";

const pills = ["Definição e controle dos cachos", "Redução de frizz", "Corte funcional no dia a dia", "Imagem alinhada à identidade"];

const Results = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  
  // Scroll zoom for title
  const titleScale = useTransform(scrollYProgress, [0.15, 0.45], [0.9, 1.12]);
  const titleY = useTransform(scrollYProgress, [0.15, 0.45], [30, -25]);

  return (
    <section ref={sectionRef} id="resultados" className="relative min-h-[78vh] flex items-end py-24 bg-black overflow-hidden">
      <motion.div 
        className="absolute inset-0 z-0" 
        style={{ 
          backgroundImage: `url(${pensativaImage})`, 
          backgroundSize: "cover", 
          backgroundPosition: "center 30%", 
          y: bgY
        }}
        initial={{ scale: 2.5, filter: "blur(40px)", opacity: 0 }}
        animate={{ 
          scale: isInView ? 1.02 : 2.5, 
          filter: isInView ? "blur(0px)" : "blur(40px)",
          opacity: isInView ? 1 : 0
        }}
        transition={{ 
          duration: 2.8, 
          ease: [0.16, 1, 0.3, 1],
          opacity: { duration: 1.5 },
          scale: { duration: 3 },
          filter: { duration: 2.5 }
        }}
      />
      <div className="absolute inset-0 z-[1]" style={{ background: `radial-gradient(900px 480px at 25% 85%, rgba(201,164,106,0.10), transparent 60%), linear-gradient(to top, rgba(0,0,0,.92) 0%, rgba(0,0,0,.78) 28%, rgba(0,0,0,.35) 55%, rgba(0,0,0,0) 78%)` }} />
      <div className="grain-overlay z-[2]" style={{ backgroundImage: `url(${grainImage})` }} />

      <motion.div className="relative z-[3] max-w-[720px] px-6 mx-auto lg:mx-0 lg:ml-[10%]">
        <motion.p 
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }} 
          animate={{ 
            opacity: isInView ? 1 : 0, 
            y: isInView ? 0 : 40,
            filter: isInView ? "blur(0px)" : "blur(10px)"
          }} 
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} 
          className="flex items-center gap-3.5 text-[11px] tracking-[0.42em] uppercase text-primary mb-3.5"
        >
          <motion.span 
            className="h-px w-11 bg-gradient-to-r from-transparent via-primary/55 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isInView ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
          RESULTADOS
          <motion.span 
            className="h-px w-11 bg-gradient-to-r from-transparent via-primary/55 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isInView ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
          transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }} 
          style={{ scale: titleScale, y: titleY }}
          className="font-serif font-semibold tracking-tight leading-[1.05] text-[clamp(28px,3.6vw,48px)] text-white origin-left"
        >
          Resultados entregues.
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }} 
          animate={{ 
            opacity: isInView ? 1 : 0, 
            y: isInView ? 0 : 40,
            filter: isInView ? "blur(0px)" : "blur(8px)"
          }} 
          transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }} 
          className="mt-3.5 text-[15px] text-white/85 max-w-[560px]"
        >
          Resultados reais, aplicáveis no dia a dia — sem fórmulas genéricas.
        </motion.p>
        <motion.p 
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }} 
          animate={{ 
            opacity: isInView ? 1 : 0, 
            y: isInView ? 0 : 40,
            filter: isInView ? "blur(0px)" : "blur(8px)"
          }} 
          transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }} 
          className="mt-2.5 text-sm text-white/65 max-w-[620px]"
        >
          Cada entrega é pensada para facilitar sua rotina, valorizar seus cachos e alinhar sua imagem pessoal com quem você é e com o que deseja comunicar.
        </motion.p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[660px]">
          {pills.map((pill, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }} 
              animate={{ 
                opacity: isInView ? 1 : 0, 
                scale: isInView ? 1 : 0.8,
                filter: isInView ? "blur(0px)" : "blur(10px)"
              }} 
              transition={{ 
                delay: 1.1 + idx * 0.15, 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1]
              }} 
              whileHover={{ 
                scale: 1.03, 
                borderColor: "rgba(255,255,255,0.25)",
                boxShadow: "0 10px 30px rgba(201,164,106,0.1)"
              }} 
              className="flex items-center gap-2.5 py-3.5 px-4 rounded-[14px] bg-black/45 border border-white/[0.12] backdrop-blur-[10px] cursor-default"
            >
              <motion.div 
                className="w-[7px] h-[7px] rounded-full bg-primary/90 shadow-[0_0_0_3px_rgba(201,164,106,.14)]" 
                animate={{ scale: [1, 1.3, 1] }} 
                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }} 
              />
              <span className="text-white text-sm">{pill}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Results;
