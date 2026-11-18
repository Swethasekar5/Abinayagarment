# Abinaya Garment Shop: Redesign Brief

**Phase 1:** design every screen in Stitch (static layout, logo, imagery).
**Phase 2:** build it in Astro and add scroll motion (GSAP ScrollTrigger + Lenis + Astro View Transitions).

Every section below has two parts:
- **Phase 1 · Stitch prompt:** copy and paste it into Stitch.
- **Phase 2 · Motion:** what happens on scroll. This is for the build, not for Stitch, but it explains why the layout is shaped the way it is (layers, spare room, pinned areas).

---

## 0. How to use this in Stitch

1. Start a new **Web** project. Use the higher-quality (Pro/Experimental) mode if your plan has it.
2. Paste **§2 Design System** first and let Stitch generate a style or test screen. This locks the look.
3. Build the **Home page section by section** (§3.1 → §3.12). Paste each prompt as a follow-up edit on the same screen ("Add below the previous section: …"). Stitch does much better with one section at a time than with one giant prompt.
4. When Home looks right, do the other pages (§4), then the logo (§5).
5. Generate **2–3 variants of the hero only**. Pick the best one, then keep everything else consistent with it.
6. Export to **Figma** (preferred) or HTML, and share the link or export with me for Phase 2.

Everything in `[square brackets]` is a placeholder for real business facts. Do not let Stitch invent numbers, client names or testimonials. Fake facts on a B2B site cost trust.

---

## 1. Creative direction

### The 5-second test
A retailer or distributor landing on the site should feel within 5 seconds:
1. **"This is a real Tiruppur manufacturer"**, not a reseller and not a template.
2. **"They are organised and premium"**: they will deliver on time, at the quality shown.
3. **"Ordering is easy"**: a WhatsApp or quote button is always one tap away.

### Concept: "The Thread"
Tiruppur is India's knitwear capital. The whole site is built around **one continuous stitched thread**:
- It starts as a needle stitching the logo (intro).
- It runs down the page as you scroll and connects every section.
- It becomes the path of the "Yarn → Dispatch" process.
- It ties itself into a knot around the final call-to-action.

Supporting motifs: **garment tags and woven labels** for small spec badges, **fabric textures** on backgrounds, **folded-cloth** reveals.

### Tone
Editorial, warm and tactile, like a premium textile catalogue or a fashion lookbook, combined with the reliability of a B2B supplier. **Not** corporate-blue SaaS, **not** glassmorphism, **not** neon gradients.

---

## 2. Design system (paste this first)

```
Create the design system and a style tile for a premium editorial website for
"Abinaya Garment Shop" — a B2B cotton apparel manufacturer & wholesaler in
Tiruppur, Tamil Nadu (India's knitwear capital). Buyers are retailers,
distributors and bulk/corporate buyers.

MOOD: warm, tactile, editorial — like a premium textile lookbook crossed with a
reliable manufacturer. Calm, confident, lots of whitespace. Not corporate, not
template-like, no glassmorphism, no neon gradients, no emoji icons.

COLORS (use exactly):
- Cream (page background): #F5F1EA
- Paper (cards / raised surfaces): #FBF9F5
- Ink (text, dark sections): #171512
- Ink-soft (secondary text): #5A554D
- Sage (support / soft fills / tags): #8B9D6F, Sage-tint #E4E8DA
- Indigo (primary accent — buttons, links, highlights; references natural
  indigo dye): #26335F
- Madder Red (ONLY for the stitched thread line and tiny markers): #B5452B
- Hairline borders: #DDD6CA
- WhatsApp green #25D366 only on the WhatsApp button icon.

TYPOGRAPHY:
- Display / headlines: "Fraunces" (serif), weights 300–600, tight letter
  spacing (-2%), very large sizes: H1 96–128px desktop, H2 56–72px.
  Use italic Fraunces for 1–2 emphasis words per headline.
- Body / UI: "Manrope", 16–18px, line-height 1.6.
- Labels / specs / tags: "JetBrains Mono", 12–13px, uppercase, letter
  spacing +8%. Used like garment-tag text: "180 GSM · 100% COMBED COTTON".

LAYOUT:
- Desktop 1440px frame, 12-column grid, 1280px max content, 24px gutters,
  section vertical padding 160px. Mobile 390px frame, 20px side margins.
- Asymmetric compositions; avoid centering everything.
- Corner radius: 2px on buttons/inputs, 0px on images (sharp, editorial).
  Only exception: pill-shaped tags (999px).

SIGNATURE ELEMENTS:
- A dashed "stitched thread" line in Madder Red (2px, dash 8 gap 6) that
  travels vertically through the page connecting sections.
- Spec "garment tags": small paper-colored tag with a punched hole on the left,
  mono uppercase text, thin ink border.
- Section labels like woven labels: "(01) — WHY US" in mono.
- Subtle woven-cotton paper texture on cream backgrounds (very low contrast).

COMPONENTS to show on the style tile: primary button (Indigo bg, cream text,
mono uppercase label, arrow →), secondary button (ink outline), WhatsApp
button (ink bg, green icon), spec tag, section label, input field with bottom
border only, product card (3:4 image, serif name, mono specs line), nav bar.
```

