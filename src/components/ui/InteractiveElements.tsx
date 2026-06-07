import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import React, { useRef } from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
}

export const GlassCard = ({ children, className = "", tilt = true }: GlassCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: tilt ? rotateX : 0,
        rotateY: tilt ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className={`glass rounded-2xl p-6 relative overflow-hidden group border border-white/10 backdrop-blur-2xl ${className}`}
    >
      {/* Animated Border Sweep */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 border border-white/5" />
        <motion.div 
          className="absolute inset-[1px] opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            border: "1px solid transparent",
            borderImage: "linear-gradient(to right, transparent, var(--color-neon-cyan), transparent) 1",
            maskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
            maskComposite: "exclude",
          }}
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* HUD Corner Accents */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-neon-cyan/20 group-hover:border-neon-cyan transition-all duration-500 scale-90 group-hover:scale-100" />
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-white/5 group-hover:border-neon-purple transition-all duration-500 scale-90 group-hover:scale-100" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-white/5 group-hover:border-neon-purple transition-all duration-500 scale-90 group-hover:scale-100" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-neon-cyan/20 group-hover:border-neon-cyan transition-all duration-500 scale-90 group-hover:scale-100" />

      {/* Futuristic Grid Substratum */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }} 
      />

      {/* Dynamic Light Glare */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none mix-blend-overlay" />

      {/* Texture & Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.05] mix-blend-soft-light pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div style={{ transform: "translateZ(60px)" }} className="relative z-10 w-full h-full">
        {children}
      </div>
      
      {/* Dynamic Hover Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 via-transparent to-neon-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      {/* Scanning Line Effect */}
      <motion.div 
        className="absolute inset-x-0 h-2 bg-gradient-to-b from-transparent via-neon-cyan/10 to-transparent pointer-events-none z-0"
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
};

export const MagneticButton: React.FC<{ children: React.ReactNode, className?: string, onClick?: () => void }> = ({ children, className = "", onClick }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set(clientX - centerX);
    y.set(clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      className={`relative px-6 py-3 rounded-full font-medium transition-all duration-300 ${className}`}
    >
      {children}
    </motion.button>
  );
};

export const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 500, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 28 });

  React.useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-neon-cyan rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-neon-cyan rounded-full pointer-events-none z-[9999]"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
};
