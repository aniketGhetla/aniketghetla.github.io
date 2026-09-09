import { useCallback, useEffect, useRef, useState } from "react";
import "./Carousel.scss";

export type Slide = { src: string; alt: string };

type CarouselProps = {
  slides: Slide[];
  interval?: number;
  onExpand?: (index: number) => void;
};

const Carousel = ({ slides, interval = 3500, onExpand }: CarouselProps) => {
  const [index, setIndex] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const visibleRef = useRef(true);

  const go = useCallback(
    (dir: number) => {
      setIndex((i) => (i + dir + slides.length) % slides.length);
    },
    [slides.length]
  );

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const io = new IntersectionObserver(
      ([e]) => {
        visibleRef.current = e.isIntersecting;
      },
      { threshold: 0.25 }
    );
    if (wrapRef.current) io.observe(wrapRef.current);

    let timer = 0;
    if (!reduced) {
      timer = window.setInterval(() => {
        if (!pausedRef.current && visibleRef.current) {
          setIndex((i) => (i + 1) % slides.length);
        }
      }, interval);
    }

    return () => {
      window.clearInterval(timer);
      io.disconnect();
    };
  }, [slides.length, interval]);

  return (
    <div
      className="carousel"
      ref={wrapRef}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
      onFocusCapture={() => (pausedRef.current = true)}
      onBlurCapture={() => (pausedRef.current = false)}
    >
      <div className="carousel__stage">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            className={`carousel__slide ${i === index ? "is-active" : ""}`}
            aria-hidden={i !== index}
            tabIndex={i === index ? 0 : -1}
            onClick={() => onExpand?.(i)}
            aria-label={`${s.alt}, open full size`}
          >
            <img src={s.src} alt={s.alt} loading="lazy" />
          </button>
        ))}

        <button
          type="button"
          className="carousel__nav carousel__nav--prev"
          aria-label="Previous view"
          onClick={() => go(-1)}
        >
          &#8249;
        </button>
        <button
          type="button"
          className="carousel__nav carousel__nav--next"
          aria-label="Next view"
          onClick={() => go(1)}
        >
          &#8250;
        </button>
      </div>

      <div className="carousel__dots">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            className={`carousel__dot ${i === index ? "is-active" : ""}`}
            aria-label={`View ${i + 1} of ${slides.length}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
