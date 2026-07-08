"use client";

import { useEffect, useRef } from "react";

/*
 * Full-bleed interactive water scene for the hero.
 *
 * Horizontal wave lines (the site's wave motif, brought to life) drift and
 * "breathe" on a slow ~9s cycle. The pointer parts the lines around it like a
 * hand moving through still water, and a click/tap drops a soft expanding
 * ripple. Everything eases back to stillness when the visitor stops moving.
 *
 * Honors prefers-reduced-motion (renders one static frame) and pauses the
 * loop while offscreen or when the tab is hidden.
 */

const ROWS = 26;
const STEP = 14; // px between sampled points along a line
const CURSOR_SIGMA = 130; // radius of the pointer's influence
const RIPPLE_LIFE = 3200; // ms

type Ripple = { x: number; y: number; born: number };

export function HeroWavesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let raf = 0;
    let running = false;
    let visible = true;

    // Pointer state: `target` follows the real cursor, `smooth` trails it for
    // a dreamy lag; `activity` ramps with movement and decays back to calm.
    const target = { x: -9999, y: -9999 };
    const smooth = { x: -9999, y: -9999 };
    let activity = 0;
    const ripples: Ripple[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduced) draw(0);
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height);

      // Slow breathing cycle modulates every line's amplitude together.
      const breathe = 1 + 0.22 * Math.sin((now / 9000) * Math.PI * 2);

      // Trailing cursor + decaying activity keep the response soft.
      smooth.x += (target.x - smooth.x) * 0.055;
      smooth.y += (target.y - smooth.y) * 0.055;
      activity *= 0.97;

      const twoSigma2 = 2 * CURSOR_SIGMA * CURSOR_SIGMA;
      const push = 26 + activity * 60;

      // Precompute live ripples once per frame.
      const live = ripples.filter((r) => now - r.born < RIPPLE_LIFE);
      ripples.length = 0;
      ripples.push(...live);

      for (let i = 0; i < ROWS; i += 1) {
        const rowY = ((i + 0.5) / ROWS) * height;
        const amp = (11 + 7 * Math.sin(i * 1.7)) * breathe;
        const phase = i * 0.85;
        const speed = 0.00019 + 0.00007 * Math.sin(i * 2.3);
        const freq = 0.0038 + 0.0009 * Math.sin(i * 1.1);
        const gold = i % 6 === 3;
        const alpha = gold
          ? 0.16 + 0.05 * Math.sin(i)
          : 0.05 + 0.07 * (0.5 + 0.5 * Math.sin(i * 0.7 + 1.3));

        ctx.beginPath();
        for (let x = -STEP; x <= width + STEP; x += STEP) {
          let y = rowY + Math.sin(x * freq + now * speed + phase) * amp;

          // Part the water around the (trailing) cursor.
          const dx = x - smooth.x;
          const dyc = y - smooth.y;
          const d2 = dx * dx + dyc * dyc;
          if (d2 < twoSigma2 * 4) {
            const influence = Math.exp(-d2 / twoSigma2);
            y += influence * push * (dyc >= 0 ? 1 : -1);
          }

          // Expanding ripple rings displace lines as they pass.
          for (const r of ripples) {
            const age = (now - r.born) / RIPPLE_LIFE; // 0..1
            const radius = age * 420;
            const rd = Math.hypot(x - r.x, y - r.y) - radius;
            if (Math.abs(rd) < 160) {
              const decay = (1 - age) * (1 - age);
              y += Math.sin(rd * 0.045) * Math.exp((-rd * rd) / 12800) * 26 * decay;
            }
          }

          if (x === -STEP) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = gold
          ? `hsla(38, 45%, 58%, ${alpha})`
          : `hsla(36, 33%, 97%, ${alpha})`;
        ctx.lineWidth = gold ? 1 : 1.1;
        ctx.stroke();
      }

      // A faint gold glow follows the cursor while it moves.
      if (activity > 0.01 && smooth.x > -999) {
        const glow = ctx.createRadialGradient(
          smooth.x, smooth.y, 0,
          smooth.x, smooth.y, 320,
        );
        glow.addColorStop(0, `hsla(38, 45%, 58%, ${0.07 * activity})`);
        glow.addColorStop(1, "hsla(38, 45%, 58%, 0)");
        ctx.fillStyle = glow;
        ctx.fillRect(smooth.x - 320, smooth.y - 320, 640, 640);
      }

      // Soft fading rings so a tap reads as a touch on water.
      for (const r of ripples) {
        const age = (now - r.born) / RIPPLE_LIFE;
        ctx.beginPath();
        ctx.arc(r.x, r.y, age * 420, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(36, 33%, 97%, ${0.14 * (1 - age) * (1 - age)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const toLocal = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const onPointerMove = (e: PointerEvent) => {
      const p = toLocal(e.clientX, e.clientY);
      if (target.x < -999) {
        smooth.x = p.x;
        smooth.y = p.y;
      }
      target.x = p.x;
      target.y = p.y;
      activity = Math.min(1, activity + 0.08);
    };
    const onPointerLeave = () => {
      target.x = -9999;
      target.y = -9999;
    };
    const onPointerDown = (e: PointerEvent) => {
      const p = toLocal(e.clientX, e.clientY);
      ripples.push({ x: p.x, y: p.y, born: performance.now() });
      if (ripples.length > 6) ripples.shift();
    };

    const onVisibility = () => {
      if (document.hidden || !visible) stop();
      else start();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        onVisibility();
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    const section = canvas.parentElement ?? canvas;
    section.addEventListener("pointermove", onPointerMove);
    section.addEventListener("pointerleave", onPointerLeave);
    section.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("visibilitychange", onVisibility);

    if (reduced) draw(0);
    else start();

    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      section.removeEventListener("pointermove", onPointerMove);
      section.removeEventListener("pointerleave", onPointerLeave);
      section.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
