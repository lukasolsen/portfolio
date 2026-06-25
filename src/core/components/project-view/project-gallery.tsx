import { Header3, SmallText } from "@/components/typography/typography";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import clsx from "clsx";
import { ImageOff, ChevronLeft, ChevronRight } from "lucide-react";

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

const ImageSkeleton = () => (
  <div className="w-full h-64 bg-muted/30 animate-pulse rounded-lg" />
);

export const ProjectGallery = ({ images }: ProjectGalleryProps) => {
  const [openImageIndex, setOpenImageIndex] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  if (!images?.length) return null;

  const handleImageError = (src: string) => {
    setFailedImages((prev) => new Set(prev).add(src));
  };

  const handleImageLoad = (src: string) => {
    setLoadedImages((prev) => new Set(prev).add(src));
  };

  const isFallback = (src: string) => failedImages.has(src);
  const isLoaded = (src: string) => loadedImages.has(src);

  const openImage = openImageIndex !== null ? images[openImageIndex] : null;

  const goToNext = useCallback(() => {
    if (openImageIndex === null) return;
    setOpenImageIndex((prev) =>
      prev === null ? null : (prev + 1) % images.length
    );
  }, [openImageIndex, images.length]);

  const goToPrev = useCallback(() => {
    if (openImageIndex === null) return;
    setOpenImageIndex((prev) =>
      prev === null ? null : (prev - 1 + images.length) % images.length
    );
  }, [openImageIndex, images.length]);

  useEffect(() => {
    if (openImageIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "Escape") setOpenImageIndex(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openImageIndex, goToNext, goToPrev]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="my-8"
    >
      <Header3>Gallery</Header3>

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
                "overflow-hidden rounded-lg border border-border/50 bg-muted/5 backdrop-blur-sm flex flex-col group",
                isUsingFallback ? "cursor-default" : "cursor-pointer"
              )}
              onClick={() => {
                if (!isUsingFallback) setOpenImageIndex(i);
              }}
            >
              <div className="relative w-full h-64 overflow-hidden">
                {!isLoaded(image.src) && !isUsingFallback && (
                  <ImageSkeleton />
                )}
                {!isUsingFallback ? (
                  <>
                    <img
                      src={currentSrc}
                      alt={image.alt || `Project image ${i + 1}`}
                      className={clsx(
                        "object-cover w-full h-full transition-all duration-500",
                        isLoaded(image.src)
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-105"
                      )}
                      loading="lazy"
                      decoding="async"
                      onError={() => handleImageError(image.src)}
                      onLoad={() => handleImageLoad(image.src)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-full bg-linear-to-b from-muted/30 to-background/40">
                    <ImageOff className="w-10 h-10 text-muted-foreground/60 mb-2" />
                    <p className="text-sm text-muted-foreground font-medium">
                      Image unavailable
                    </p>
                    <SmallText className="text-muted-foreground/60">
                      {image.alt || "No description available"}
                    </SmallText>
                  </div>
                )}
              </div>

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

      {/* Lightbox modal */}
      <Dialog
        open={openImageIndex !== null}
        onOpenChange={() => setOpenImageIndex(null)}
      >
        {openImage && (
          <DialogContent className="p-0 overflow-hidden bg-background/90 backdrop-blur-lg border border-border/40 max-w-5xl shadow-lg rounded-xl">
            <DialogHeader>
              <DialogTitle className="p-5 text-lg font-semibold text-foreground flex items-center justify-between">
                <span>{openImage.alt}</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {openImageIndex !== null && (
                    <>{openImageIndex + 1} / {images.length}</>
                  )}
                </span>
              </DialogTitle>
            </DialogHeader>

            <div className="relative group/lightbox">
              <motion.img
                key={openImage.src}
                src={
                  isFallback(openImage.src) ? FALLBACK_IMAGE : openImage.src
                }
                alt={openImage.alt}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={clsx(
                  "w-full h-auto object-contain",
                  "max-h-[70vh]"
                )}
                onError={() => handleImageError(openImage.src)}
              />

              {/* Navigation arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/40 flex items-center justify-center opacity-0 group-hover/lightbox:opacity-100 transition-opacity duration-200 hover:bg-background/95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/40 flex items-center justify-center opacity-0 group-hover/lightbox:opacity-100 transition-opacity duration-200 hover:bg-background/95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

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
