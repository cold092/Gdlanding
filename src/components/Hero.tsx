import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroImage from "@/assets/foto-hero.jpg";
import grainImage from "@/assets/grain.png";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // Text scroll zoom effect
  const textScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -30]);
  const subtitleScale = useTransform(scrollYProgress, [0, 0.35], [1, 1.08]);
  const subtitleY = useTransform(scrollYProgress, [0, 0.35], [0, -20]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header ref={heroRef} className="relative overflow-hidden bg-black">
      <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundPosition: "center 35%",
            y: heroY,
            scale: heroScale,
          }}
          initial={{ opacity: 0, scale: 2.5, filter: "blur(40px)" }}
          animate={{ 
            opacity: isLoaded ? 1 : 0, 
            scale: isLoaded ? 1 : 2.5,
            filter: isLoaded ? "blur(0px)" : "blur(40px)"
          }}
          transition={{ 
            duration: 2.8, 
            ease: [0.16, 1, 0.3, 1],
            opacity: { duration: 1.5, delay: 0.2 },
            scale: { duration: 3, ease: [0.16, 1, 0.3, 1] },
            filter: { duration: 2.5, delay: 0.3 }
          }}
        />

        <div className="absolute inset-0 z-[1]" style={{
          background: `linear-gradient(to right, rgba(0,0,0,.92) 0%, rgba(0,0,0,.70) 40%, rgba(0,0,0,.25) 70%, rgba(0,0,0,.05) 100%),
            linear-gradient(to bottom, rgba(0,0,0,.45) 0%, rgba(0,0,0,.85) 90%)`
        }} />

        <div className="grain-overlay z-[2]" style={{ backgroundImage: `url(${grainImage})` }} />

        <motion.div 
          className="relative z-[3] max-w-[780px] px-6 pt-[60px] mx-auto lg:mx-0 lg:ml-[10%]"
          style={{ opacity: heroOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.8, staggerChildren: 0.12 }}
        >
          <motion.p 
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ 
              opacity: isLoaded ? 1 : 0, 
              y: isLoaded ? 0 : 40,
              filter: isLoaded ? "blur(0px)" : "blur(10px)"
            }}
            transition={{ 
              duration: 1.2, 
              delay: 0.6, 
              ease: [0.16, 1, 0.3, 1]
            }}
            className="flex items-center gap-3.5 text-[11px] tracking-[0.42em] uppercase text-primary mb-3.5"
          >
            <motion.span 
              className="h-px w-11 bg-gradient-to-r from-transparent via-primary/55 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isLoaded ? 1 : 0 }}
              transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
            CONSULTORIA DE IMAGEM & VISAGISMO
            <motion.span 
              className="h-px w-11 bg-gradient-to-r from-transparent via-primary/55 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isLoaded ? 1 : 0 }}
              transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.p>

          <motion.h1 
            initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
            animate={{ 
              opacity: isLoaded ? 1 : 0, 
              y: isLoaded ? 0 : 60,
              filter: isLoaded ? "blur(0px)" : "blur(12px)"
            }}
            transition={{ 
              duration: 1.4, 
              delay: 0.9, 
              ease: [0.16, 1, 0.3, 1]
            }}
            style={{ scale: textScale, y: textY }}
            className="font-serif font-semibold tracking-tight leading-[1.05] text-[clamp(36px,5vw,60px)] text-white origin-left"
          >
            <motion.span 
              className="inline-block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
              transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Cabelos Cacheados Masculinos.
            </motion.span>
            <br />
            <motion.span 
              className="inline-block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
              transition={{ duration: 1, delay: 1.25, ease: [0.16, 1, 0.3, 1] }}
            >
              Diagnóstico. Direcionamento.
            </motion.span>
            <br />
            <motion.span 
              className="inline-block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
              transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            >
              Identidade Visual.
            </motion.span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            animate={{ 
              opacity: isLoaded ? 1 : 0, 
              y: isLoaded ? 0 : 40,
              filter: isLoaded ? "blur(0px)" : "blur(8px)"
            }}
            transition={{ 
              duration: 1.2, 
              delay: 1.6, 
              ease: [0.16, 1, 0.3, 1]
            }}
            style={{ scale: subtitleScale, y: subtitleY }}
            className="text-white/70 max-w-[60ch] mt-4 origin-left"
          >
            Consultoria especializada para homens que desejam alinhar corte, finalização e imagem pessoal
            de forma estratégica e funcional.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
            transition={{ 
              duration: 1, 
              delay: 1.9, 
              ease: [0.16, 1, 0.3, 1]
            }}
            className="mt-6 flex gap-4 flex-wrap"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
              transition={{ duration: 0.8, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ 
                scale: 1.05, 
                y: -3,
                boxShadow: "0 20px 50px rgba(197,160,96,.35)"
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection("contato")}
              className="btn-shine inline-flex items-center justify-center px-5 py-3 rounded-full text-sm text-[#0a0a0a] font-medium border border-primary/55"
              style={{
                background: "linear-gradient(180deg, #f2e7d3 0%, #c5a060 100%)",
                boxShadow: "0 12px 36px rgba(197,160,96,.22)",
              }}
            >
              Agendar consultoria
            </motion.button>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 2.3, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ x: 8, color: "#ffffff" }}
              onClick={() => scrollToSection("como-funciona")}
              className="text-white/85 font-semibold text-sm hover:text-white transition-colors"
            >
              Entender o método →
            </motion.button>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 0.55 : 0 }}
            transition={{ duration: 1.5, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-white/55 text-[13px]"
          >
            Gideone Oliveira • {new Date().getFullYear()}
          </motion.p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.65, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          whileHover={{ opacity: 1, scale: 1.1 }}
          onClick={() => scrollToSection("experiencia")}
          className="absolute left-1/2 bottom-[22px] -translate-x-1/2 w-[34px] h-[34px] rounded-full border border-white/20 grid place-items-center z-10"
          aria-label="Rolar"
        >
          <motion.span 
            className="w-0.5 h-2.5 bg-white/60 rounded-sm"
            animate={{ y: ["-3px", "3px", "-3px"] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.button>
      </section>
    </header>
  );
};

export default Hero;
