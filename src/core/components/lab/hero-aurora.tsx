import { motion } from "framer-motion";
import clsx from "clsx";

export const HeroAurora = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={clsx(
        "relative w-full overflow-hidden min-h-[60vh] flex items-center justify-center",
        className
      )}
    >
      {/* Animated gradient layers */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 20% 40%, oklch(0.45 0.25 280 / 0.6), transparent), radial-gradient(ellipse 60% 50% at 80% 60%, oklch(0.5 0.2 320 / 0.5), transparent), radial-gradient(ellipse 70% 40% at 50% 80%, oklch(0.55 0.18 200 / 0.4), transparent)",
          }}
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 2, -1, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 60% 30%, oklch(0.6 0.15 160 / 0.3), transparent), radial-gradient(ellipse 40% 30% at 30% 70%, oklch(0.5 0.2 40 / 0.3), transparent)",
          }}
          animate={{
            scale: [1.05, 1, 1.08, 1.05],
            rotate: [-1, 1, -2, -1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Noise overlay for texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-background/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8 text-center">
        {children}
      </div>
    </section>
  );
};