---

## 3. Home page, section by section

> Before every section after the first, start the prompt with: *"Keep the same design system. Add the next section below the previous one:"*

### 3.1 Navigation

**Phase 1 · Stitch prompt**
```
Top navigation bar, 88px tall, transparent over the hero.
Left: logo (monogram + "Abinaya" wordmark in Fraunces, small mono line
"TIRUPPUR · EST. [YEAR]" under it).
Center-right: links in Manrope 15px — Products, Process, Gallery, About,
Contact. Active link has a short dashed Madder-Red underline (stitch).
Right: small WhatsApp icon button (ink circle, green glyph) and a primary
Indigo button "GET WHOLESALE PRICE →".
Also show the scrolled state: cream background at 85% opacity, 1px hairline
bottom border, height 72px.
Mobile: logo + WhatsApp icon + menu icon; full-screen ink menu overlay with
huge Fraunces links stacked, each with a mono index (01–05).
```
**Phase 2 · Motion**
- Hides when scrolling down and slides back in when scrolling up. Turns into the cream, blurred state after 80px.
- CTA button is magnetic: it follows the cursor slightly within 12px.
- Mobile menu: the ink panel wipes down from the top, links rise in staggered (60ms).

### 3.2 Hero, the first impression (make 2–3 variants)

**Phase 1 · Stitch prompt**
```
Full-viewport hero (100vh) on cream textured background.

Composition (asymmetric):
- Left 7 columns: section label "(00) — TIRUPPUR KNITWEAR HOUSE" in mono.
  Below it, a massive Fraunces headline over 3 lines, 120px:
  "Stitched in Tiruppur.
   Worn across *India*."   (italic on "India")
  Under it, Manrope 19px, max 460px wide: "Premium cotton apparel made and
  supplied in bulk — for retailers, distributors and brands that can't afford
  to miss a season."
  Two buttons: Indigo "GET WHOLESALE PRICE →" and ink-outline
  "EXPLORE PRODUCTS".
- Right 5 columns: a tall layered image collage — one large portrait photo of
  a neat stack of folded cotton t-shirts in several colors (warm natural
  light), a smaller overlapping square photo of colorful thread cones on a
  knitting machine, offset down-left. 3 floating garment spec tags pinned
  over the images: "180 GSM", "100% COMBED COTTON", "MOQ [500] PCS".
- A Madder-Red dashed stitch line starts under the headline, loops once
  around the image collage and exits at the bottom center of the hero.
- Bottom strip across full width, separated by a hairline: 4 facts in mono
  label + Fraunces number: "[XX] YEARS", "[X,XX,XXX] PCS / MONTH",
  "[XXX]+ RETAIL PARTNERS", "PAN-INDIA DISPATCH".
- Bottom-right: small "SCROLL ↓" mono label with a short vertical stitch.

Mobile: headline 52px, image collage below the text (single image + 2 tags),
facts as a 2x2 grid.
```
**Phase 2 · Motion** (pinned scene, about 200vh of scroll)
- **On load:** the headline lines rise from behind a mask, word by word (SplitText, 0.9s, stagger 0.06). Images unmask with a clip-path "fabric unfold" from top to bottom. Tags drop in and swing slightly, like hanging tags.
- **On scroll (scrubbed):** the headline drifts up and fades. The large image scales from its card size to almost full-bleed. The thread-cone image and tags move at different parallax speeds (depth). The stitch line draws itself (SVG stroke-dashoffset) and continues into the next section.
- Facts strip numbers count up once.

