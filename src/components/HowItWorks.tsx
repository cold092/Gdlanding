import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const steps = [
  "Diagnóstico técnico do fio e couro cabeludo",
  "Análise visagista facial",
  "Direcionamento de corte e volume",
  "Orientação de finalização e cuidados",
  "Plano de manutenção personalizado",
];

const headlines = [
  "Um diagnóstico claro.",
  "Direção do corte e volume.",
  "Rotina simples e eficiente.",
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState(0);
  const [activeHeadline, setActiveHeadline] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => setActiveHeadline((prev) => (prev + 1) % headlines.length), 2600);
    return () => clearInterval(interval);
  }, [isInView]);

  useEffect(() => {
    if (!isInView) return;
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (rect.height + window.innerHeight)));
      setActiveStep(Math.min(Math.floor(progress * steps.length * 1.5), steps.length - 1));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isInView]);

  const progress = ((activeStep + 1) / steps.length) * 100;

  return (
    <section ref={sectionRef} id="como-funciona" className="relative isolate overflow-hidden bg-black py-24">
      <div className="absolute z-0 pointer-events-none" style={{
        inset: "-2px",
        background: `radial-gradient(900px 520px at 20% 18%, rgba(255,255,255,.03), transparent 60%),
          radial-gradient(720px 420px at 70% 62%, rgba(201,164,106,.06), transparent 68%),
          linear-gradient(to bottom, #000 0%, #040404 55%, #000 100%)`
      }} />

      <div className="relative z-[3] max-w-[1180px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          <div>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex items-center gap-3.5 text-[11px] tracking-[0.42em] uppercase text-primary mb-3.5"
            >
              <span className="h-px w-11 bg-gradient-to-r from-transparent via-primary/55 to-transparent" />
              COMO FUNCIONA
              <span className="h-px w-11 bg-gradient-to-r from-transparent via-primary/55 to-transparent" />
            </motion.p>

            <div className="font-serif font-semibold tracking-tight leading-[1.05] text-[clamp(28px,3.6vw,48px)] text-white relative h-[1.4em]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeHeadline}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  {headlines[activeHeadline]}
                </motion.span>
              </AnimatePresence>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-white/70 max-w-[60ch] mt-4"
            >
              Um atendimento completo para alinhar técnica do fio + visagismo facial e deixar sua rotina prática.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 w-[180px]"
            >
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(to right, rgba(201,164,106,.2), rgba(201,164,106,.85))" }}
                  animate={{ scaleX: progress / 100 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <motion.div 
              className="border border-white/10 bg-white/[0.03] backdrop-blur-xl rounded-[18px] p-4 shadow-[0_18px_60px_rgba(0,0,0,.55)]"
              whileHover={{ borderColor: "rgba(255,255,255,0.15)" }}
            >
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 20 }}
                  transition={{ delay: 0.4 + idx * 0.1, duration: 0.5, ease: "easeOut" }}
                  className={`flex gap-3 py-3.5 px-2 ${idx !== steps.length - 1 ? "border-b border-white/10" : ""}`}
                  style={{ opacity: idx === activeStep ? 1 : 0.5 }}
                >
                  <motion.div 
                    className="w-2 h-2 rounded-full mt-2 shadow-[0_0_0_3px_rgba(201,164,106,.12)]"
                    animate={{ backgroundColor: idx === activeStep ? "rgba(201,164,106,0.9)" : "rgba(201,164,106,0.4)", scale: idx === activeStep ? 1.2 : 1 }}
                  />
                  <p className="m-0 text-sm text-white/85"><b>{idx + 1}.</b> {step}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
