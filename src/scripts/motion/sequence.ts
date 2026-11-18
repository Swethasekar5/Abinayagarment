/**
 * Scroll-scrubbed image sequence drawn on a <canvas> ("Apple-style" video scrub).
 *
 * - Frames load progressively in a coarse → fine order (every 16th, 8th, 4th … frame),
 *   so scrubbing works early and sharpens as more frames arrive.
 * - If a frame isn't loaded yet, the nearest loaded frame is drawn instead.
 * - Drawing uses "cover" fitting, matching CSS `object-fit: cover`.
 */
export interface SequenceOptions {
  count: number;
  url: (i: number) => string;
  concurrency?: number;
}

export function createSequence(canvas: HTMLCanvasElement, { count, url, concurrency = 6 }: SequenceOptions) {
  const ctx = canvas.getContext('2d', { alpha: false })!;
  const images: Array<HTMLImageElement | undefined> = new Array(count);
  const ready = new Uint8Array(count);
  let current = 0;
  let started = false;
  let firstReady: () => void;
  const firstFrame = new Promise<void>((r) => (firstReady = r));

  function nearestReady(i: number) {
    if (ready[i]) return i;
    for (let d = 1; d < count; d++) {
      if (i - d >= 0 && ready[i - d]) return i - d;
      if (i + d < count && ready[i + d]) return i + d;
    }
    return -1;
  }

  function draw(frame: number = current) {
    current = Math.max(0, Math.min(count - 1, Math.round(frame)));
    const j = nearestReady(current);
    if (j < 0 || !canvas.width) return;
    const img = images[j]!;
    const cw = canvas.width;
    const ch = canvas.height;
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
  }

  function resize() {
    const r = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    // use layout size (unaffected by CSS transforms) so a scaled-down canvas stays sharp
    const w = Math.round((canvas.offsetWidth || r.width) * dpr);
    const h = Math.round((canvas.offsetHeight || r.height) * dpr);
    if (w && h && (w !== canvas.width || h !== canvas.height)) {
      canvas.width = w;
      canvas.height = h;
      ctx.imageSmoothingQuality = 'high';
    }
    draw();
  }

  function load(i: number) {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = async () => {
        try {
          await img.decode();
        } catch {
          /* already decoded or not supported */
        }
        images[i] = img;
        ready[i] = 1;
        if (i === 0) firstReady();
        // repaint if this frame is closer to the one we want than what's showing
        if (Math.abs(i - current) <= Math.abs(nearestReady(current) - current)) draw();
        resolve();
      };
      img.onerror = () => resolve();
      img.src = url(i);
    });
  }

  /** Start loading every frame, coarse → fine. Safe to call more than once. */
  function preload() {
    if (started) return firstFrame;
    started = true;
    const order: number[] = [];
    const seen = new Set<number>();
    const push = (i: number) => !seen.has(i) && (seen.add(i), order.push(i));
    push(0);
    push(count - 1);
    for (const step of [16, 8, 4, 2, 1]) for (let i = 0; i < count; i += step) push(i);

    let next = 0;
    const worker = async () => {
      while (next < order.length) await load(order[next++]);
    };
    for (let k = 0; k < concurrency; k++) worker();
    return firstFrame;
  }

  return {
    draw,
    resize,
    preload,
    firstFrame,
    get loaded() {
      return ready.reduce((a, b) => a + b, 0);
    },
  };
}
