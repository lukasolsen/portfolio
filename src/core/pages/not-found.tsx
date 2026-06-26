import type { FC } from "react";
import { motion } from "framer-motion";

export const NotFound: FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[85vh] px-6 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-[0.08]"
          style={{
            background: "radial-gradient(circle, #d97757 0%, transparent 70%)",
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, #eda100 0%, transparent 70%)",
          }}
          animate={{
            x: [0, -25, 15, 0],
            y: [0, 25, -15, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Floating dots */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative text-center"
      >
        {/* 404 number */}
        <motion.div
          className="font-semibold tracking-tighter text-primary/90 leading-none mb-6"
          style={{
            fontSize: "clamp(5rem, 4rem + 5vw, 10rem)",
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="inline-block">4</span>
          <motion.span
            className="inline-block"
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            0
          </motion.span>
          <span className="inline-block">4</span>
        </motion.div>

        {/* Divider line */}
        <motion.div
          className="w-12 h-px bg-primary/40 mx-auto mb-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />

        {/* Message */}
        <motion.p
          className="text-foreground font-medium text-lg md:text-xl tracking-tight mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Page not found
        </motion.p>

        <motion.p
          className="text-muted-foreground text-sm md:text-base mb-10 max-w-sm mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>

        {/* Back link */}
        <motion.a
          href="/"
          className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <span className="underline decoration-border/40 underline-[0.2em] underline-offset-[0.2em] group-hover:decoration-primary/60 transition-colors">
            Back to home
          </span>
          <motion.span
            className="text-muted-foreground/40 group-hover:text-primary/60 transition-colors"
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </motion.a>
      </motion.div>
    </div>
  );
};
