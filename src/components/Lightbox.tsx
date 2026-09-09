import { useEffect, useRef } from "react";
import "./Lightbox.scss";

type LightboxProps = {
  src: string;
  alt: string;
  caption?: string;
  onClose: () => void;
};

// A minimal image lightbox: full-bleed overlay, Esc / backdrop / button to
// close, focus moved in and restored on unmount, background scroll locked.
const Lightbox = ({ src, alt, caption, onClose }: LightboxProps) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    returnFocusRef.current = document.activeElement as HTMLElement;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      returnFocusRef.current?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
    >
      <button
        ref={closeRef}
        className="lightbox__close"
        onClick={onClose}
        aria-label="Close preview"
      >
        &times;
      </button>
      <figure className="lightbox__figure" onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={alt} />
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    </div>
  );
};

export default Lightbox;
