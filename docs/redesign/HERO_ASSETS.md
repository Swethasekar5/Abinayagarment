# Hero scroll scene: prompts for images and video

The Home hero is a pinned scroll story: **yarn → fabric panels → stitched seam → finished garments**.
All assets use one **overhead flat-lay** scene (camera pointing straight down at a workbench). Generators handle this angle most reliably, it keeps before and after aligned, and it animates without camera drift.

```
 scroll ──────────────────────────────────────────────────────────────▶
 [card: BEFORE] → [BEFORE full screen] → [AFTER panels slide in] → [seam stitched] → [AFTER + text]
                                          └──────── optional VIDEO replaces this part ───────┘
```

Order of work: **1 Before image → 2 After image (edit of 1) → 3 Video (1 = first frame, 2 = last frame)**.

---

## 1. BEFORE image (text-to-image)

Settings: **16:9 landscape, highest resolution available (≥ 2560 × 1440)**. Make 4 variations and pick the best.

```
Overhead top-down flat-lay photograph, camera perfectly perpendicular to the
table, 16:9 landscape. A natural unbleached linen cloth on a warm oak workbench
in a Tiruppur knitwear workshop. Centred composition filling the middle third of
the frame: six combed-cotton yarn cones in ecru, deep natural indigo, sage green,
madder red and charcoal, their loose threads trailing across the linen and
converging toward the centre; beside them, flat unsewn knitted cotton jersey
t-shirt pieces (one front, one back, two sleeves) cut cleanly with visible raw
edges, laid out neatly like a sewing pattern; a pair of vintage steel tailor's
shears and a cloth measuring tape loosely curled; faint tailor's chalk marks.
Generous empty linen around the subject, especially in the lower-left area.
Soft directional morning window light from the upper left, gentle long shadows,
tactile fibre detail visible on the yarn and the jersey knit. Warm, muted
editorial palette: cream, ecru, indigo, sage, one accent of madder red.
Shot on medium-format camera, 80mm lens, f/8, everything in sharp focus,
subtle film grain, Kodak Portra colour grading. Premium textile lookbook,
quiet luxury, photorealistic.
```

**Avoid** (paste into the negative prompt if your tool has one):
```
people, hands, faces, text, letters, logos, readable labels, watermark, plastic,
clutter, oversaturated colours, neon, CGI, 3D render look, illustration,
heavy vignette, tilted or angled camera, perspective view, blur
```

---

## 2. AFTER image (image edit of BEFORE)

Upload the chosen BEFORE image to an **image-edit** tool (Gemini image edit, ChatGPT image edit, Flux Kontext, Photoshop Generative Fill, etc.), then:

```
Edit this image. Keep the exact same overhead camera, framing, linen cloth,
oak table, lighting direction, shadows, colour grade and film grain.
Transform the yarn cones and the unsewn fabric pieces into finished garments
in the same central area: three neat stacks of folded crew-neck cotton
t-shirts in ecru, deep indigo and sage green, with one madder-red and one
charcoal t-shirt folded on top; crisp folds, visible double-needle stitched
hems and ribbed necklines. One single thread still trails from the stack
across the linen. Keep the tailor's shears and measuring tape in the same
positions. Keep the lower-left area of the linen empty. Photorealistic.
No text, logos or readable labels.
```

**Only if you have no edit tool** (text-to-image, same settings as step 1):
```
Overhead top-down flat-lay photograph, camera perfectly perpendicular to the
table, 16:9 landscape. A natural unbleached linen cloth on a warm oak workbench
in a Tiruppur knitwear workshop. Centred in the middle third of the frame:
three neat stacks of folded crew-neck combed-cotton t-shirts in ecru, deep
natural indigo and sage green, with one madder-red and one charcoal t-shirt
folded on top; crisp folds, double-needle stitched hems, ribbed necklines; one
thread trailing across the linen; vintage steel tailor's shears and a curled
cloth measuring tape beside them. Generous empty linen around the subject,
especially lower-left. Soft directional morning window light from the upper
left, gentle long shadows, tactile knit texture. Warm muted editorial palette.
Medium-format camera, 80mm, f/8, sharp throughout, subtle film grain, Kodak
Portra grading. Premium textile lookbook, photorealistic.
```

---

## 3. VIDEO (first frame = BEFORE, last frame = AFTER)

Use a video model with **first frame / last frame** (start / end keyframe), such as Veo, Kling, Runway or Luma.
Settings: **16:9 · 1080p or 4K · 8 seconds · 24 fps · sound off**. Generate 3–4 takes.

```
Locked-off overhead camera. Absolutely no camera movement: no zoom, no pan,
no tilt, no shake. The framing never changes. Photorealistic stop-motion style
transformation on the linen-covered workbench, one continuous shot:
0–2 s: the yarn cones slowly unwind; threads lift and glide across the linen
toward the centre.
2–4 s: the threads interlace into flat knitted cotton jersey, growing row by
row into fabric pieces.
4–6 s: the knitted pieces slide together and a neat line of stitches runs along
every seam, forming t-shirts.
6–8 s: the finished t-shirts fold themselves crisply into neat stacks and
settle; the final second holds perfectly still.
Soft morning window light from the upper left with consistent shadows
throughout, tactile fibre detail, smooth continuous motion, calm and
satisfying. No hands, no people, no text, no flicker, no warping.
```

**Only if your tool has no first/last-frame option** (text-to-video): paste the BEFORE prompt from step 1, then add the video prompt above after it.

---

## 4. Mobile versions (optional)

Re-run steps 1–3 with **9:16 vertical** and replace "16:9 landscape" with
`9:16 vertical, subject centred in the middle 60% of the frame`.

---

## 5. How to pick the best take

- [ ] Camera is truly top-down and **identical** in BEFORE, AFTER and every video frame
- [ ] Colours match the brand: cream, ecru, indigo, sage, a little madder red
- [ ] No warped yarn cones, melted folds, extra sleeves or random text
- [ ] Lower-left area stays calm (the headline and buttons sit there)
- [ ] Video: no flicker, no sudden jumps, and the last second is still

## 6. Hand-off

Put the files here and tell me:

```
docs/redesign/hero/
  before.png
  after.png
  transition.mp4      (optional)
  before-mobile.png   (optional, 9:16)
  after-mobile.png    (optional, 9:16)
```

What happens next: images get optimised and swapped in. The video becomes ~150 WebP frames (via ffmpeg) drawn on a canvas and scrubbed with scroll, played forwards and backwards. Phones and reduced-motion users keep the lightweight image version.

---

## 7. Rebuilding the frames (developers)

```
npm run hero:frames                                   # uses docs/redesign/hero/transition.mp4
npm run hero:frames -- path/to/new.mp4 --end 152      # --end = last frame before the still hold
```
Defaults: every 2nd frame, 1440px wide, AVIF quality 32, denoise 8 (≈ 4–5 MB for an 8 s clip).
Outputs `public/hero/seq/*.avif`, `src/assets/hero/before.png` + `after.png`, `src/data/heroSequence.json`.
