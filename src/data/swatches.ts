/** Colour names used in products.json → swatch colours (shared by Collections + Products). */
export const swatch: Record<string, string> = {
  White: '#f7f5f0',
  Black: '#1d1c1a',
  Navy: '#22305a',
  Gray: '#9a9893',
  Heather: '#b3afa8',
  Charcoal: '#3a3a3a',
  Red: '#b5452b',
  Maroon: '#6e2430',
  Blue: '#3d5a99',
  'Light Blue': '#a9c4e0',
  Pink: '#e7b7b4',
  'Light Pink': '#f0d3cf',
  Purple: '#7d5a8c',
  Beige: '#d9c7a7',
  Cream: '#efe6d2',
  Khaki: '#b9a77c',
  Olive: '#6b6b3a',
  Green: '#6f8f5a',
  'Sage Green': '#8b9d6f',
  Yellow: '#e6c35c',
};

/** "Any Custom Color" and other free-text entries have no swatch: render them as text. */
export const hasSwatch = (c: string) => c in swatch;
