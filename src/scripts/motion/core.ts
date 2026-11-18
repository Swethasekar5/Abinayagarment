/**
 * Shared motion engine: GSAP + ScrollTrigger + SplitText + Lenis smooth scroll.
 * Imported by every animated component; ES modules make this a singleton.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

export const MQ = {
  motion: '(prefers-reduced-motion: no-preference)',
  desktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
  mobile: '(max-width: 1023px) and (prefers-reduced-motion: no-preference)',
  finePointer: '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
};

export const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis: Lenis | null = null;
if (!reduceMotion) {
  lenis = new Lenis({ lerp: 0.1, anchors: { offset: -72 } });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis!.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

export { gsap, ScrollTrigger, SplitText, lenis };

/* ------------------------------------------------------------------ */
/* Drawable thread: a dashed SVG path revealed by an animated mask.     */
/* (stroke-dashoffset can't be used directly because the path itself    */
/*  is already dashed.)                                                 */
/* ------------------------------------------------------------------ */
const SVG_NS = 'http://www.w3.org/2000/svg';
const masks = new WeakMap<SVGPathElement, SVGPathElement>();

/** Returns the mask path; animate its `strokeDashoffset` from 1 (hidden) to 0 (drawn). */
export function drawable(path: SVGPathElement): SVGPathElement {
  const existing = masks.get(path);
  if (existing) return existing;
  const svg = path.ownerSVGElement!;
  const defs = svg.querySelector('defs') ?? svg.insertBefore(document.createElementNS(SVG_NS, 'defs'), svg.firstChild);
  const id = `thread-${Math.random().toString(36).slice(2, 9)}`;
  const mask = document.createElementNS(SVG_NS, 'mask');
  mask.setAttribute('id', id);
  mask.setAttribute('maskUnits', 'userSpaceOnUse');
  for (const [k, v] of Object.entries({ x: '-10000', y: '-10000', width: '20000', height: '20000' })) mask.setAttribute(k, v);
  const m = document.createElementNS(SVG_NS, 'path');
  m.setAttribute('d', path.getAttribute('d') ?? '');
  m.setAttribute('fill', 'none');
  m.setAttribute('stroke', '#fff');
  m.setAttribute('stroke-linecap', 'round');
  m.setAttribute('stroke-width', String((parseFloat(getComputedStyle(path).strokeWidth) || 2) + 10));
  if (path.getAttribute('vector-effect')) m.setAttribute('vector-effect', path.getAttribute('vector-effect')!);
  m.setAttribute('pathLength', '1');
  m.style.strokeDasharray = '1 1';
  m.style.strokeDashoffset = '1';
  mask.append(m);
  defs.append(mask);
  path.setAttribute('mask', `url(#${id})`);
  masks.set(path, m);
  return m;
}

/** Update a drawable path's geometry (keeps its mask in sync). */
export function setPath(path: SVGPathElement, d: string) {
  path.setAttribute('d', d);
  masks.get(path)?.setAttribute('d', d);
}

/* ------------------------------------------------------------------ */
/* Generic behaviours driven by data attributes                        */
/* ------------------------------------------------------------------ */
const mm = gsap.matchMedia();

function initGeneric() {
  mm.add(MQ.motion, () => {
    // [data-reveal]: fade + rise on enter. [data-reveal="children"] staggers direct children.
    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
      const targets = el.dataset.reveal === 'children' ? Array.from(el.children) : [el];
      gsap.from(targets, {
        y: 48,
        autoAlpha: 0,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.09,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      });
    });

    // [data-speed="60"]: parallax, moves from +60px to -60px while crossing the viewport
    gsap.utils.toArray<HTMLElement>('[data-speed]').forEach((el) => {
      const s = parseFloat(el.dataset.speed || '0');
      gsap.fromTo(
        el,
        { y: s },
        {
          y: -s,
          ease: 'none',
          scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    });

    // [data-clip-reveal]: image unmasks top → bottom like fabric unfolding
    gsap.utils.toArray<HTMLElement>('[data-clip-reveal]').forEach((el) => {
      gsap.fromTo(
        el,
        { clipPath: 'inset(0% 0% 100% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.4,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        },
      );
    });

    // [data-split]: headline lines rise out of a mask. data-split="now" plays on load (page intros),
    // anything else plays when it scrolls into view. Re-splits automatically after font load / resize.
    const splits = gsap.utils.toArray<HTMLElement>('[data-split]').map((el) =>
      SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit(self) {
          gsap.set(el, { visibility: 'visible' });
          const now = el.dataset.split === 'now';
          return gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.3,
            ease: 'expo.out',
            stagger: 0.09,
            delay: now ? 0.15 : 0,
            scrollTrigger: now ? undefined : { trigger: el, start: 'top 85%', once: true },
          });
        },
      }),
    );

    // [data-page-in]: page-intro elements fade up on load, in DOM order
    const intro = gsap.utils.toArray<HTMLElement>('[data-page-in]');
    if (intro.length) {
      gsap.from(intro, { y: 36, autoAlpha: 0, duration: 1.1, ease: 'power3.out', stagger: 0.08, delay: 0.35 });
    }

    // page-long thread in the left margin
    const pageThread = document.querySelector<HTMLElement>('.page-thread');
    if (pageThread) {
      gsap.fromTo(
        pageThread,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.6 },
        },
      );
    }

    return () => splits.forEach((s) => s.revert());
  });

  // motion JS is alive: cancel the head-script failsafe that would un-hide everything
  (window as any).__heroReady = true;

  // [data-count]: count up once in view (runs even with reduced motion, instantly)
  gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
    const end = parseFloat(el.dataset.count || '0');
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const fmt = (v: number) => v.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    if (reduceMotion) {
      el.textContent = fmt(end);
      return;
    }
    const obj = { v: 0 };
    el.textContent = fmt(0);
    gsap.to(obj, {
      v: end,
      duration: 2.2,
      ease: 'power3.out',
      onUpdate: () => (el.textContent = fmt(obj.v)),
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });

  // [data-magnetic]: button drifts toward the cursor
  mm.add(MQ.finePointer, () => {
    const cleanups: Array<() => void> = [];
    gsap.utils.toArray<HTMLElement>('[data-magnetic]').forEach((el) => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        xTo(((e.clientX - (r.left + r.width / 2)) / r.width) * 14);
        yTo(((e.clientY - (r.top + r.height / 2)) / r.height) * 10);
      };
      const leave = () => {
        xTo(0);
        yTo(0);
      };
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
      cleanups.push(() => {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerleave', leave);
      });
    });
    return () => cleanups.forEach((c) => c());
  });
}

// Module scripts run before DOMContentLoaded, so this runs after every component's own
// setup (pins first), keeping trigger measurements correct.
const refreshAll = () => {
  ScrollTrigger.sort();
  ScrollTrigger.refresh();
};
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initGeneric();
    refreshAll();
  });
} else {
  queueMicrotask(() => {
    initGeneric();
    refreshAll();
  });
}

// Recalculate trigger positions once fonts/images settle
window.addEventListener('load', refreshAll);
document.fonts?.ready.then(refreshAll);
