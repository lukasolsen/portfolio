import { Header3, SmallText } from "@/components/typography/typography";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import clsx from "clsx";
import { ImageOff } from "lucide-react";

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  license?: string;
}

interface ProjectGalleryProps {
  images: GalleryImage[];
}

const FALLBACK_IMAGE = "https://www.svgrepo.com/show/451131/no-image.svg";

export const ProjectGallery = ({ images }: ProjectGalleryProps) => {
  const [openImage, setOpenImage] = useState<GalleryImage | null>(null);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  if (!images?.length) return null;

  const handleImageError = (src: string) => {
    setFailedImages((prev) => new Set(prev).add(src));
  };

  const isFallback = (src: string) => failedImages.has(src);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="my-8"
    >
      <Header3>Galleri</Header3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, i) => {
          const currentSrc = isFallback(image.src) ? FALLBACK_IMAGE : image.src;
          const isUsingFallback = isFallback(image.src);

          return (
            <motion.figure
              key={i}
              whileHover={isUsingFallback ? {} : { scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className={clsx(
                "overflow-hidden rounded-lg border border-border/50 bg-muted/5 backdrop-blur-sm flex flex-col",
                isUsingFallback ? "cursor-default" : "cursor-pointer"
              )}
              onClick={() => {
                if (!isUsingFallback) setOpenImage(image);
              }}
            >
              {!isUsingFallback ? (
                <img
                  src={currentSrc}
                  alt={image.alt || `Project image ${i + 1}`}
                  className="object-cover w-full h-64"
                  loading="lazy"
                  decoding="async"
                  onError={() => handleImageError(image.src)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-64 bg-linear-to-b from-muted/30 to-background/40">
                  <ImageOff className="w-10 h-10 text-muted-foreground/60 mb-2" />
                  <p className="text-sm text-muted-foreground font-medium">
                    Bilde utilgjengelig
                  </p>
                  <SmallText className="text-muted-foreground/60">
                    {image.alt || "Ingen tilgjengelig beskrivelse"}
                  </SmallText>
                </div>
              )}

              {(image.caption || image.credit || image.license) && (
                <figcaption className="p-3 text-sm text-muted-foreground border-t border-border/40 bg-background/50 backdrop-blur-sm">
                  {image.caption && (
                    <p className="text-foreground/90 leading-snug">
                      {image.caption}
                    </p>
                  )}
                  {(image.credit || image.license) && (
                    <SmallText className="mt-1 text-xs text-muted-foreground/70">
                      {image.credit && <span>© {image.credit}</span>}
                      {image.credit && image.license && <span> • </span>}
                      {image.license && <span>{image.license}</span>}
                    </SmallText>
                  )}
                </figcaption>
              )}
            </motion.figure>
          );
        })}
      </div>

      {/* Zoom / fullscreen modal */}
      <Dialog open={!!openImage} onOpenChange={() => setOpenImage(null)}>
        {openImage && (
          <DialogContent className="p-0 overflow-hidden bg-background/90 backdrop-blur-lg border border-border/40 max-w-5xl shadow-lg rounded-xl">
            <DialogHeader>
              <DialogTitle className="p-5 text-lg font-semibold text-foreground">
                {openImage.alt}
              </DialogTitle>
            </DialogHeader>

            <motion.img
              key={openImage.src}
              src={isFallback(openImage.src) ? FALLBACK_IMAGE : openImage.src}
              alt={openImage.alt}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={clsx("w-full h-auto object-contain", "max-h-[80vh]")}
              onError={() => handleImageError(openImage.src)}
            />
            {(openImage.caption || openImage.credit) && (
              <div className="p-5 text-center text-sm leading-relaxed text-foreground bg-background/80 backdrop-blur-md border-t border-border/40 rounded-b-xl">
                {openImage.caption && (
                  <p className="font-medium text-base">{openImage.caption}</p>
                )}
                {openImage.credit && (
                  <p className="text-xs mt-2 text-muted-foreground">
                    © {openImage.credit}
                  </p>
                )}
              </div>
            )}
          </DialogContent>
        )}
      </Dialog>
    </motion.section>
  );
};
