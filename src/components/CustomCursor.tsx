import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select")) {
        setIsHovering(true);
      }
    };

    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleHoverStart);
    document.addEventListener("mouseout", handleHoverEnd);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleHoverStart);
      document.removeEventListener("mouseout", handleHoverEnd);
    };
  }, [cursorX, cursorY, isVisible]);

  // Hide on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      >
        <div 
          className="w-3 h-3 rounded-full"
          style={{
            background: "linear-gradient(135deg, hsl(37 41% 70%) 0%, hsl(37 41% 50%) 100%)",
            boxShadow: isHovering 
              ? "0 0 20px 8px rgba(201, 164, 106, 0.5), 0 0 40px 16px rgba(201, 164, 106, 0.25)"
              : "0 0 10px 4px rgba(201, 164, 106, 0.4), 0 0 20px 8px rgba(201, 164, 106, 0.15)",
          }}
        />
      </motion.div>

      {/* Outer ring with glow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.8 : 1,
          opacity: isVisible ? 0.6 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div 
          className="w-8 h-8 rounded-full border border-primary/40"
          style={{
            boxShadow: "0 0 15px 3px rgba(201, 164, 106, 0.2)",
          }}
        />
      </motion.div>

      {/* Glow trail effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        animate={{
          x: mousePosition.x - 30,
          y: mousePosition.y - 30,
          opacity: isVisible ? 0.3 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div 
          className="w-[60px] h-[60px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(201, 164, 106, 0.15) 0%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />
      </motion.div>

      {/* Global cursor hiding */}
      <style>{`
        * { cursor: none !important; }
        a, button, [role="button"], input, textarea, select { cursor: none !important; }
      `}</style>
    </>
  );
};

export default CustomCursor;
