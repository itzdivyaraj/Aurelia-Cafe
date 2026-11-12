# Aurelia Café & Roastery — Reusable Hospitality Website Template

A modern, responsive, conversion-focused React + Vite + Tailwind CSS website template built for specialty cafés, bakeries, and restaurants.

## Tech Stack

- **React 19** (functional components, hooks, context)
- **Vite 6** (fast development & optimized production build)
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Lucide React** (consistent iconography)
- **Semantic HTML5 + JSON-LD Schema** (SEO & accessibility)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open the local URL printed by Vite (typically `http://localhost:5173`).

### 3. Build for Production

```bash
npm run build
```

The production-ready static bundle is generated in `dist/`. You can preview it locally with:

```bash
npm run preview
```

## Customizing for a New Client

All client-specific content, branding, colors, section toggles, and integrations live in:

- [src/config/siteConfig.js](src/config/siteConfig.js) — Business name, logo, colors, hero copy, about story, special offer, WhatsApp number, contact details, Google Maps URL, opening hours, SEO metadata, and `sections` visibility toggles.
- [src/data/menuData.js](src/data/menuData.js) — Menu categories and items (INR pricing, vegetarian indicators, bestseller tags).
- [src/data/galleryData.js](src/data/galleryData.js) — Gallery lightbox photos and Instagram preview grid.
- [src/data/testimonials.js](src/data/testimonials.js) — Sample guest testimonials.

To remove a section for a client (e.g., Special Offers or Instagram), set `enabled: false` under `siteConfig.sections` in `src/config/siteConfig.js`.

## Connecting a Backend (FastAPI) for Enquiries

By default, `siteConfig.enquiry.apiEndpoint` is `''` (empty). In this state, the enquiry form runs in **Demo Mode** and informs visitors that their message has not been sent to a server while offering one-click WhatsApp and Email handoffs.

To connect a live FastAPI backend:

1. Set `siteConfig.enquiry.apiEndpoint` to your endpoint URL (e.g. `https://api.yourcafe.com/api/enquiries`).
2. Accept a `POST` JSON payload with:
   ```json
   {
     "full_name": "Ananya Sharma",
     "phone": "+91 98765 43210",
     "email": "ananya@example.com",
     "enquiry_type": "Table Reservation",
     "preferred_date": "2026-11-20",
     "guests": 4,
     "message": "Window seating if available."
   }
   ```
3. Return HTTP `200`/`201` on success, or an HTTP `4xx`/`5xx` JSON response with `{ "detail": "..." }` on error.

## Deployment

### Vercel
1. Push this project to GitHub/GitLab/Bitbucket.
2. Import the repository in Vercel.
3. Framework Preset: **Vite** (`npm run build`, output directory: `dist`).

### Hostinger / Shared Static Hosting
1. Run `npm run build`.
2. Upload the contents of the generated `dist/` folder into your domain's `public_html/` directory via File Manager or FTP.
