// Dette er for at Film kort har litt animasjon når man beveger musa over

"use client";
import { useRef, type ReactNode } from "react";

export default function TiltCard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  // Hvor mye den skal lene seg
  const MAX_TILT = 14;

  // Beveger seg bare hvis det faktisk finnes en mus
  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "touch") return;
    const el = ref.current;
    if (!el) return;
    const { clientX, clientY } = e;

    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      const px = (clientX - r.left) / r.width;
      const py = (clientY - r.top) / r.height;

      el.dataset.live = "true";
      el.style.setProperty(
        "--ry",
        `${((px - 0.5) * 2 * MAX_TILT).toFixed(2)}deg`,
      );
      el.style.setProperty(
        "--rx",
        `${((0.5 - py) * 2 * MAX_TILT).toFixed(2)}deg`,
      );
      el.style.setProperty("--gx", `${px * 100}%`);
      el.style.setProperty("--gy", `${py * 100}%`);
      el.style.setProperty("--sx", `${((0.5 - px) * 34).toFixed(1)}px`);
      el.style.setProperty("--sy", `${((py - 0.5) * 14).toFixed(1)}px`);
    });
  }

  function reset() {
    cancelAnimationFrame(frame.current);
    const el = ref.current;
    if (!el) return;
    delete el.dataset.live;
    for (const p of ["--rx", "--ry", "--gx", "--gy", "--sx", "--sy"]) {
      el.style.removeProperty(p);
    }
  }

  return (
    <div className="perspective-[900px]">
      <div
        ref={ref}
        className="group tilt"
        onPointerMove={onPointerMove}
        onPointerLeave={reset}
        onBlur={reset}
      >
        {children}
      </div>
    </div>
  );
}