### 3.3 Category marquee band

**Phase 1 · Stitch prompt**
```
Full-width ink (#171512) band, 180px tall. One line of giant Fraunces text
(110px) in cream, alternating solid and outline-only words, separated by a
small Madder-Red stitched cross "✕":
"Men's Tees ✕ Polos ✕ Kids Wear ✕ Oversized ✕ Hoodies ✕ Track Pants ✕
Custom Print ✕". Text overflows both edges of the screen.
```
**Phase 2 · Motion**
- Infinite marquee. Its speed and direction follow scroll velocity: it speeds up when you scroll fast and reverses when you scroll up.
- Hovering a word fills the outline words solid.

### 3.4 Manifesto / intro

**Phase 1 · Stitch prompt**
```
Cream section. Label "(01) — WHO WE ARE". A single large paragraph in
Fraunces 56px, spanning 10 columns, left aligned:
"We are a Tiruppur garment house making everyday cotton essentials
[pill-image: hands folding a t-shirt] for shops and brands across India —
from yarn selection to the final [pill-image: packed cartons] carton, under
one roof."
The pill-images are small rounded photos (120x56px) embedded inline between
words. Below, right-aligned: link "OUR STORY →" in mono with stitched underline.
```
**Phase 2 · Motion**
- Scroll-scrubbed reading effect: words go from 15% to 100% opacity in order as you scroll.
- Inline pill-images expand in width from 0 as their line becomes active.

### 3.5 Why buyers choose us

**Phase 1 · Stitch prompt**
```
Two-column layout.
Left (4 cols, sticky): label "(02) — WHY US", Fraunces 64px heading
"Why buyers *stay* with us." and a small ink-outline button
"TALK TO OUR TEAM".
Right (7 cols): 4 large numbered rows separated by hairlines, each ~200px:
 01  Export-grade cotton — "Combed, bio-washed fabric chosen lot by lot."
 02  Bulk capacity — "From [500] to [50,000] pieces without losing finish."
 03  Honest wholesale pricing — "Clear rates, no hidden charges, GST invoices."
 04  On-time dispatch — "Tracked shipments to [XX]+ cities across India."
Each row: big Fraunces numeral in Sage on the left, title Fraunces 32px,
description Manrope, and a thin line-art icon (needle, stacked boxes, tag,
truck) on the far right. A Madder-Red dashed stitch runs vertically along
the left edge of the right column, with a small stitched "✕" at each row.
```
**Phase 2 · Motion**
- The left column stays pinned while the rows scroll.
- Each row reveals with a line that draws across, then the text slides up. The stitch line "sews" a cross as each row hits the middle of the screen.
- Icons draw themselves (SVG stroke).

### 3.6 Product categories: horizontal scroll

