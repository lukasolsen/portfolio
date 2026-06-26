import { motion } from "framer-motion";
import { backgradProject } from "@/data/backrand/backrand";
import { Link } from "@tanstack/react-router";

const PREVIEW_COUNT = 6;

export const BackgradGallery = () => {
  const allImages = backgradProject.gallery?.images ?? [];
  const images = allImages.slice(0, PREVIEW_COUNT);
  const hasMore = allImages.length > PREVIEW_COUNT;

  return (
    <section className="w-full py-20 border-t border-border/30">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-muted-foreground/40">02</span>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
                Gallery
              </span>
            </div>
            {hasMore && (
              <Link
                to="/projects/backgrad/gallery"
                className="group inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                View all {allImages.length}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="group-hover:translate-x-0.5 transition-transform"
                >
                  <path d="M2 6h7M7 2l3 4-3 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            )}
          </div>

          <p className="text-base text-foreground leading-relaxed max-w-2xl">
            Every image on this page was produced by Backgrad. No manual editing,
            no post-processing. Raw outputs from the generation pipeline.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {images.map((image, i) => (
              <motion.a
                key={i}
                href="/projects/backgrad/gallery"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="group relative aspect-4/3 overflow-hidden rounded-lg bg-muted/30 border border-border/15 block"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-background/80 backdrop-blur-sm text-[9px] font-mono text-muted-foreground border border-border/20">
                    Generated
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
