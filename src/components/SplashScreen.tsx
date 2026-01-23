import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  isVisible: boolean;
}

const SplashScreen = ({ isVisible }: SplashScreenProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: "blur(20px)"
          }}
          transition={{ 
            duration: 1.2, 
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          {/* Background glow */}
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(201,164,106,0.15) 0%, transparent 70%)"
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.5, 1.2],
              opacity: [0, 0.8, 0.4]
            }}
            transition={{ 
              duration: 2,
              ease: [0.16, 1, 0.3, 1]
            }}
          />

          {/* Main content */}
          <div className="relative flex flex-col items-center">
            {/* Logo/Brand mark */}
            <motion.div
              className="relative"
              initial={{ scale: 2.5, opacity: 0, filter: "blur(30px)" }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                filter: "blur(0px)"
              }}
              transition={{ 
                duration: 1.8,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <motion.span 
                className="text-4xl md:text-5xl font-serif font-semibold text-white tracking-tight"
                initial={{ y: 30 }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                Gideone
              </motion.span>
              <motion.span 
                className="text-4xl md:text-5xl font-serif font-semibold text-primary tracking-tight ml-2"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                Oliveira
              </motion.span>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="mt-4 text-[11px] tracking-[0.4em] uppercase text-white/50"
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Consultoria de Imagem
            </motion.p>

            {/* Loading bar */}
            <motion.div
              className="mt-8 w-[120px] h-[2px] bg-white/10 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary/60 via-primary to-primary/60 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ 
                  duration: 1.5, 
                  delay: 1,
                  ease: [0.16, 1, 0.3, 1]
                }}
              />
            </motion.div>
          </div>

          {/* Corner accents */}
          <motion.div
            className="absolute top-8 left-8 w-12 h-12 border-l border-t border-primary/20"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-primary/20"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