**Phase 1 · Stitch prompt**
```
Section on Paper background. Header row: label "(03) — COLLECTIONS",
Fraunces 72px "Ready-to-sell *collections*", right side mono
"12 CATEGORIES · SIZES XS–XXL & KIDS".
Below: a horizontal row of large product category cards that overflows the
screen to the right (show 3.5 cards). Each card 420x620: full-bleed 3:4
photo on top (garments shot flat-lay or on hanger, warm light, cream
backdrop), below it: index "01/12" in mono, category name in Fraunces 36px
(e.g. "Men's Cotton Tees", "Polo T-Shirts", "Kids Cotton Wear",
"Oversized Tees", "Hoodies", "Track Pants"), spec line in mono
"100% COTTON · 6 COLOURS · XS–XXL", small color swatch dots, and
"ENQUIRE →" link.
Last card is different: Indigo background, Fraunces "Need a custom print or
your own label?" + button "START CUSTOM ORDER".
A progress bar (thin stitch line) under the row shows scroll progress.
Mobile: swipeable carousel, 1.2 cards visible.
```
**Phase 2 · Motion**
- The section pins, and vertical scrolling moves the cards horizontally (scrubbed).
- Images inside the cards parallax slightly in the opposite direction. Cards skew or tilt by 1–3° depending on scroll speed.
- Hovering a card swaps the image to a second shot and expands the swatches. The progress stitch fills as you go.

### 3.7 Process: "From yarn to your shelf" (signature section)

**Phase 1 · Stitch prompt**
```
Cream section, tall. Label "(04) — PROCESS". Centered-left Fraunces 80px
"From yarn to *your shelf*."
Below: a single large Madder-Red dashed thread path that snakes left-right
down the page, connecting 5 steps placed alternately left and right:
 01 YARN — "Combed cotton yarn sourced from trusted Tamil Nadu spinners."
 02 KNITTING — "Knitted in-house to the GSM you need."
 03 DYEING & WASHING — "Colour-fast, bio-washed, shrink controlled."
 04 CUTTING & STITCHING — "Precise patterns, double-needle finish."
 05 QC & DISPATCH — "Every piece checked, packed and shipped on time."
Each step: a 480x360 photo (real factory-style, warm documentary look: yarn
cones, circular knitting machine, dye vats, tailor at sewing machine, cartons
being packed), big mono step number, Fraunces 36px title, one-line Manrope
description. Each step has a small circular node on the thread path.
```
**Phase 2 · Motion**
- This is the payoff of the hero thread. The SVG path draws in sync with scroll, as if being stitched live, and a small needle icon travels along the tip of the line.
- When the needle reaches a node, the node pops, the photo reveals with a clip-path wipe along the thread direction, and the text fades up.
- Photos move at a slow parallax.

### 3.8 Numbers band

**Phase 1 · Stitch prompt**
```
Full-width Indigo (#26335F) section, cream text. Label "(05) — IN NUMBERS"
in mono. 4 columns of huge Fraunces numerals (140px) with mono captions:
"[XX]" YEARS IN TIRUPPUR · "[X.X] L" PIECES / MONTH · "[XXX]+" RETAIL
PARTNERS · "[XX]" STATES SERVED.
Hairline cream dividers between columns. A thin cream stitched line
runs across the top edge.
```
**Phase 2 · Motion**
- The page background shifts from cream to indigo as the section enters (scrubbed), then back after it.
- Numerals count up, with digits rolling like an odometer.

### 3.9 Who we supply

**Phase 1 · Stitch prompt**
```
Cream section. Label "(06) — WHO WE SUPPLY". Fraunces 64px
"Built for people who *sell* clothes."
4 tall columns, each with a portrait photo and text below:
 Retail shops & boutiques — "Small MOQs, fast-moving basics, steady restock."
 Distributors & wholesalers — "Container-level volumes at factory pricing."
 Corporate & uniforms — "Logo-printed polos and tees for teams and events."
 Online sellers & brands — "Your label, your packaging, our production."
Each column has a mono tag on top of the photo ("FOR RETAIL", etc.).
```
**Phase 2 · Motion**
- Columns enter with staggered rise. Photos have a slight hover zoom, and the tag swings like a hanging label on hover.

