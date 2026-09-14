# Walk Hike Climb (WHC / SRT) — Redesign

A responsive, high-performance static website redesign for **Walk Hike Climb (Pty) Ltd**, based in Goodwood, Cape Town, South Africa.

## Project Structure

```text
walk-hike-climb-redesign/
│
├── index.html                   # Main production website entrypoint
├── style.css                    # Responsive custom design system (Brand guidelines compliant)
├── app.js                       # Interactive filtering, drawer modal, and navigation logic
├── sitepad-data/                # Optimized site images, logo assets, and photos
│
├── presentation/                # Pitch deliverables and presentation materials
│   ├── Walk_Hike_Climb_Website_Redesign_Showcase.pptx
│   └── screenshots/             # High-resolution multi-view device mockups
│
├── tools/                       # Automation scripts for screenshots & deck generation
│   ├── capture_screenshots.py
│   ├── generate_presentation.py
│   └── take_edge_screenshots.js
│
├── archive/                     # Offline backups and legacy scrapes
│   ├── www.walkhikeclimb.co.za/
│   ├── site-data/
│   └── site-inc/
│
├── .gitignore                   # Deployment and Git exclusion rules
└── README.md                    # Project documentation
```

## Previewing Locally

Open `index.html` directly in any modern browser, or run a lightweight local static server:

```bash
# Using Python:
python -m http.server 8000

# Or using Node:
npx serve .
```

## Deployment for Production / Preview

This repository is ready for zero-config static hosting on platforms like:
- **GitHub Pages** (Deploy from root `/`)
- **Netlify / Vercel / Cloudflare Pages** (Publish directory: `.`)
- **Afrihost / cPanel / Apache / Nginx** (Upload root directory or contents directly to `public_html`)
