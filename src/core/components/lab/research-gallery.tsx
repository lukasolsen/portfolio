import { motion } from "framer-motion";
import { backrandProject } from "@/data/backrand/backrand";

export const ResearchGallery = () => {
  const images = backrandProject.gallery?.images ?? [];

  return (
    <section className="w-full py-28 border-t border-border/30">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Section label */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-muted-foreground/40">07</span>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
              Generated Outputs
            </span>
          </div>

          <p className="text-[15px] text-muted-foreground leading-relaxed max-w-2xl">
            Every image on this page was produced by Backrand. No manual editing,
            no post-processing. These are raw outputs from the constrained
            generation pipeline, each created in under 200 milliseconds.
          </p>
        </motion.div>
      </div>

      {/* Full-bleed gallery */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-border/20">
        {images.map((image, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] overflow-hidden bg-background group"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-[11px] text-foreground/80 leading-snug">
                  {image.caption}
                </p>
                {image.credit && (
                  <p className="text-[9px] text-muted-foreground mt-1">
                    {image.credit}
                  </p>
                )}
              </div>
            </div>
          </motion.figure>
        ))}
      </div>
    </section>
  );
};
