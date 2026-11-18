#!/usr/bin/env node
/**
 * Builds the site icons from the Abinaya "A + needle" monogram (see src/components/site/Monogram.astro),
 * simplified and thickened so it stays readable at 16px.
 *
 *   npm run favicons
 *
 * Writes (into public/):
 *   favicon.svg          scalable tab icon (rounded indigo tile)
 *   favicon.ico          16 + 32 + 48 px, for older browsers
 *   apple-touch-icon.png 180 px, square (iOS rounds the corners itself)
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const out = path.join(root, 'public');

const INDIGO = '#26335f';
const CREAM = '#f5f1ea';
const THREAD = '#e8967a'; // madder, lightened so it reads on indigo

// monogram geometry (viewBox 10 6 132 116) scaled into a 64x64 tile
const A = 'M 28 116 C 22 116 16 110 16 102 C 16 90 28 84 38 72 L 68 18 C 70.5 13.5 73.5 11 77 11 C 80.5 11 83.5 13.5 86 18 L 118 78 C 126 92 136 98 136 107 C 136 113 130 117 124 117 C 116 117 112 110 110 102 L 97 74';
const glyph = (s, cx = 32, cy = 32) => {
  // centre the 132x116 monogram on (cx, cy) at scale s
  const tx = cx - (10 + 66) * s;
  const ty = cy - (6 + 58) * s;
  return `<g transform="translate(${tx.toFixed(3)} ${ty.toFixed(3)}) scale(${s})" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="${A}" stroke="${CREAM}" stroke-width="14"/>
    <path d="M 44 70 L 108 70" stroke="${THREAD}" stroke-width="11"/>
  </g>`;
};

const svg = (size, rx, scale) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64"><rect width="64" height="64" rx="${rx}" fill="${INDIGO}"/>${glyph(scale)}</svg>`;

const tile = svg(64, 14, 0.36);
fs.writeFileSync(path.join(out, 'favicon.svg'), tile + '\n');

const png = (markup, px) => sharp(Buffer.from(markup), { density: 600 }).resize(px, px).png({ compressionLevel: 9 }).toBuffer();

// favicon.ico: PNG-compressed entries
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map((px) => png(tile, px)));
const head = Buffer.alloc(6);
head.writeUInt16LE(1, 2); // type: icon
head.writeUInt16LE(images.length, 4);
const dir = Buffer.alloc(16 * images.length);
let offset = head.length + dir.length;
images.forEach((img, i) => {
  const px = sizes[i];
  dir.writeUInt8(px, i * 16);
  dir.writeUInt8(px, i * 16 + 1);
  dir.writeUInt16LE(1, i * 16 + 4); // planes
  dir.writeUInt16LE(32, i * 16 + 6); // bits per pixel
  dir.writeUInt32LE(img.length, i * 16 + 8);
  dir.writeUInt32LE(offset, i * 16 + 12);
  offset += img.length;
});
fs.writeFileSync(path.join(out, 'favicon.ico'), Buffer.concat([head, dir, ...images]));

// apple-touch-icon: full-bleed square, glyph a little smaller for the system's rounded mask
fs.writeFileSync(path.join(out, 'apple-touch-icon.png'), await png(svg(64, 0, 0.32), 180));

console.log('✓ public/favicon.svg, favicon.ico (16/32/48), apple-touch-icon.png (180)');