### 3.10 Inside the workshop (gallery teaser)

**Phase 1 · Stitch prompt**
```
Ink background section. Label "(07) — INSIDE THE WORKSHOP" in cream mono.
Editorial collage of 6 photos in varied sizes and positions (not a uniform
grid): fabric rolls, thread cones close-up, tailor's hands, folded stacks,
quality checker with measuring tape, packed cartons. One slot is a 16:9
video placeholder with a cream circular play button "PLAY FILM".
Bottom: link "SEE FULL GALLERY →".
```
**Phase 2 · Motion**
- Each photo moves at a different parallax speed, so the collage "breathes".
- Cursor becomes a "VIEW" circle over images.

### 3.11 Final call-to-action

**Phase 1 · Stitch prompt**
```
Cream section, generous height. Huge Fraunces headline centered-left,
140px: "Let's stitch your *next order*."
Right side: a compact quote form on Paper card with bottom-border inputs:
Name, Phone / WhatsApp, Product (dropdown), Quantity, and Indigo button
"GET WHOLESALE PRICE →". Under the form: "or chat instantly" + large ink
WhatsApp button with green icon "CHAT ON WHATSAPP".
The Madder-Red stitch line arrives from the top and ties into a small knot
next to the headline.
Small mono note: "WE REPLY WITHIN [24] HOURS · MON–SAT".
```
**Phase 2 · Motion**
- The thread finishes: it draws in and ties the knot (SVG morph) when the section is 60% in view.
- Headline words rise. Buttons are magnetic. Inputs animate a stitched underline on focus.

### 3.12 Footer

**Phase 1 · Stitch prompt**
```
Ink footer. Top: 4 columns — address (8/76, Angeripalayam Road, Tiruppur,
Tamil Nadu), quick links, contact (phone, WhatsApp, email), working hours.
Bottom: the word "ABINAYA" in Fraunces spanning the full width of the screen
(edge to edge, ~300px tall), cream at 90% opacity. Tiny mono line under it:
"© 2026 ABINAYA GARMENT SHOP · TIRUPPUR · MADE WITH CARE".
```
**Phase 2 · Motion**
- Giant wordmark letters rise in, staggered, as the footer reveals. The footer is "uncovered" by the page above (a sticky reveal effect).

---

## 4. Other pages

> Prefix each with: *"Same design system and nav/footer as the Home page."*

### 4.1 Products
```
Products page. Hero: label "(PRODUCTS)", Fraunces 96px "The catalogue."
with mono "[12] CATEGORIES · WHOLESALE ONLY".
Sticky filter bar under hero: search input (bottom border), category pill
tags (sage-tint, active = indigo), sort dropdown.
Grid of product cards, 3 per row desktop / 1 mobile: 3:4 photo, Fraunces
name, mono spec line (fabric · GSM · sizes), color swatch dots, buttons
"ENQUIRE ON WHATSAPP" and "+ ADD TO QUOTE".
A floating bottom-right "QUOTE LIST (3)" pill opens a right-side drawer
listing selected products with quantity inputs and "SEND QUOTE REQUEST".
```
**Phase 2:** cards fade up in batches. Filtering animates the grid with FLIP (cards slide into new positions). The drawer slides in from the right. Adding to the quote "flies" a mini tag to the pill.

### 4.2 Gallery
```
Gallery page. Fraunces 96px "Inside *Abinaya*." Category chips row
(Fabric, Stitching, Collections, Kids, Men, Women). Masonry grid of photos
with varied heights, mono caption under each. Full-screen lightbox state:
ink background, large image, caption, prev/next arrows, counter "04/21".
```
**Phase 2:** masonry items reveal with a clip-path. The lightbox opens with a shared-element zoom from the thumbnail (View Transitions). Swipe on mobile.

