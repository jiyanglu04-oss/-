import { useEffect, useRef } from 'react';

export default function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    const resizeObserver = new ResizeObserver(() => resize());
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Grid configuration
    const cols = 24;
    const rows = 12;
    const dots: { x: number; y: number; baseSize: number; color: string; phase: number }[] = [];

    // Generate grid dots
    const colors = [
      'rgba(125, 211, 252, 0.32)',
      'rgba(56, 189, 248, 0.28)',
      'rgba(14, 165, 233, 0.24)',
      'rgba(2, 132, 199, 0.22)',
    ];

    // Initialize orbit properties
    let angleOffset = 0;

    const initDots = () => {
      dots.length = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = (width * (c + 1)) / (cols + 1);
          const y = (height * (r + 1)) / (rows + 1);
          const baseSize = Math.random() > 0.85 ? 2.5 : 1.25;
          const color = colors[Math.floor(Math.random() * colors.length)];
          dots.push({
            x,
            y,
            baseSize,
            color,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    initDots();

    // Re-init dots when resized
    let lastWidth = width;
    const render = () => {
      if (Math.abs(width - lastWidth) > 10) {
        initDots();
        lastWidth = width;
      }

      ctx.clearRect(0, 0, width, height);

      // Increase angle for the rotating orbit ring
      angleOffset += 0.006;

      const orbitCenterX = width * 0.65;
      const orbitCenterY = height * 0.5;
      const orbitRadius = Math.min(width, height) * 0.28;

      // 1. Draw central glowing orb
      const orbGlow = ctx.createRadialGradient(
        orbitCenterX,
        orbitCenterY,
        0,
        orbitCenterX,
        orbitCenterY,
        45
      );
      orbGlow.addColorStop(0, 'rgba(14, 165, 233, 0.12)');
      orbGlow.addColorStop(0.5, 'rgba(56, 189, 248, 0.05)');
      orbGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = orbGlow;
      ctx.beginPath();
      ctx.arc(orbitCenterX, orbitCenterY, 45, 0, Math.PI * 2);
      ctx.fill();

      // Small glowing core dot at center of orbit
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.arc(orbitCenterX, orbitCenterY, 4, 0, Math.PI * 2);
      ctx.fill();

      // Outer outline circle
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 12]);
      ctx.beginPath();
      ctx.arc(orbitCenterX, orbitCenterY, orbitRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]); // Reset line dash

      // 2. Draw standard grid dots with mouse-responsive scaling
      dots.forEach((dot) => {
        let size = dot.baseSize;
        let color = dot.color;

        // Breathe animation
        const breathe = Math.sin(angleOffset * 2 + dot.phase) * 0.4;
        size += breathe;

        // Distance to orbit center - if too close to center, make standard grid dot slightly faint to let the ring stand out
        const distToOrbit = Math.hypot(dot.x - orbitCenterX, dot.y - orbitCenterY);
        let baseOpacity = 1;

        if (distToOrbit < orbitRadius - 20) {
          baseOpacity = 0.45;
        }

        // Distance to mouse pointer
        if (mouseRef.current.active) {
          const mouseDist = Math.hypot(dot.x - mouseRef.current.x, dot.y - mouseRef.current.y);
          if (mouseDist < 100) {
            const factor = (100 - mouseDist) / 100;
            size += factor * 3.5;
            // Shift color to bright violet-pink on mouse proximity
            color = `rgba(56, 189, 248, ${0.45 + factor * 0.55})`;
          }
        }

        // Apply opacities to colors
        ctx.fillStyle = color;
        ctx.globalAlpha = baseOpacity;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, Math.max(0.5, size), 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // 3. Draw active rotating orbit ring particles
      const ringParticleCount = 48;
      for (let i = 0; i < ringParticleCount; i++) {
        const particleAngle = (i / ringParticleCount) * Math.PI * 2 + angleOffset;
        
        // Add coordinates perturbing
        const px = orbitCenterX + Math.cos(particleAngle) * orbitRadius;
        const py = orbitCenterY + Math.sin(particleAngle) * orbitRadius;

        // Particle size variance
        const sizePhase = Math.sin(particleAngle * 3 + angleOffset * 4);
        const pSize = 1.5 + (sizePhase + 1) * 1.5;

        // Fade in/out gradient along the circle to make it look like a constellation stream
        const alpha = 0.3 + (Math.sin(particleAngle - angleOffset * 2) + 1) * 0.35;

        // Make every 4th dot stand out with glowing color
        if (i % 4 === 0) {
          ctx.fillStyle = `rgba(14, 165, 233, ${alpha})`;
          // outer halo
          ctx.shadowColor = 'rgba(14, 165, 233, 0.45)';
          ctx.shadowBlur = 6;
        } else {
          ctx.fillStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        ctx.arc(px, py, pSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset shadow
      }

      // Draw mouse cursor micro attraction ring
      if (mouseRef.current.active) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 40, 0, Math.PI * 2);
        ctx.stroke();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    // Mouse listeners
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    const parent = containerRef.current;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      cancelAnimationFrame(animationId);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} id="canvas-grid-container" className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto">
      <canvas ref={canvasRef} className="block w-full h-full bg-transparent" />
    </div>
  );
}
