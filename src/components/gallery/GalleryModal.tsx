import React, { useEffect, useRef } from "react";
import Image from "next/image";

interface GalleryModalProps {
  images: Array<{ url: string; alt: string }>;
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  isMobile: boolean;
}

const GalleryModal: React.FC<GalleryModalProps> = ({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  isMobile,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap and escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  // Click outside to close (desktop only)
  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!isMobile && e.target === overlayRef.current) {
      onClose();
    }
  }

  // Focus close button on open (mobile)
  useEffect(() => {
    if (isMobile && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isMobile]);

  if (!images[currentIndex]) return null;

  return (
    <div
      ref={overlayRef}
      className="gallery-modal-overlay"
      onClick={handleOverlayClick}
      tabIndex={-1}
      aria-modal="true"
      role="dialog"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        className="gallery-modal-content"
        style={{
          position: "relative",
          maxWidth: isMobile ? "100vw" : "min(90vw, 1200px)",
          maxHeight: isMobile ? "100vh" : "min(80vh, 900px)",
          width: isMobile ? "100vw" : "min(90vw, 1200px)",
          height: isMobile ? "100vh" : "min(80vh, 900px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isMobile && (
          <button
            ref={closeButtonRef}
            aria-label="Close gallery"
            onClick={onClose}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              background: "rgba(0,0,0,0.7)",
              border: "none",
              color: "#fff",
              fontSize: 32,
              borderRadius: "50%",
              width: 48,
              height: 48,
              cursor: "pointer",
              zIndex: 2,
            }}
          >
            ×
          </button>
        )}
        <button
          aria-label="Previous image"
          onClick={onPrev}
          style={{
            position: "absolute",
            left: 8,
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: 40,
            cursor: "pointer",
            zIndex: 2,
            display: currentIndex === 0 ? "none" : undefined,
          }}
          tabIndex={0}
        >
          ‹
        </button>
        <Image
          src={images[currentIndex].url}
          alt={images[currentIndex].alt}
          width={isMobile ? 800 : 1200}
          height={isMobile ? 800 : 900}
          style={{
            maxWidth: isMobile ? "100vw" : "min(90vw, 1200px)",
            maxHeight: isMobile ? "100vh" : "min(80vh, 900px)",
            width: isMobile ? "100vw" : "min(90vw, 1200px)",
            height: isMobile ? "100vh" : "min(80vh, 900px)",
            objectFit: "contain",
            borderRadius: 8,
            boxShadow: "0 2px 16px rgba(0,0,0,0.5)",
          }}
          priority
        />
        <button
          aria-label="Next image"
          onClick={onNext}
          style={{
            position: "absolute",
            right: 8,
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: 40,
            cursor: "pointer",
            zIndex: 2,
            display: currentIndex === images.length - 1 ? "none" : undefined,
          }}
          tabIndex={0}
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default GalleryModal;
