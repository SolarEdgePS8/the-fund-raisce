# The Fund RaiSCe — independent website reconstruction

**Status: functional design prototype, not a verified pixel-perfect copy.**

This is a dependency-free static website based on the limited verifiable information about the website `https://home-5021971741.app-ionos.space/`: a non-commercial Star Citizen fan initiative combining calming cinematic journeys and encouragement to donate **directly** to children's education charities.

## Included

- Responsive desktop/mobile landing page with celestial/space-inspired visuals built in CSS and Canvas (no third-party image hosts or external fonts).
- Main navigation and mobile menu, film gallery with filters, accessible modal and native HTML5 video playback, support/charity section and legal pages.
- GDPR-friendly technical defaults: no analytics, tracking cookies, external font APIs or forms. Outgoing charity links are explicitly marked as external.
- SEO metadata, reduced-motion support, keyboard interaction and mobile layouts.
- Plain HTML/CSS/JavaScript — works with GitHub Pages, IONOS Deploy Now and any static hosting service. No npm/build environment required.

## Important differences from the original

The original URL could **not** be fetched during this session. Its HTML, styles, site images, videos, exact page structure and exact wording were not available for comparison. Therefore **do not describe this project as a 1:1 reconstruction**. It is a high-quality functional approximation of the known concept, not an extracted copy.

The three titles in the gallery are demonstrational: **Silent Orbit**, **Into the Quiet**, **First Light**. They are not claimed to be the original film titles. The CSS illustrations are original reconstructions, not stills from the source site.

The donation links to UNICEF Germany and Save the Children Germany are examples supported by their real official websites, **not verified original partners**.

## Test locally

Open `index.html` in your browser. To test optional video loading, serve the directory via a local server:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>. A basic local server is important for fetching local video files.

## Add original videos

Add files with these exact names (or change the `data-film` attributes in `index.html`):

| Scene | File |
|---|---|
| Silent Orbit | `media/silent-orbit.mp4` |
| Into the Quiet | `media/into-the-quiet.mp4` |
| First Light | `media/first-light.mp4` |

The player detects available videos automatically. If they aren't present, it shows an explicitly marked visual preview.

If you have the original images, use them as `<img>` or `<picture>` inside `.film-art` and replace CSS illustration classes in `index.html` and `styles.css`.

## Deploy via GitHub Pages

1. Create a new GitHub repository (e.g. `the-fund-raisce`) in your GitHub account.
2. Upload these files at the repository root (not just the ZIP).
3. In repository **Settings → Pages**, select **Deploy from a branch**, branch `main`, folder `/ (root)`.
4. GitHub Pages will publish the site under `https://YOUR_USERNAME.github.io/the-fund-raisce/`.

For IONOS Deploy Now, import the GitHub repository as a static project; no build script is required.

## Before going live

- Match the actual source site's design, copy and video selection once access is available.
- Replace design-example videos and charity entries with authorised original content and URLs.
- Complete **imprint.html** with accurate mandatory provider contact information and check **privacy.html** against the actual host's logging/data processing.
- Check applicable copyright and **Star Citizen** fan-content conditions, especially requirements for credits and the mandatory fan-production disclaimer (<https://support.robertsspaceindustries.com/hc/en-us/articles/5422808416151-Fan-Film-and-Machinima-Policy>).
- Decide whether you need a contact mechanism, cookie-consent manager or other features — none are required by the current code itself, but additional tools may trigger obligations.

## File overview

```text
index.html               Home, mission, gallery, giving, dialogue
styles.css               Responsive visual system and animations
app.js                   Interactions, video fallback, starfield
assets/favicon.svg       Self-contained SVG favicon
media/                   Optional local videos (empty by design)
imprint.html             Explicitly unfinished legal template
privacy.html             Explicitly unfinished privacy template
README.md                Documentation
```

No customer or personal credentials are stored in this project.
