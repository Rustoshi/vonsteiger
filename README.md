# Von Steiger & Associates — Law Firm Website

A production-ready, cinematic law firm website built with Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, and Framer Motion.

## Tech Stack

- **Framework:** Next.js 14 (App Router, TypeScript)
- **Database:** MongoDB (via Mongoose)
- **Email:** ZeptoMail by Zoho (transactional email API)
- **UI:** shadcn/ui + Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Fonts:** Playfair Display + Inter (Google Fonts)
- **Form Validation:** react-hook-form + zod

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:
- `MONGODB_URI` — MongoDB connection string
- `ZEPTOMAIL_API_KEY` — ZeptoMail API key for transactional emails
- `ZEPTOMAIL_FROM_EMAIL` — Sender email address configured in ZeptoMail
- `CONTACT_NOTIFICATION_EMAIL` — Email address to receive contact form notifications

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production

```bash
npm run build
npm start
```

## Project Structure

```
/app                    — Next.js App Router pages & API routes
  /about                — About page
  /practice-areas       — Practice Areas page
  /results              — Case Results page
  /testimonials         — Testimonials page
  /contact              — Contact page with working form
  /api/contact          — POST endpoint (MongoDB + ZeptoMail)
/components
  /ui                   — shadcn/ui components
  /sections             — Page sections (Hero, Navbar, Footer, etc.)
/data                   — Static data (testimonials, case results, practice areas)
/lib                    — Utilities (db connection, mail helper, validators)
/models                 — Mongoose models
```

## Features

- Cinematic dark-mode design with gold accents
- Fully responsive (mobile-first)
- Animated sections with Framer Motion (fade-up, stagger, parallax, count-up)
- Working contact form with validation → MongoDB → ZeptoMail email
- Rate-limited API endpoint
- SEO metadata on every page (title, description, Open Graph)
- Auto-playing testimonials carousel
- Filterable case results
- Sticky navbar with transparent → solid transition
- Premium typography with Playfair Display + Inter
