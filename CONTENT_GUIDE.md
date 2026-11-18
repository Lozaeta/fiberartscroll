# Fiber Art Scroll: content guide

The app is `index.html`. All posts live in `art.json` (one array). Netlify publishes this repository to https://fiberartscroll.netlify.app automatically on every push to `main`.

## Daily batch (target)
- **50 art pieces**: about 45 `fiber` and 5 `painting`.
- **About 16 other posts**: 6 `technique`, 5 `artist` (profiles), plus about 5 spread across `history`, `dye` (fiber colors) and `tool` (equipment, ancient and modern).
- Overall the feed should stay well over 50% art; the app shows one non-art post after every three art posts.
- Quality over quantity: if a piece can't be described accurately, skip it. Coming in under 50 is fine.

## What to choose
- Worldwide, ancient to current. Mix famous works with lesser-known ones; lesser-known is welcome.
- Fiber art broadly: weaving, tapestry, embroidery, quilting, knitting, crochet, lace, felt, basketry, dyeing, featherwork, bark cloth, rugs, contemporary fiber sculpture and installation.
- Paintings should usually have a fiber connection (spinning, weaving, sewing, cloth, textiles shown in the picture).
- Never repeat anything already in `art.json` (check ids, titles and artists). `tools/merge.js` also rejects duplicates.

## Writing style (important)
- Plain, warm, specific language. Short sentences. No hype, no "testament to", "tapestry of", "rich tapestry", "stands as", "delve", "vibrant tapestry", no "In conclusion".
- Two paragraphs per post, about 55–80 words each.
  - Art: `about` = what it is, what you see, what it means. `artistBio` = who made it (or the community/workshop if unknown), and where it is now if known.
  - technique: `about` = how it's done; `artistBio` = where it comes from.
  - artist: `about` = their story; `artistBio` = their work.
  - history: `about` = what happened; `artistBio` = why it matters.
  - dye: `about` = the color and source; `artistBio` = its history.
  - tool: `about` = what it is and how it works; `artistBio` = then and now.
- Only state facts you are confident of. When unsure of a date, owner or museum, leave it out or use "about", "probably", "attributed to". Never invent quotes, names or numbers.
- Be respectful with sacred or sensitive material (Indigenous, religious, war, enslavement). Name peoples the way they name themselves where known.

## Entry format
```json
{"id":"kebab-case-unique","kind":"fiber","title":"…","artist":"…","date":"c. 1450–1500","place":"City, Country","medium":"Wool tapestry",
 "w":"Exact English Wikipedia article title (optional)",
 "c":"Wikimedia Commons search words (optional)",
 "f":"Exact Wikimedia Commons file name (optional)",
 "about":"…","artistBio":"…"}
```
- For `technique`, `artist`, `history`, `dye`, `tool` posts, set `artist` to "Technique", "Artist profile", "History", "Fiber color" or "Fiber tool".
- Images load live from Wikimedia in the viewer's browser. Give at least one of `f`, `w`, `c`:
  - `w` only when the Wikipedia article is about the object itself (its main image will be the object).
  - `c` should name the object plus artist or museum, e.g. "Unicorn in Captivity tapestry Met".
  - The app ignores a found image whose file name shares no word with the title, artist, `w` or `c`, and then shows a "See images" link. So pick search words that will appear in good file names.
  - Recent works under copyright usually have no free image; that's fine, give a `c` anyway.

## Daily procedure
1. `git pull`.
2. Write the new entries to `/tmp/new.json` as a JSON array.
3. `node tools/merge.js /tmp/new.json` (stamps today's date as `added`, so the app shows them first with a "New" tag).
4. Read the summary. Fix and re-run for any skipped entries worth keeping.
5. Commit `art.json` and push to `main`.
