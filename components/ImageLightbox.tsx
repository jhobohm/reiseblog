"use client";

import Image from "next/image";
import { useEffect } from "react";

type ImageLightboxProps = {
  images: string[];
  startIndex: number;
  title: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function ImageLightbox({
  images,
  startIndex,
  title,
  onClose,
  onPrev,
  onNext,
}: ImageLightboxProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev();
      if (event.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div
        className="lightbox-content"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="lightbox-close"
          onClick={onClose}
          aria-label="Lightbox schließen"
        >
          ×
        </button>

        {images.length > 1 && (
          <>
            <button
              type="button"
              className="lightbox-nav lightbox-nav-left"
              onClick={onPrev}
              aria-label="Vorheriges Bild"
            >
              ‹
            </button>

            <button
              type="button"
              className="lightbox-nav lightbox-nav-right"
              onClick={onNext}
              aria-label="Nächstes Bild"
            >
              ›
            </button>
          </>
        )}

        <div className="lightbox-image-wrap">
          <Image
            src={images[startIndex]}
            alt={`${title} ${startIndex + 1}`}
            width={1600}
            height={1100}
            className="lightbox-image"
          />
        </div>

        <div className="lightbox-caption">
          {title} · Bild {startIndex + 1} von {images.length}
        </div>
      </div>
    </div>
  );
}