### 4.3 About
```
About page. Hero: Fraunces 96px "A Tiruppur story, *[XX] years* in the
making." with a wide documentary photo of the workshop.
Then a vertical timeline connected by the Madder-Red stitch:
[YEAR] founded · [YEAR] first bulk export / big order · [YEAR] new unit ·
today. Then "Our values" (Quality, Honesty, Reliability) as 3 large
editorial rows, then a location block with photo of Tiruppur and map card.
```
**Phase 2:** the timeline thread draws with scroll and the milestones pop in. Photos parallax.

### 4.4 Contact
```
Contact page. Split screen. Left (ink): Fraunces 80px "Talk to us." then
contact list with big type — WhatsApp, Phone, Email, Address — each with a
mono label and arrow. Right (cream): full inquiry form (name, company,
phone, email, city, product, quantity, message, consent checkbox) and
Indigo submit "SEND INQUIRY →". Below: full-width map in a muted
cream/ink map style with a custom Madder-Red pin.
```
**Phase 2:** the split halves slide in from opposite sides. The success state shows a short "stitched checkmark" animation.

### 4.5 Page transitions (Phase 2 only)
A cream curtain wipes across with a stitch line along its leading edge, and the next page's headline rises in (Astro View Transitions).

### 4.6 Intro loader (Phase 2 only, first visit only)
A needle stitches the logo monogram in about 1.2s, then the curtain lifts into the hero. It's skippable, and it's never shown again in the same session.

---

## 5. Logo prompt

```
Design a logo for "Abinaya Garment Shop", a Tiruppur cotton knitwear
manufacturer. Deliver: (1) a monogram mark — a capital "A" drawn as a single
continuous stitched thread line, with a needle forming the crossbar or the
thread ending in a small loop; (2) a wordmark "Abinaya" in a refined
high-contrast serif similar to Fraunces, with a small mono tagline
"TIRUPPUR · KNITWEAR" underneath; (3) the horizontal lockup of both.
Colors: Ink #171512 on Cream #F5F1EA, plus a reversed cream-on-ink version,
and one version where the thread is Madder Red #B5452B.
Must work at 32px favicon size. Flat, no gradients, no 3D, no shadows.
```

## 6. Image direction (for Stitch-generated or real photos)

- **Light:** warm natural daylight, soft shadows, slightly desaturated. **No** studio-white e-commerce look.
- **Subjects:** folded stacks, flat-lays on cream linen, colourful thread cones, circular knitting machines, hands at sewing machines, measuring tape QC, packed cartons, fabric close-ups (knit texture).
- **Avoid:** smiling stock models giving thumbs-up, generic offices, laptops, handshake photos, AI-looking faces.
- **Replace later:** any AI or placeholder image should be swapped with **real photos of your own shop and stock** before launch. That one change matters more than any animation.

## 7. Anti-"AI slop" checklist

- [ ] No three identical icon cards in a row. Use asymmetric layouts and editorial rows.
- [ ] No purple/blue gradients, glass cards or glowing blobs.
- [ ] No emoji icons. Use line icons only.
- [ ] Not everything centred.
- [ ] Real copy, no lorem ipsum. No invented stats or testimonials.
- [ ] One accent colour (indigo). Red is only for the thread.
- [ ] Sharp image corners, consistent spacing (160px sections).
- [ ] Typography does the heavy lifting: big serif, small mono details.

## 8. What to hand back for Phase 2

1. The Figma link (Stitch → "Export to Figma"), or exported HTML plus screenshots of each section.
2. Your chosen hero variant.
3. Logo files (SVG if possible).
4. Real numbers for every `[placeholder]`, plus real photos if you have them.

### Phase 2 build stack (for reference)
Astro (existing project) · custom CSS with design tokens (Bootstrap removed) · GSAP + ScrollTrigger + SplitText (free) · Lenis smooth scroll · Astro View Transitions · `prefers-reduced-motion` fallback that turns off pinning and scrubbing and keeps simple fades · lazy-loaded images · motion tested on mid-range Android phones.
