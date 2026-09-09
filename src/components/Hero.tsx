import "./Hero.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import heroVideo from "../assets/video/hero-touch.mp4";
import heroPoster from "../assets/images/hero-poster.jpg";

// The moment (seconds) the ball settles at his feet.
const FREEZE_AT = 5.4;

// Where the marker points, as a fraction 0–1 of the SOURCE video frame
// (his chest at the freeze). Independent of how the band is cropped.
const MARKER_SOURCE = { x: 0.715, y: 0.725 };

// object-position of the <video>, as fractions 0–1. Kept here so the marker
// maths and the CSS crop always use the same numbers (set inline below).
const OBJECT_POSITION = { x: 0.82, y: 0.92 };

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const wasVisible = useRef(false);
  const [showMarker, setShowMarker] = useState(false);
  const [markerPos, setMarkerPos] = useState({ left: 68, top: 26 });

  // Given the video's rendered box, work out where MARKER_SOURCE lands on
  // screen (object-fit: cover crops the source, so a fixed % would drift).
  const recalcMarker = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.videoWidth || !video.videoHeight) return;

    const cw = video.clientWidth;
    const ch = video.clientHeight;
    const vw = video.videoWidth;
    const vh = video.videoHeight;

    const scale = Math.max(cw / vw, ch / vh);
    const rw = vw * scale;
    const rh = vh * scale;
    const offsetX = (rw - cw) * OBJECT_POSITION.x;
    const offsetY = (rh - ch) * OBJECT_POSITION.y;

    const left = ((MARKER_SOURCE.x * rw - offsetX) / cw) * 100;
    const top = ((MARKER_SOURCE.y * rh - offsetY) / ch) * 100;
    setMarkerPos({ left, top });
  }, []);

  // Freeze the clip once it reaches FREEZE_AT, then reveal the marker.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTimeUpdate = () => {
      if (video.currentTime >= FREEZE_AT) {
        video.currentTime = FREEZE_AT;
        video.pause();
        recalcMarker();
        setShowMarker(true);
      }
    };
    video.addEventListener("timeupdate", onTimeUpdate);
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, [recalcMarker]);

  // Keep the marker aligned through resizes.
  useEffect(() => {
    const onResize = () => recalcMarker();
    window.addEventListener("resize", onResize);
    let ro: ResizeObserver | undefined;
    if (bandRef.current && "ResizeObserver" in window) {
      ro = new ResizeObserver(onResize);
      ro.observe(bandRef.current);
    }
    return () => {
      window.removeEventListener("resize", onResize);
      ro?.disconnect();
    };
  }, [recalcMarker]);

  // Replay from the top every time the hero comes back into view.
  useEffect(() => {
    const node = bandRef.current;
    const video = videoRef.current;
    if (!node || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !wasVisible.current) {
          setShowMarker(false);
          video.currentTime = 0;
          const p = video.play();
          if (p) p.catch(() => {});
        }
        wasVisible.current = entry.isIntersecting;
      },
      { threshold: 0.5 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero" id="hero">
      <div className="hero__band" ref={bandRef}>
        <video
          ref={videoRef}
          className="hero__video"
          src={heroVideo}
          poster={heroPoster}
          style={{
            objectPosition: `${OBJECT_POSITION.x * 100}% ${
              OBJECT_POSITION.y * 100
            }%`,
          }}
          muted
          playsInline
          autoPlay
          preload="auto"
          aria-label="Aniket controlling a football on the pitch"
        />

        <div className="hero__scrim" />

        <button
          className={`hero__marker ${showMarker ? "is-visible" : ""}`}
          style={{ left: `${markerPos.left}%`, top: `${markerPos.top}%` }}
          onClick={scrollToAbout}
          aria-label="Get to know Aniket, jump to the About section"
        >
          <span className="hero__marker-ring" />
          <span className="hero__marker-dot" />
          <span className="hero__marker-tag">Click to know more</span>
        </button>

        <div className="hero__band-text">
          <h1 className="hero__name">Aniket Ghetla</h1>
          <p className="hero__role">Football Data Scientist &amp; Analyst</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
