import { useRef, useState, useCallback } from 'react';

const WORDS = ['JACKSON', 'LU'];

export default function JacksonText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const charRefs = useRef<Map<string, HTMLSpanElement | null>>(new Map());
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos(null);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col items-center justify-center select-none w-full h-full cursor-default"
      style={{ minHeight: 420 }}
    >
      {WORDS.map((word, wi) => (
        <span
          key={wi}
          className="inline-flex justify-center items-baseline font-black leading-none whitespace-nowrap"
          style={{
            fontSize: 'clamp(80px, 12vw, 170px)',
            letterSpacing: '-0.03em',
          }}
        >
          {word.split('').map((char, ci) => {
            const key = `${wi}-${ci}`;
            let dx = 0;
            let dy = 0;
            let dist = Infinity;

            const el = charRefs.current.get(key);
            if (mousePos && el && containerRef.current) {
              const rect = el.getBoundingClientRect();
              const cr = containerRef.current.getBoundingClientRect();
              const cx = rect.left + rect.width / 2 - cr.left;
              const cy = rect.top + rect.height / 2 - cr.top;
              dx = mousePos.x - cx;
              dy = mousePos.y - cy;
              dist = Math.sqrt(dx * dx + dy * dy);
            }

            const radius = 120;
            const isNear = dist < radius;
            const s = isNear ? Math.pow(1 - dist / radius, 2.5) : 0;

            const y = -s * 24;
            const scale = 1 + s * 0.2;
            const rot = (dx / radius) * s * 10;
            const c = Math.min(s, 1);

            return (
              <span
                key={key}
                ref={(el) => { charRefs.current.set(key, el); }}
                className="inline-block select-none"
                style={{
                  transform: `translateY(${y}px) scale(${scale}) rotate(${rot}deg)`,
                  transition: isNear
                    ? 'transform 0.05s ease-out'
                    : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  color: `color-mix(in srgb, oklch(0.21 0.04 265) ${100 - c * 70}%, oklch(0.59 0.2 257) ${c * 70}%)`,
                  textShadow: isNear
                    ? `0 0 ${s * 40}px rgba(14,165,233,${s * 0.5})`
                    : 'none',
                }}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </div>
  );
}
