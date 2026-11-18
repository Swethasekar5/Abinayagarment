#!/usr/bin/env node
/**
 * Turns the hero transition video into scroll-scrubbed frame sequences.
 *
 *   npm run hero:frames                     # builds both variants from docs/redesign/hero/transition.mp4
 *   npm run hero:frames -- path/to/new.mp4 --end 152
 *   npm run hero:frames -- --only desktop   # or --only mobile
 *
 * Variants
 *   desktop  16:9 frames, 1440px wide, every 2nd frame       → public/hero/seq/
 *   mobile   square crop (x ≈ 27–83% of the frame), 720px,   → public/hero/seq-m/
 *            every 3rd frame (lighter for phones)
 * Shared options: --end (last frame before the still hold), --quality, --denoise, --format avif|webp
 *
 * Also writes
 *   src/assets/hero/before.png / after.png   first / last kept frame (LCP + fallback stills)
 *   src/data/heroSequence.json               { desktop: {...}, mobile: {...} }
 *
 * Requires ffmpeg on PATH; uses sharp (installed with Astro) for encoding.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import sharp from 'sharp';

const args = process.argv.slice(2);
const opt = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : def;
};
const video = args[0] && !args[0].startsWith('--') ? args[0] : 'docs/redesign/hero/transition.mp4';
const end = parseInt(opt('end', '152'), 10);
const quality = parseInt(opt('quality', '32'), 10);
const denoise = parseFloat(opt('denoise', '8')); // hqdn3d strength: removes grain/flicker, shrinks files a lot
const format = opt('format', 'avif');
const only = opt('only', null);

const VARIANTS = {
  desktop: { dir: 'seq', step: 2, width: 1440, crop: null },
  // square window centred a little right of middle, where the transformation happens
  mobile: { dir: 'seq-m', step: 3, width: 720, crop: { x: 0.27, w: 0.5625 } },
};

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const manifestPath = path.join(root, 'src/data/heroSequence.json');
const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')) : {};
const outAssets = path.join(root, 'src/assets/hero');
fs.mkdirSync(outAssets, { recursive: true });

for (const [name, v] of Object.entries(VARIANTS)) {
  if (only && only !== name) continue;
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), `hero-${name}-`));
  const outSeq = path.join(root, 'public/hero', v.dir);

  console.log(`[${name}] extracting frames 0–${end - 1} (every ${v.step}) from ${video} …`);
  const filters = [`select='lt(n\\,${end})*not(mod(n\\,${v.step}))'`];
  if (denoise > 0) filters.push(`hqdn3d=${denoise}:${denoise}:${denoise * 1.5}:${denoise * 1.5}`);
  execFileSync('ffmpeg', ['-v', 'error', '-i', path.resolve(root, video), '-an', '-vf', filters.join(','), '-fps_mode', 'passthrough', path.join(tmp, 'f_%03d.png')], { stdio: 'inherit' });

  const pngs = fs.readdirSync(tmp).filter((f) => f.endsWith('.png')).sort();
  fs.rmSync(outSeq, { recursive: true, force: true });
  fs.mkdirSync(outSeq, { recursive: true });

  let total = 0;
  let meta = { width: 0, height: 0 };
  const queue = [...pngs.entries()];
  await Promise.all(
    Array.from({ length: Math.max(1, os.cpus().length - 1) }, async () => {
      while (queue.length) {
        const [i, f] = queue.shift();
        let img = sharp(path.join(tmp, f));
        if (v.crop) {
          const { width: W, height: H } = await img.metadata();
          const side = Math.min(H, Math.round(W * v.crop.w));
          img = img.extract({ left: Math.round(W * v.crop.x), top: Math.round((H - side) / 2), width: side, height: side });
        }
        const info = await img
          .resize({ width: v.width })
          [format]({ quality, effort: format === 'avif' ? 4 : 5 })
          .toFile(path.join(outSeq, `f_${String(i).padStart(3, '0')}.${format}`));
        total += info.size;
        meta = { width: info.width, height: info.height };
      }
    }),
  );

  if (name === 'desktop') {
    fs.copyFileSync(path.join(tmp, pngs[0]), path.join(outAssets, 'before.png'));
    fs.copyFileSync(path.join(tmp, pngs[pngs.length - 1]), path.join(outAssets, 'after.png'));
  }
  manifest[name] = { count: pngs.length, width: meta.width, height: meta.height, path: `/hero/${v.dir}/f_{i}.${format}`, pad: 3 };
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log(`[${name}] ✓ ${pngs.length} frames · ${meta.width}×${meta.height} · ${(total / 1048576).toFixed(1)} MB · avg ${(total / pngs.length / 1024).toFixed(0)} KB/frame`);
}

// drop legacy flat keys from the first version of this script
for (const k of ['count', 'width', 'height', 'path', 'pad']) delete manifest[k];
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log('✓ src/data/heroSequence.json');
