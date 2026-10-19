"use client";

import React, { useEffect, useRef } from "react";

/**
 * Summit Conference Short Video Clip + Interactive 3D Globe & World Telemetry Map Hero Background
 * Combines:
 * 1) Cinematic Conference / Summit Keynote background video clip + generated 3D Holographic Summit Stage visual
 * 2) World Continents Vector Telemetry Map
 * 3) Live 60fps HTML5 Canvas 3D Rotating Orthographic Globe, Satellite Arcs & Cape Town Radar Pulses
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
      { name: "CAPE TOWN · SUMMIT HQ", x: 0.55, y: 0.77, primary: true },
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

      angle += 0.0045;

      // 1. Subtle Tactical Grid Lines
      ctx.strokeStyle = "rgba(66, 146, 198, 0.09)";
      ctx.lineWidth = 1;
      const step = 58;
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
      const globeX = w > 900 ? w * 0.71 : w * 0.52;
      const globeY = h * 0.48;
      const radius = Math.min(w, h) * (w > 900 ? 0.43 : 0.36);

      // Outer atmospheric 3D glow around the globe
      const glow = ctx.createRadialGradient(
        globeX,
        globeY,
        radius * 0.15,
        globeX,
        globeY,
        radius * 1.4
      );
      glow.addColorStop(0, "rgba(56, 189, 248, 0.28)");
      glow.addColorStop(0.5, "rgba(18, 82, 142, 0.18)");
      glow.addColorStop(1, "rgba(4, 13, 26, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(globeX, globeY, radius * 1.4, 0, Math.PI * 2);
      ctx.fill();

      // Globe Outer Ring
      ctx.strokeStyle = "rgba(125, 211, 252, 0.42)";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(globeX, globeY, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Rotating Orbital Satellite Ring around Globe
      ctx.save();
      ctx.translate(globeX, globeY);
      ctx.rotate(-0.28);
      ctx.strokeStyle = "rgba(252, 228, 109, 0.35)";
      ctx.lineWidth = 1.2;
      ctx.setLineDash([8, 6]);
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 1.22, radius * 0.42, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Orbiting 3D Satellite Dot on the Ring
      const satAngle = angle * 1.8;
      const satX = Math.cos(satAngle) * radius * 1.22;
      const satY = Math.sin(satAngle) * radius * 0.42;
      ctx.setLineDash([]);
      ctx.fillStyle = "#FCE46D";
      ctx.beginPath();
      ctx.arc(satX, satY, 3.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Longitude & Latitude ellipses on the 3D Globe
      ctx.strokeStyle = "rgba(125, 211, 252, 0.22)";
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

        ctx.strokeStyle =
          idx % 2 === 0
            ? "rgba(252, 228, 109, 0.3)"
            : "rgba(92, 184, 238, 0.28)";
        ctx.lineWidth = 1.3;
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
        ctx.arc(px, py, 2.6, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. Draw Telemetry Nodes & Hazard Triangles
      nodes.forEach((node, idx) => {
        const nx = node.x * w;
        const ny = node.y * h;

        if (node.primary) {
          const pulse = ((angle * 35) % 40) + 6;
          ctx.strokeStyle = `rgba(252, 228, 109, ${Math.max(0, 1 - pulse / 44)})`;
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.arc(nx, ny, pulse, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = "#FCE46D";
          ctx.beginPath();
          ctx.arc(nx, ny, 6, 0, Math.PI * 2);
          ctx.fill();
        } else if (idx % 3 === 0) {
          ctx.strokeStyle = "rgba(248, 113, 113, 0.85)";
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(nx, ny - 6);
          ctx.lineTo(nx - 5.5, ny + 4.5);
          ctx.lineTo(nx + 5.5, ny + 4.5);
          ctx.closePath();
          ctx.stroke();
        } else {
          ctx.fillStyle = "rgba(125, 211, 252, 0.9)";
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
    <div className="absolute inset-0 overflow-hidden bg-[#040F1E] pointer-events-none select-none">
      {/* LAYER 1: Generated Cinematic Conference Stage + 3D Holographic Globe Backdrop with slow Ken Burns motion */}
      <img
        src="/illustrations/hero-conference-globe.jpg"
        alt="World Disaster Center Youth Leadership Summit 2027 Conference & Globe"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-55 scale-105 animate-[pulse_12s_ease-in-out_infinite]"
      />

      {/* LAYER 2: Short Looping Conference / Global Earth Video Clip Overlay (blended with screen/soft-light) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/illustrations/hero-conference-globe.jpg"
        className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-screen"
      >
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-earth-rotating-in-space-with-city-lights-41566-large.mp4"
          type="video/mp4"
        />
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-audience-watching-a-presentation-in-a-conference-room-41614-large.mp4"
          type="video/mp4"
        />
      </video>

      {/* LAYER 3: World Continents Vector Map Silhouette Layer */}
      <svg
        viewBox="0 0 1440 760"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="mapGlow" cx="62%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#1E6091" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#0D2B45" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#040F1E" stopOpacity="0" />
          </radialGradient>
          <pattern
            id="dotMatrix"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.25" fill="#7DD3FC" fillOpacity="0.5" />
          </pattern>
        </defs>

        <rect width="1440" height="760" fill="url(#mapGlow)" />

        {/* Stylized World Continents filled with Tactical Dot Matrix */}
        <path
          d="M140 120 L340 105 L420 190 L370 290 L290 330 L210 260 L150 190 Z"
          fill="url(#dotMatrix)"
          stroke="#38BDF8"
          strokeOpacity="0.4"
        />
        <path
          d="M350 370 L470 400 L520 510 L450 670 L390 650 L360 490 Z"
          fill="url(#dotMatrix)"
          stroke="#38BDF8"
          strokeOpacity="0.4"
        />
        <path
          d="M620 120 L810 105 L850 210 L760 255 L645 240 L610 180 Z"
          fill="url(#dotMatrix)"
          stroke="#38BDF8"
          strokeOpacity="0.45"
        />
        <path
          d="M630 275 L795 275 L865 385 L830 520 L775 620 L735 615 L695 495 L615 390 Z"
          fill="url(#dotMatrix)"
          stroke="#FCE46D"
          strokeWidth="1.6"
          strokeOpacity="0.65"
        />
        <path
          d="M840 115 L1230 125 L1290 270 L1210 410 L1040 430 L910 340 L850 220 Z"
          fill="url(#dotMatrix)"
          stroke="#38BDF8"
          strokeOpacity="0.45"
        />
        <path
          d="M1110 500 L1270 495 L1295 605 L1160 625 L1100 565 Z"
          fill="url(#dotMatrix)"
          stroke="#38BDF8"
          strokeOpacity="0.4"
        />
      </svg>

      {/* LAYER 4: Interactive HTML5 Canvas for 3D Globe Wireframe, Satellite Ring & Radar Pulses */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* LAYER 5: Smooth Vignette Gradient for Crisp Foreground Typography */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(4,14,28,0.92) 0%, rgba(4,16,32,0.72) 48%, rgba(4,16,32,0.28) 100%)",
        }}
      />

      {/* Bottom-Right Live Summit Conference + Telemetry HUD Pill */}
      <div className="hidden md:flex absolute bottom-16 right-8 z-20 items-center gap-3 text-[10px] font-mono tracking-[0.16em] uppercase text-slate-100 bg-[#081C33]/85 backdrop-blur-md border border-sky-400/35 px-4 py-2 rounded-full shadow-lg">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-5" />
        <span>
          SUMMIT KEYNOTE STAGE &amp; 3D GLOBAL TELEMETRY · CAPE TOWN (11–15 OCT 2027)
        </span>
      </div>
    </div>
  );
}
