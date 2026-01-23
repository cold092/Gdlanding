import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer 
      className="py-7 border-t border-white/10 text-white/55 text-[13px]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-[1180px] mx-auto px-6">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          © {new Date().getFullYear()} Gideone Oliveira • Consultoria de Imagem & Visagismo
        </motion.span>
      </div>
    </motion.footer>
  );
};

export default Footer;
