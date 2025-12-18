"use client";

import { urlFor } from "@/sanity/lib/image";
import { TSanityImageWithAlt } from "@/sanity/models/SanityImageWithAlt";

import Image from "next/image";
import React, { useState } from "react";
import styles from "./gallery.module.css";
import { useT } from "@/locales/utils/useT";
import GalleryModal from "./GalleryModal";

interface GalleryProps {
  images: TSanityImageWithAlt[];
  postTitle: string;
  lang: string;
}

const Gallery: React.FC<GalleryProps> = ({ images, postTitle, lang }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const t = useT({ lang });

  if (!images || images.length === 0) return null;

  // Prepare gallery images for modal
  const galleryImages = images.map((img) => ({
    url: urlFor(img).width(1200).height(900).url(),
    alt: img.alt || postTitle,
  }));

  return (
    <>
      <div className={styles["gallery-grid"]}>
        {images.map((img, idx) => (
          <button
            key={idx}
            style={{
              border: 0,
              padding: 0,
              background: "none",
              cursor: "pointer",
              borderRadius: 6,
              overflow: "hidden",
              boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
            }}
            aria-label={img.alt || postTitle}
            title={t("gallery.thumbnail_tooltip")}
            onClick={() => {
              setSelectedIndex(idx);
              setModalOpen(true);
            }}
          >
            <Image
              src={urlFor(img).width(300).height(200).url()}
              alt={img.alt || postTitle}
              width={300}
              height={200}
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
              loading="lazy"
            />
          </button>
        ))}
      </div>
      {modalOpen && (
        <GalleryModal
          images={galleryImages}
          currentIndex={selectedIndex}
          onClose={() => setModalOpen(false)}
          onPrev={() => setSelectedIndex((i) => (i > 0 ? i - 1 : i))}
          onNext={() =>
            setSelectedIndex((i) => (i < galleryImages.length - 1 ? i + 1 : i))
          }
          isMobile={isMobile}
        />
      )}
    </>
  );
};

export default Gallery;
