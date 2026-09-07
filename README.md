# Biznes intensiv — landing

Statik sayt: `index.html` + `styles.css` + `main.js`. Build kerak emas, hech qanday framework yo'q.

## Ishga tushirish (lokal)

```bash
cd site && python3 -m http.server 8000
# http://localhost:8000
```

## Sozlash — `config.js`

| Qiymat | Nima |
|---|---|
| `SHEET_URL` | Google Apps Script web-app `/exec` havolasi (arizalar shu yerga tushadi) |
| `TELEGRAM_URL` | Telegram kanal havolasi (barcha `[ TELEGRAM KANALGA QO'SHILISH ]` tugmalari shundan oladi) |

`SHEET_URL` bo'sh bo'lsa forma baribir ishlaydi — ariza brauzer `localStorage` ga saqlanadi va "Tabriklaymiz" ekrani ochiladi (test uchun).

## Arizalar oqimi

forma → **Google Sheets** (qator qo'shiladi) → **Telegram** (sizga xabar) → foydalanuvchiga **14-blok** ekrani (Telegram kanalga qo'shilish tugmasi).

O'rnatish bosqichlari `google-apps-script.gs` faylining boshida yozilgan.

## Ekspert fotosi

`assets/` ga rasm tashlang va `index.html` dagi `.expert__photo` ichidagi placeholder o'rniga:

```html
<img src="assets/dostonjon.jpg" alt="Dostonjon Soyibov">
```

## Hosting

Papkani to'g'ridan-to'g'ri **Netlify / Vercel / GitHub Pages** ga tashlash kifoya — server kerak emas.
