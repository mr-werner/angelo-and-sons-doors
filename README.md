# Angelo & Sons Doors and More — Blueprint WebStudio Concept

Independent, non-official redesign concept for https://angeloandsonsdenver.com (Aurora, CO).
Preview: https://asd.blueprintwebstudio.com (noindex; the demo code lives in the Neon `demos` table).

This is a custom build for Angelo & Sons, not the shared concept layout. Content and layout are in `src/App.jsx`, styles in `src/styles.css`, and the Blueprint WebStudio concept widget in `src/concept.jsx`.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

Vercel project `angelo-and-sons-doors` (framework: Vite). Connect the repo under Vercel → Settings → Git so pushes to `main` deploy automatically.
Domain `asd.blueprintwebstudio.com` is a CNAME at Porkbun pointing to the target Vercel shows for this project.

Environment variables (all optional):

| Variable | Purpose |
|---|---|
| `VITE_CONCEPT_END_DATE` | Countdown end date in the concept widget (set to 2026-11-23) |
| `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID` | Live Google rating and review excerpts (`api/google-reviews.js`; not used on the page yet) |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Estimate-form emails (`api/contact.js`). Without them the form shows a demo message |

The "I'm Interested" form posts to `api/demo-interest.js`, which proxies to the main studio site.

## What changed from the current site

- Fixes broken navigation: on the current site "Residential Doors", "Commercial Doors" and "Company" go to `#`, and the homepage Contact Us button points to `/contact-us/%20`. Every link here goes somewhere.
- Removes the duplicated "Our Services" heading and the exposed reCAPTCHA text.
- One consistent business name ("Angelo & Sons Doors and More", short form "Angelo & Sons") instead of several spellings.
- Says where the shop actually is (Aurora) and that it serves the Denver metro, with the 18 cities from their service-areas page.
- Removes the conflicting founding years (meta says "since 1976", About says "Since 2009"). No year is stated.
- Emergency service line is in a bar at the top of every screen, in the hero, and next to the form.
- The four service families (showers, residential doors, commercial doors, windows and glass walls) become a "door schedule" with drawn elevations, so the 14 sub-services fit on one screen.
- An estimate request form (home or business, service, timing) replaces the bare Contact button.
- All six client testimonials from their homepage, verbatim, with names and source. No ratings or counts are invented; Google is a link only.
- Keeps every badge: BBB A+ (stated on their site), the BBB Customer Reviews badge, and the Chamber of Commerce badge, all linking to the original listings.
- Custom design from the trade: an animated half-open door set in a casing and transom as the hero, steel-and-brass hardware palette with a glass tint, keyhole and door-panel marks, the project gallery framed as a glass partition wall, and Fraunces + Instrument Sans type.
- Their own line, "If you can see or walk through it, Angelo's will replace or renew it!", leads the hero.

## Before client presentation

- Founding year: the site says both "since 1976" (meta) and "Since 2009" (About). The About page says Angelo started his first door business in 1976 and founded Angelo & Sons in 2009. Ask which to show; none is shown now.
- Confirm the family story wording and that it's OK to name Angelo Mentz, Linda and Angela on the page.
- "Owners on the job" and "often does the install themselves" come from Abel Garcia's testimonial. Confirm the family wants to promise that.
- The three estimate steps (request, measure and quote, family installs) and the three values are written from their About text; confirm they match how they work. Confirm whether estimates are free (not stated, so not claimed).
- Logo colors could not be sampled from this sandbox. The steel and brass palette is a stand-in; check it against the logo and adjust `:root` in `src/styles.css`.
- The logo and all photos are hotlinked from angeloandsonsdenver.com (logo, homepage door and truck photos, About family photo, gallery photos). Get permission and copy them into the repo before launch; confirm the family photo can be used.
- Confirm the emergency service line (720) 298-7585 and whether it is truly after-hours or 24/7 (not claimed). No business hours are listed on their site; ask for them.
- Confirm sales@angeloandsonsdenver.com is the right inbox for estimate requests.
- Confirm the BBB A+ rating and Chamber of Commerce membership are current. The BBB and Chamber badges are hotlinked images.
- Testimonials have no source label on their site; they are labelled "client testimonials as published on angeloandsonsdenver.com".
- Keep the independent-concept disclaimer visible; do not imply this is the company's official site.
- The countdown is display-only, not access control. The subdomain is public to anyone with the URL.
