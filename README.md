# 🌷 FleurFinds — The Fleur Cup (landing + product page)

A fast, dependency-free static site for **The Fleur Cup** — WhatsApp-first ordering, no checkout, no backend, no build step.

```
fleurfinds-site/
├── index.html              # landing page (hero, benefits, how-to, size guide, FAQ)
├── product.html            # the cup page (gallery, size picker, qty → WhatsApp)
├── vercel.json             # clean URLs etc.
├── .gitignore
└── assets/
    ├── css/style.css       # the whole "sticker-book kawaii" design system
    ├── js/main.js          # ⚙️ WhatsApp number lives here — see below
    └── img/                # product photo + kawaii illustrations
```

## ⚙️ The one setting that matters

Open **`assets/js/main.js`** — line 6:

```js
var WA_NUMBER = '919895585627';   // country code + number, digits only
```

Every "order on whatsapp 💬" button on the site builds its `wa.me` link from this. Product-page orders auto-include **size + quantity + total price** in the message.

Prices/copy live directly in `index.html` and `product.html` — search for `₹299.99` to find them all.

## 🚀 Deploy to Vercel (via GitHub)

1. Push this folder to GitHub:
   ```bash
   git init
   git add .
   git commit -m "🌷 fleurfinds: cup landing + product page"
   git branch -M main
   # create the repo at github.com/new (or: gh repo create fleurfinds --public)
   git remote add origin https://github.com/YOUR-USERNAME/fleurfinds.git
   git push -u origin main
   ```
2. Go to **vercel.com → Add New… → Project → Import** your repo
3. Framework preset: **Other** (it's plain HTML) → **Deploy**. Done — you'll get a `*.vercel.app` URL instantly.

Every `git push` to `main` auto-redeploys. Pull requests get free preview URLs.

**CLI alternative:** `npm i -g vercel && vercel` from this folder.

## 📝 Notes

- **Newsletter form** is a front-end placeholder (shows a success toast). To actually collect emails, point the `<form id="newsForm">` action at Buttondown / Formspree / ConvertKit — or replace it with a WhatsApp "notify me" button.
- **OG images** (`og:image`) use relative paths — after adding your custom domain, swap in the absolute URL so WhatsApp/Instagram link previews render perfectly.
- Add real reviews/testimonials only once you have them — the design intentionally ships without a reviews section. When you have real ones (screenshots from WhatsApp with permission work great), drop them between the FAQ and the WhatsApp banner.
