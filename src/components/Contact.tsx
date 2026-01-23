import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import grainImage from "@/assets/grain.png";

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const whatsappUrl = "https://wa.me/5592999999999?text=Oi%20Gideone!%20Quero%20agendar%20a%20consultoria%20de%20imagem%20e%20visagismo.";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.2, 0.8, 0.2, 1] as const
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 50, rotateY: -5 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 0.9,
        ease: [0.2, 0.8, 0.2, 1] as const
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      y: -2,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  const contactItems = [
    { label: "Atendimento:", value: "60 a 90 min • presencial ou híbrido" },
    { label: "Acompanhamento:", value: "até 60–90 dias (conforme o plano)" },
    { label: "Foco:", value: "praticidade + imagem alinhada" },
  ];

  return (
    <section
      ref={sectionRef}
      id="contato"
      className="relative py-[110px] overflow-hidden"
    >
      {/* Background */}
      <motion.div
        className="absolute z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 1.5 }}
        style={{
          inset: "-2px",
          background: `
            radial-gradient(900px 500px at 20% 20%, rgba(201,164,106,0.12), transparent 60%),
            radial-gradient(800px 420px at 80% 70%, rgba(255,255,255,0.06), transparent 65%),
            linear-gradient(180deg, #050505 0%, #000 45%, #050505 100%)
          `,
        }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "radial-gradient(700px 320px at 20% 30%, rgba(0,0,0,0.0), rgba(0,0,0,0.75) 70%)",
        }}
      />

      {/* Grain */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none opacity-10 mix-blend-overlay"
        style={{
          backgroundImage: `url(${grainImage})`,
          backgroundRepeat: "repeat",
          backgroundSize: "260px 260px",
        }}
      />

      <div className="relative z-[3] max-w-[1180px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_.9fr] gap-7">
          {/* Left - Copy */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.p 
              variants={itemVariants}
              className="flex items-center gap-3.5 text-[11px] tracking-[0.42em] uppercase text-primary mb-3.5"
            >
              <motion.span 
                className="h-px w-11 bg-gradient-to-r from-transparent via-primary/55 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isInView ? 1 : 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              CONTATO
              <motion.span 
                className="h-px w-11 bg-gradient-to-r from-transparent via-primary/55 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isInView ? 1 : 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </motion.p>

            <motion.h2 
              variants={itemVariants}
              className="font-serif font-semibold tracking-tight leading-[1.05] text-[clamp(28px,3.6vw,48px)] text-white"
            >
              Fechar a consultoria é simples.
            </motion.h2>

            <motion.p 
              variants={itemVariants}
              className="mt-3.5 max-w-[560px] text-white/70 text-[15px]"
            >
              Me chama no WhatsApp e eu te direciono para o melhor formato (presencial ou híbrido),
              com detalhes do acompanhamento.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="mt-5 flex gap-3 flex-wrap"
            >
              <motion.a
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine inline-flex items-center justify-center px-5 py-3 rounded-full text-sm text-[#0a0a0a] font-medium border border-primary/55"
                style={{
                  background: "linear-gradient(180deg, #f2e7d3 0%, #c5a060 100%)",
                  boxShadow: "0 12px 36px rgba(197,160,96,.22)",
                }}
              >
                Agendar no WhatsApp
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.98 }}
                href="https://instagram.com/seuinstagram"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-3 rounded-full text-sm text-white/90 bg-white/[0.03] border border-white/[0.12]"
              >
                Instagram →
              </motion.a>
            </motion.div>

            <ul className="mt-5 p-0 list-none grid gap-2.5">
              {contactItems.map((item, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -20 }}
                  transition={{ delay: 0.5 + idx * 0.1, duration: 0.5, ease: "easeOut" }}
                  className="flex gap-2.5 text-white/70 text-sm"
                >
                  <motion.div 
                    className="w-[7px] h-[7px] rounded-full mt-2 bg-primary/85 shadow-[0_0_0_3px_rgba(201,164,106,.12)]"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.4 }}
                  />
                  <span><strong className="text-white">{item.label}</strong> {item.value}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right - Card */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div 
              className="rounded-[18px] bg-white/[0.03] border border-white/10 overflow-hidden backdrop-blur-[10px]"
              whileHover={{ 
                borderColor: "rgba(255,255,255,0.18)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.4)"
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-5 border-b border-white/10">
                <motion.p 
                  className="m-0 text-[11px] tracking-[0.22em] uppercase text-primary/85"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isInView ? 1 : 0 }}
                  transition={{ delay: 0.7 }}
                >
                  Retorno rápido
                </motion.p>
                <motion.p 
                  className="mt-2 m-0 text-base text-white/90"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  Me chama e eu respondo ainda hoje.
                </motion.p>
              </div>

              <div className="p-2.5 grid gap-2">
                {[
                  { href: whatsappUrl, label: "WhatsApp", value: "Clique para abrir →", external: true },
                  { href: "mailto:seuemail@dominio.com", label: "E-mail", value: "seuemail@dominio.com" },
                  { href: "https://instagram.com/seuinstagram", label: "Instagram", value: "@seuinstagram", external: true },
                ].map((row, idx) => (
                  <motion.a
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
                    transition={{ delay: 0.6 + idx * 0.08, duration: 0.4, ease: "easeOut" }}
                    whileHover={{ scale: 1.02, y: -2, backgroundColor: "rgba(0,0,0,0.35)" }}
                    href={row.href}
                    target={row.external ? "_blank" : undefined}
                    rel={row.external ? "noopener noreferrer" : undefined}
                    className="flex justify-between gap-3.5 p-3 rounded-[14px] bg-black/20 border border-white/10 no-underline"
                  >
                    <span className="text-white/70 text-[13px]">{row.label}</span>
                    <span className="text-white/90 text-[13px]">{row.value}</span>
                  </motion.a>
                ))}

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
                  transition={{ delay: 0.84, duration: 0.4, ease: "easeOut" }}
                  className="flex justify-between gap-3.5 p-3 rounded-[14px] bg-black/20 border border-white/10"
                >
                  <span className="text-white/70 text-[13px]">Cidade</span>
                  <span className="text-white/90 text-[13px]">Manaus • AM</span>
                </motion.div>
              </div>

              <motion.div 
                className="p-4 pt-3.5 border-t border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 1 : 0 }}
                transition={{ delay: 1.2 }}
              >
                <p className="m-0 text-white/60 text-[13px] leading-relaxed">
                  Ao chamar no WhatsApp, você já recebe: <strong className="text-white">agenda</strong>, <strong className="text-white">valores</strong> e <strong className="text-white">como funciona</strong>.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
