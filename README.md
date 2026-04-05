# DocuAI — Frontend

> A document intelligence dashboard that lets you drop any PDF, DOCX, or image and instantly get an AI-powered summary, entity extraction, and sentiment analysis — all in one clean interface.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build tool | Vite |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| HTTP client | Axios |
| Routing | React Router v6 |
| Notifications | react-hot-toast |
| Fonts | Syne · Outfit · JetBrains Mono (Google Fonts) |

---

## Project Structure

```
docuai-frontend/
├── index.html
├── vite.config.js
├── .env.example
├── package.json
└── src/
    ├── index.css              # Tailwind v4 import + all design tokens (@theme)
    ├── main.jsx               # React root + providers
    ├── App.jsx                # Route definitions
    ├── api/
    │   └── analyzeApi.js      # Axios call to POST /api/document-analyze
    ├── hooks/
    │   └── useAnalyze.js      # File reading, API call, state management
    ├── utils/
    │   └── fileUtils.js       # fileToBase64, detectFileType, formatBytes
    ├── pages/
    │   └── HomePage.jsx       # Main page — upload panel + results
    └── components/
        ├── ui/
        │   └── Spinner.jsx
        ├── upload/
        │   ├── DropZone.jsx   # Drag-and-drop file picker
        │   └── ApiKeyInput.jsx
        └── results/
            ├── ResultCard.jsx     # Summary + sentiment + entities + raw JSON
            ├── EntitySection.jsx  # Grouped entity tags (people/orgs/dates/amounts)
            └── SentimentBadge.jsx
```

---

## Prerequisites

- Node.js v18+
- The **DocuAI backend** running (locally on port 5000 or deployed)

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/docuai-frontend.git
cd docuai-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

```bash
cp .env.example .env
```

In **development**, the default value works out of the box — Vite proxies `/api` to `localhost:5000`:

```env
VITE_API_URL=/api
```

In **production**, point it at your deployed backend:

```env
VITE_API_URL=https://docuai-backend-production-e7e1.up.railway.app/
```

### 4. Run the app

```bash
npm run dev
# → http://localhost:3000
```

---

## How to Use

1. Open the app in your browser
2. Paste your **API key** into the key field (the same key set as `API_KEY` in your backend `.env`)
3. Drag and drop a file — or click to browse
4. Hit **Analyze Document**
5. Results appear instantly: summary, sentiment pill, entity tags grouped by type, and raw JSON

Supported formats: **PDF · DOCX · PNG · JPG · TIFF · BMP · WebP**

> Image files go through OCR (Tesseract) — expect 10–30 seconds for larger images.

---

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `VITE_API_URL` | `/api` | Backend API base URL. Use `/api` in dev (Vite proxy), full URL in production. |

Only one variable needed — no auth keys, no secrets stored in the frontend.

---

## Building for Production

```bash
npm run build
```

Output goes to `dist/`. Deploy to **Vercel**, **Netlify**, or any static host.

### Netlify

```bash
# Build command
npm run build

# Publish directory
dist
```

Add a `_redirects` file inside `public/` for client-side routing:

```
/*  /index.html  200
```

### Vercel

Just connect the repo — Vercel auto-detects Vite. Set `VITE_API_URL` in the Vercel environment variables dashboard.

---

## CORS Note

When the frontend is deployed to a different domain than the backend, make sure the backend's `CLIENT_URL` env var is set to your frontend's deployed URL so the CORS policy allows requests through.

---

## Design

Dark void background (`#0A0A0F`) with electric lime (`#BFFF00`) as the primary accent and cyan (`#00FFCC`) as secondary. `Syne` display font paired with `Outfit` body text. Glassmorphism cards, CSS grid background texture, radial glow orbs, drag-and-drop scan-line animation. All design tokens are defined in `src/index.css` inside the `@theme {}` block — no `tailwind.config.js` needed (Tailwind v4).

---