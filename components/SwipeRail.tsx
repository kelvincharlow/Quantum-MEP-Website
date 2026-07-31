"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, type MouseEvent, type PointerEvent, type ReactNode } from "react";

export function SwipeRail({ children, className, label }: { children: ReactNode; className: string; label: string }) {
  const rail = useRef<HTMLDivElement>(null);
  const drag = useRef<{ active: boolean; moved: boolean; x: number; scroll: number }>({ active: false, moved: false, x: 0, scroll: 0 });

  function move(direction: -1 | 1) {
    const element = rail.current;
    if (!element) return;
    element.scrollBy({ left: direction * element.clientWidth * 0.86, behavior: "smooth" });
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch" || !rail.current) return;
    drag.current = { active: true, moved: false, x: event.clientX, scroll: rail.current.scrollLeft };
    rail.current.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current.active || !rail.current) return;
    if (Math.abs(event.clientX - drag.current.x) > 6) drag.current.moved = true;
    rail.current.scrollLeft = drag.current.scroll - (event.clientX - drag.current.x);
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    drag.current.active = false;
    rail.current?.releasePointerCapture(event.pointerId);
  }

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    if (!drag.current.moved) return;
    event.preventDefault();
    event.stopPropagation();
    drag.current.moved = false;
  }

  return (
    <div className="swipe-rail">
      <div
        ref={rail}
        className={className}
        aria-label={label}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClickCapture={handleClick}
      >
        {children}
      </div>
      <div className="swipe-rail__controls" aria-label={`${label} controls`}>
        <button type="button" aria-label="Previous item" onClick={() => move(-1)}><ArrowLeft /></button>
        <button type="button" aria-label="Next item" onClick={() => move(1)}><ArrowRight /></button>
      </div>
    </div>
  );
}
