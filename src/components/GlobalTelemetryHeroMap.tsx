"use client";

import React, { useEffect, useRef } from "react";

/**
 * Crystal-Clear Single-Composition Summit Conference & 3D Globe Hero Background
 * - Single sharp high-resolution conference + 3D globe scene (no overlapping/double globes or blur)
 * - Subtle precision telemetry particles & Cape Town radar pulse on HTML5 canvas
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

    // Subtle telemetry nodes aligned to the single hero composition
    const nodes = [
      { x: 0.68, y: 0.56, primary: true },
      { x: 0.54, y: 0.28, primary: false },
      { x: 0.82, y: 0.32, primary: false },
      { x: 0.86, y: 0.58, primary: false },
      { x: 0.52, y: 0.64, primary: false },
    ];

    const render = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      angle += 0.005;

      const hq = nodes[0];
      const hqX = hq.x * w;
      const hqY = hq.y * h;

      // Subtle animated telemetry data packets travelling along clean arcs
      nodes.slice(1).forEach((node, idx) => {
        const nx = node.x * w;
        const ny = node.y * h;
        const midX = (nx + hqX) / 2;
        const midY = Math.min(ny, hqY) - 36 - (idx % 2) * 18;

        ctx.strokeStyle =
          idx % 2 === 0
            ? "rgba(252, 228, 109, 0.22)"
            : "rgba(125, 211, 252, 0.22)";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(nx, ny);
        ctx.quadraticCurveTo(midX, midY, hqX, hqY);
        ctx.stroke();

        const t = (angle * 0.85 + idx * 0.25) % 1;
        const px =
          (1 - t) * (1 - t) * nx + 2 * (1 - t) * t * midX + t * t * hqX;
        const py =
          (1 - t) * (1 - t) * ny + 2 * (1 - t) * t * midY + t * t * hqY;

        ctx.fillStyle = idx % 2 === 0 ? "#FCE46D" : "#7DD3FC";
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Crisp radar pulse on the primary node
      const pulse = ((angle * 32) % 34) + 5;
      ctx.strokeStyle = `rgba(252, 228, 109, ${Math.max(0, 0.85 - pulse / 40)})`;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(hqX, hqY, pulse, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = "#FCE46D";
      ctx.beginPath();
      ctx.arc(hqX, hqY, 4.5, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#041020] pointer-events-none select-none">
      {/* SINGLE CRISP HIGH-RESOLUTION SUMMIT CONFERENCE & 3D HOLOGRAPHIC GLOBE SCENE */}
      <img
        src="/illustrations/hero-conference-globe.jpg"
        alt="World Disaster Center Youth Leadership Summit 2027 Conference & 3D Globe"
        className="absolute inset-0 w-full h-full object-cover object-right md:object-center"
        style={{
          filter: "contrast(1.06) saturate(1.08)",
        }}
      />

      {/* Clean Left-to-Right Gradient Overlay so Left Text is 100% Sharp & Right Globe is Crystal Clear */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(4, 15, 30, 0.94) 0%, rgba(4, 15, 30, 0.82) 38%, rgba(4, 15, 30, 0.32) 72%, rgba(4, 15, 30, 0.15) 100%)",
        }}
      />

      {/* Subtle Telemetry Arcs Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Bottom-Right Live Summit Conference + Telemetry HUD Pill */}
      <div className="hidden md:flex absolute bottom-16 right-8 z-20 items-center gap-3 text-[10px] font-mono tracking-[0.16em] uppercase text-slate-100 bg-[#071A30]/90 backdrop-blur-md border border-sky-400/35 px-4 py-2 rounded-full shadow-lg">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-5" />
        <span>
          WDC SUMMIT KEYNOTE &amp; 3D GLOBAL TELEMETRY · CAPE TOWN (11–15 OCT 2027)
        </span>
      </div>
    </div>
  );
}
