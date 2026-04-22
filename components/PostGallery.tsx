"use client";

import Image from "next/image";
import { useState } from "react";
import ImageLightbox from "./ImageLightbox";

type PostGalleryProps = {
  images: string[];
  title: string;
};

export default function PostGallery({ images, title }: PostGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const closeLightbox = () => setActiveIndex(null);

  const showPrev = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex - 1 + images.length) % images.length);
  };

  const showNext = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % images.length);
  };

  return (
    <>
      <div className="detail-gallery">
        {images.map((img, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={
              index === 0
                ? "detail-image-wrap detail-image-main gallery-button"
                : "detail-image-wrap gallery-button"
            }
            aria-label={`Bild ${index + 1} vergrößern`}
          >
            <Image
              src={img}
              alt={`${title} ${index + 1}`}
              width={1400}
              height={900}
              className="detail-gallery-image"
            />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <ImageLightbox
          images={images}
          startIndex={activeIndex}
          title={title}
          onClose={closeLightbox}
          onPrev={showPrev}
          onNext={showNext}
        />
      )}
    </>
  );
}