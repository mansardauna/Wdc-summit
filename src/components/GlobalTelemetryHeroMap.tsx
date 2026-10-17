"use client";

import React, { useEffect, useRef } from "react";

/**
 * Interactive Global Intelligence Map & 3D Telemetry Globe background
 * Inspired by https://michael.worlddisastercenter.org/ and Page 1 of the WDC Summit PDF
 */
export default function GlobalTelemetryHeroMap() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener("resize", resize);

    // Telemetry nodes around the world (normalized x, y on map)
    const nodes = [
      { name: "CAPE TOWN · HQ 2027", x: 0.54, y: 0.78, primary: true },
      { name: "GENEVA · UN DATA", x: 0.51, y: 0.31, primary: false },
      { name: "LAGOS · FLOOD LAB", x: 0.49, y: 0.54, primary: false },
      { name: "NAIROBI · EAST AFRICA", x: 0.58, y: 0.57, primary: false },
      { name: "NEGEV · DRYLANDS", x: 0.57, y: 0.39, primary: false },
      { name: "JAKARTA · SEISMIC", x: 0.78, y: 0.59, primary: false },
      { name: "TOKYO · EARLY WARNING", x: 0.85, y: 0.37, primary: false },
      { name: "SÃO PAULO · CLIMATE", x: 0.34, y: 0.71, primary: false },
      { name: "NEW YORK · POLICY", x: 0.27, y: 0.35, primary: false },
      { name: "MANILA · TYPHOON OPS", x: 0.82, y: 0.49, primary: false },
    ];

    const render = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      angle += 0.004;

      // 1. Subtle Tactical Grid Lines
      ctx.strokeStyle = "rgba(66, 146, 198, 0.11)";
      ctx.lineWidth = 1;
      const step = 56;
      for (let x = 0; x < w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // 2. Rotating 3D Orthographic Globe Wireframe on the right-center
      const globeX = w > 900 ? w * 0.72 : w * 0.5;
      const globeY = h * 0.52;
      const radius = Math.min(w, h) * (w > 900 ? 0.44 : 0.38);

      // Outer atmospheric glow around the globe
      const glow = ctx.createRadialGradient(
        globeX,
        globeY,
        radius * 0.2,
        globeX,
        globeY,
        radius * 1.35
      );
      glow.addColorStop(0, "rgba(28, 100, 155, 0.28)");
      glow.addColorStop(0.55, "rgba(18, 62, 102, 0.14)");
      glow.addColorStop(1, "rgba(4, 13, 26, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(globeX, globeY, radius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // Globe Outer Ring
      ctx.strokeStyle = "rgba(105, 182, 232, 0.32)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(globeX, globeY, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Dashed Radar Ring
      ctx.save();
      ctx.setLineDash([6, 8]);
      ctx.strokeStyle = "rgba(252, 228, 109, 0.25)";
      ctx.beginPath();
      ctx.arc(globeX, globeY, radius * 1.12, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Longitude & Latitude ellipses on the 3D Globe
      ctx.strokeStyle = "rgba(88, 166, 218, 0.16)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 6; i++) {
        const lonAngle = (angle + (i * Math.PI) / 6) % Math.PI;
        const rx = Math.abs(Math.cos(lonAngle)) * radius;
        ctx.beginPath();
        ctx.ellipse(globeX, globeY, rx, radius, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      for (let lat = -0.65; lat <= 0.65; lat += 0.325) {
        const ry = radius * 0.18;
        const yOffset = globeY + lat * radius;
        const rx = Math.sqrt(Math.max(0, radius * radius - (lat * radius) ** 2));
        ctx.beginPath();
        ctx.ellipse(globeX, yOffset, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 3. Telemetry Arcs connecting global nodes to Cape Town HQ
      const capeTown = nodes[0];
      const ctX = capeTown.x * w;
      const ctY = capeTown.y * h;

      nodes.slice(1).forEach((node, idx) => {
        const nx = node.x * w;
        const ny = node.y * h;
        const midX = (nx + ctX) / 2;
        const midY = Math.min(ny, ctY) - 45 - (idx % 3) * 20;

        // Curved telemetry link
        ctx.strokeStyle =
          idx % 2 === 0
            ? "rgba(252, 228, 109, 0.26)"
            : "rgba(92, 184, 238, 0.24)";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(nx, ny);
        ctx.quadraticCurveTo(midX, midY, ctX, ctY);
        ctx.stroke();

        // Moving data packet along the curve
        const t = (angle * 0.9 + idx * 0.17) % 1;
        const px =
          (1 - t) * (1 - t) * nx + 2 * (1 - t) * t * midX + t * t * ctX;
        const py =
          (1 - t) * (1 - t) * ny + 2 * (1 - t) * t * midY + t * t * ctY;

        ctx.fillStyle = idx % 2 === 0 ? "#FCE46D" : "#67C6FF";
        ctx.beginPath();
        ctx.arc(px, py, 2.4, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. Draw Telemetry Nodes & Hazard Triangles (matching PDF Page 1 & MICHAEL)
      nodes.forEach((node, idx) => {
        const nx = node.x * w;
        const ny = node.y * h;

        if (node.primary) {
          // Pulsing Radar Rings for Cape Town, South Africa
          const pulse = ((angle * 35) % 38) + 6;
          ctx.strokeStyle = `rgba(252, 228, 109, ${Math.max(0, 1 - pulse / 42)})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(nx, ny, pulse, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = "#FCE46D";
          ctx.beginPath();
          ctx.arc(nx, ny, 5.5, 0, Math.PI * 2);
          ctx.fill();
        } else if (idx % 3 === 0) {
          // Hazard / Telemetry Triangle Icon △ (like PDF Page 1)
          ctx.strokeStyle = "rgba(248, 113, 113, 0.85)";
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(nx, ny - 6);
          ctx.lineTo(nx - 5.5, ny + 4.5);
          ctx.lineTo(nx + 5.5, ny + 4.5);
          ctx.closePath();
          ctx.stroke();
        } else {
          // Standard Telemetry Node
          ctx.fillStyle = "rgba(103, 198, 255, 0.85)";
          ctx.beginPath();
          ctx.arc(nx, ny, 3.2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#061322] pointer-events-none select-none">
      {/* World Continents Vector Map Silhouette Layer */}
      <svg
        viewBox="0 0 1440 760"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full object-cover opacity-35"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="mapGlow" cx="55%" cy="55%" r="55%">
            <stop offset="0%" stopColor="#1E6091" stopOpacity="0.65" />
            <stop offset="60%" stopColor="#0D2B45" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#061322" stopOpacity="0" />
          </radialGradient>
          <pattern
            id="dotMatrix"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.2" fill="#5CB8EE" fillOpacity="0.45" />
          </pattern>
        </defs>

        <rect width="1440" height="760" fill="url(#mapGlow)" />

        {/* Stylized World Continents filled with Tactical Dot Matrix */}
        {/* North America */}
        <path
          d="M140 120 L340 105 L420 190 L370 290 L290 330 L210 260 L150 190 Z"
          fill="url(#dotMatrix)"
          stroke="#3B82B6"
          strokeOpacity="0.35"
        />
        {/* South America */}
        <path
          d="M350 370 L470 400 L520 510 L450 670 L390 650 L360 490 Z"
          fill="url(#dotMatrix)"
          stroke="#3B82B6"
          strokeOpacity="0.35"
        />
        {/* Europe */}
        <path
          d="M620 120 L810 105 L850 210 L760 255 L645 240 L610 180 Z"
          fill="url(#dotMatrix)"
          stroke="#3B82B6"
          strokeOpacity="0.4"
        />
        {/* Africa (with Cape Town at southern tip) */}
        <path
          d="M630 275 L795 275 L865 385 L830 520 L775 620 L735 615 L695 495 L615 390 Z"
          fill="url(#dotMatrix)"
          stroke="#5CB8EE"
          strokeWidth="1.5"
          strokeOpacity="0.55"
        />
        {/* Asia */}
        <path
          d="M840 115 L1230 125 L1290 270 L1210 410 L1040 430 L910 340 L850 220 Z"
          fill="url(#dotMatrix)"
          stroke="#3B82B6"
          strokeOpacity="0.4"
        />
        {/* Australia & Oceania */}
        <path
          d="M1110 500 L1270 495 L1295 605 L1160 625 L1100 565 Z"
          fill="url(#dotMatrix)"
          stroke="#3B82B6"
          strokeOpacity="0.35"
        />
      </svg>

      {/* Interactive HTML5 Canvas for 3D Globe Wireframe, Telemetry Arcs & Radar Pulses */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Top & Left Vignette for Crisp Typography Contrast */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,16,30,0.88) 0%, rgba(5,16,30,0.65) 50%, rgba(5,16,30,0.38) 100%)",
        }}
      />

      {/* MICHAEL Telemetry HUD Overlay Badges (Bottom Right) */}
      <div className="hidden md:flex absolute bottom-6 right-8 z-20 items-center gap-3 text-[10px] font-mono tracking-[0.16em] uppercase text-slate-300/90 bg-[#0A1D31]/80 backdrop-blur-md border border-sky-400/25 px-4 py-2 rounded-full">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>WDC GLOBAL TELEMETRY · CAPE TOWN SECTOR (33.92°S, 18.42°E)</span>
      </div>
    </div>
  );
}
