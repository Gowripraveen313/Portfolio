import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

const ThemeCursorFollower = () => {
  const { customCursor } = useTheme();
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const ambientGlowRef = useRef<HTMLDivElement>(null);
  
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch screens to prevent rendering custom cursor on mobile devices
    const detectTouch = () => {
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(hasTouch);
    };
    detectTouch();

    if (!customCursor || isTouchDevice) return;

    const cursorDot = cursorDotRef.current;
    const cursorOutline = cursorOutlineRef.current;
    const ambientGlow = ambientGlowRef.current;

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    let glowX = 0;
    let glowY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (isHidden) setIsHidden(false);
    };

    const onMouseEnter = () => setIsHidden(false);
    const onMouseLeave = () => setIsHidden(true);
    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isHoverable =
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".nav-link") ||
        target.closest(".skill-card") ||
        target.closest(".project-card") ||
        target.closest("[role='button']") ||
        target.classList.contains("cursor-pointer") ||
        window.getComputedStyle(target).cursor === "pointer";

      if (isHoverable) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    let animationFrameId: number;
    const updatePosition = () => {
      if (cursorDot) {
        cursorDot.style.transform = `translate3d(${mouseX - 2}px, ${mouseY - 2}px, 0)`;
      }

      // Trailing spring physics
      const outlineSpeed = 0.16;
      outlineX += (mouseX - outlineX) * outlineSpeed;
      outlineY += (mouseY - outlineY) * outlineSpeed;
      if (cursorOutline) {
        cursorOutline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0)`;
      }

      // Very smooth slow lag trailing for the background mesh spotlight
      const glowSpeed = 0.04;
      glowX += (mouseX - glowX) * glowSpeed;
      glowY += (mouseY - glowY) * glowSpeed;
      if (ambientGlow) {
        ambientGlow.style.transform = `translate3d(${glowX - 250}px, ${glowY - 250}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [customCursor, isHidden, isTouchDevice]);

  if (!customCursor || isTouchDevice) return null;

  return (
    <>
      {/* Background ambient spotlight that follows mouse movement with slow inertia */}
      <div
        ref={ambientGlowRef}
        className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-0 opacity-[0.06] md:opacity-[0.08] blur-[100px] transition-opacity duration-700 hidden md:block"
        style={{
          background: "radial-gradient(circle, hsl(var(--glow-primary) / 0.8) 0%, transparent 70%)",
        }}
      />

      {/* Pin-point precise custom arrow matching user's image */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-all duration-200 ease-out hidden md:block ${
          isClicking ? "scale-[0.85] rotate-[-5deg]" : ""
        } ${isHovered ? "opacity-40 scale-[0.9]" : "opacity-100 scale-100"}`}
        style={{
          transformOrigin: "top left",
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_2px_5px_rgba(0,0,0,0.35)]"
        >
          <defs>
            <linearGradient id="cursorArrowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="50%" stopColor="hsl(var(--primary) / 0.85)" />
              <stop offset="100%" stopColor="hsl(var(--glow-secondary) / 0.5)" />
            </linearGradient>
          </defs>
          {/* Classic Shaded Geometric Pointer Shape matching user image exactly */}
          <path
            d="M2 2 L2 19.5 L7.5 14.5 L9.2 18.8 L12 17.5 L10.2 13.2 L18.5 14 Z"
            fill="url(#cursorArrowGradient)"
            stroke="hsl(var(--background))"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Trailing Outer Ring */}
      <div
        ref={cursorOutlineRef}
        className={`fixed top-0 left-0 -ml-[18px] -mt-[18px] rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out border hidden md:block ${
          isHovered
            ? "w-[40px] h-[40px] bg-primary/10 border-primary/45 scale-110 shadow-[0_0_15px_hsl(var(--glow-primary)/0.25)]"
            : "w-[36px] h-[36px] bg-transparent border-primary/25 scale-100"
        } ${isClicking ? "scale-90 bg-primary/20 border-primary/60" : ""}`}
      />
    </>
  );
};

export default ThemeCursorFollower;
