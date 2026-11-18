/**
 * Tile sizes for the gallery's 3-column editorial grid (rows fill without holes).
 *   s  = 1×1   w = 2 cols × 1 row   xl = 2×2   f = 3 cols × 2 rows
 * Blocks of 7 tiles fill exactly 4 rows (alternating the big tile left / right);
 * the remainder uses a hand-made pattern that also ends flush.
 */
export type Tile = 's' | 'w' | 'xl' | 'f';

const BLOCKS: Tile[][] = [
  ['xl', 's', 's', 'w', 's', 'w', 's'],
  ['s', 'xl', 's', 'w', 's', 's', 'w'],
];
const TAIL: Record<number, Tile[]> = {
  0: [],
  1: ['f'],
  2: ['w', 's'],
  3: ['s', 's', 's'],
  4: ['w', 's', 's', 'w'],
  5: ['xl', 's', 's', 'w', 's'],
  6: ['xl', 's', 's', 's', 's', 's'],
};

export function tiles(n: number): Tile[] {
  const out: Tile[] = [];
  let b = 0;
  while (n - out.length >= 7) out.push(...BLOCKS[b++ % 2]);
  return out.concat(TAIL[n - out.length]);
}
