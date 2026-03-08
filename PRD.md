# BriefPaper PRD

## Urun
**BriefPaper** (briefpaper.com) — Akademik makale PDF'lerini AI ile ozetleyip TTS slide video ureten platform.

## Deger Onerisi
- PDF yukle → 2-5 dk'da yapilandirilmis ozet + sesli video al
- Modern React UI, direkt MP4 indirme, zengin ciktilar

## Hedef Kitle
- Yuksek lisans/doktora ogrencileri, arastirmacilar, sektorel profesyoneller

## Ozellikler (MVP)

### PDF Yukleme & Isleme
- Drag & drop PDF yukleme (maks 50 sayfa, 20MB)
- PDF text extraction (pdf-parse)
- AI ozet uretimi (Kimi k2p5)
- BullMQ kuyruk sistemi

### AI Ozet Ciktilari
1. Yapilandirilmis Ozet (baslik, yazarlar, ozet, anahtar bulgular, metodoloji, sonuclar, limitasyonlar)
2. TTS Slide Video (5-8 slide + narration → MP4)
3. Anahtar Kavramlar (terimlerin kisa aciklamalari)
4. Tek Paragraf Ozet

### Video Uretim Pipeline
1. PDF Parse → raw text
2. Kimi AI → yapilandirilmis ozet JSON
3. Slide Generator → 5-8 HTML slide (Tailwind)
4. Puppeteer → slide PNG (1920x1080)
5. Edge TTS → narration MP3
6. FFmpeg → PNG + MP3 → MP4

### Kullanici Sistemi
- Email/sifre kayit + login (JWT)
- Google OAuth
- Dashboard + analiz gecmisi

### Kredi Sistemi
- Gunluk 1 ucretsiz kredi
- Misafir: 1 kerelik deneme
- Paketler: 5/$2.50, 10/$4.50, 20/$8.00
- Stripe odeme
- Cuzdan bakiyesi + islem gecmisi

## Tech Stack
- **Frontend:** React 19 + Vite + TailwindCSS v4
- **Backend:** Node.js + Express
- **DB:** PostgreSQL (harici: 72.61.186.46:37550)
- **ORM:** Drizzle ORM
- **Auth:** JWT + bcrypt + Google OAuth
- **PDF:** pdf-parse
- **AI:** Kimi k2p5 (openai-completions, baseUrl: https://api.kimi.com/coding/v1)
- **TTS:** edge-tts (npm, ucretsiz)
- **Video:** ffmpeg + Puppeteer
- **Kuyruk:** BullMQ + Redis
- **Odeme:** Stripe Checkout
- **Deploy:** Hikmet, systemd, ~/projects/briefpaper/

## Mimari
```
[React SPA] → [Express API] → [PostgreSQL]
 ↓
 [BullMQ Queue]
 ↓
 [Worker Process]
 ├── PDF Parse
 ├── Kimi AI Ozet
 ├── Slide HTML Generate
 ├── Puppeteer Screenshot
 ├── Edge TTS Audio
 └── FFmpeg Video Merge
 ↓
 [Static Files] → /outputs/{userId}/{analysisId}/
```

## API Endpoints
```
POST /api/auth/register
POST /api/auth/login
GET /api/auth/me
POST /api/auth/google
POST /api/upload
GET /api/analyses
GET /api/analyses/:id
GET /api/analyses/:id/video
DELETE /api/analyses/:id
GET /api/wallet
POST /api/wallet/purchase
POST /api/wallet/webhook
GET /api/wallet/transactions
GET /api/queue/status/:id
```

## DB Semasi
```sql
-- users
id, email, password_hash, name, avatar_url, provider, credits, created_at

-- analyses
id, user_id, filename, status (queued/processing/done/failed),
title, authors, abstract, key_findings, methodology, conclusions, limitations,
one_paragraph, key_concepts JSON,
video_path, slides_path,
created_at, completed_at, error_message

-- transactions
id, user_id, type (purchase/usage/daily_bonus), amount, credits,
stripe_session_id, created_at

-- daily_credits
id, user_id, date, claimed (boolean)
```

## Sayfalar
| Route | Sayfa |
|-------|-------|
| `/` | Landing (hero + demo + fiyatlandirma + CTA) |
| `/upload` | PDF yukle (drag&drop) |
| `/dashboard` | Analizlerim + kuyruk durumu |
| `/analysis/:id` | Ozet + video player + indirme |
| `/wallet` | Bakiye + satin al + gecmis |
| `/login` | Giris |
| `/register` | Kayit |
| `/about` | Hakkinda |
| `/pricing` | Fiyatlandirma |
| `/terms` | Kullanim sartlari |
| `/privacy` | Gizlilik |

## Proje Yapisi
```
briefpaper/
├── package.json, vite.config.ts, drizzle.config.ts, .env
├── src/ # React frontend
│ ├── main.tsx, App.tsx
│ ├── routes/ (Landing, Upload, Dashboard, Analysis, Wallet, Login, Register, About, Pricing, Terms)
│ ├── components/ (Navbar, Footer, FileUpload, AnalysisCard, VideoPlayer, CreditBadge, PricingCard, QueueStatus)
│ └── lib/ (api.ts, auth.ts, stripe.ts)
├── server/ # Express backend
│ ├── index.ts
│ ├── routes/ (auth, upload, analyses, wallet, queue)
│ ├── services/ (pdf-parser, ai-summarizer, slide-generator, tts-engine, video-builder, credit-manager)
│ ├── workers/ (analysis-worker)
│ ├── db/ (schema, index)
│ └── middleware/ (auth)
└── public/outputs/
```

## Dogrulama
1. PDF Upload → queue'da gorunme
2. AI Ozet → dogru JSON response
3. Video → oynatilabilir MP4
4. Kredi → daily bonus + satin alma + kullanim
5. Auth → register → login → dashboard
6. Deploy → Tailscale uzerinden erisim
7. Stripe → test mode odeme
