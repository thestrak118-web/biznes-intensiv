# 3 Kunlik Biznes Intensiv — landing

Figma dizayni (`Aos IT 2` → freym **"Biznes intensiv"**, 406 × 7087) asosida qurilgan statik sayt.
Build kerak emas: HTML + CSS + vanilla JS.

## Fayllar

| Fayl | Nima |
|---|---|
| `index.html` | Figma dizayni bo'yicha to'liq landing |
| `app.css` | Dizayn tizimi — Figma'dan olingan ranglar, o'lchamlar, tipografika |
| `app.js` | Akkordeon, CTA havolalari, scroll animatsiya |
| `config.js` | **Telegram kanal havolasi shu yerda** |
| `v1/` | TZ matni bo'yicha qurilgan birinchi variant (forma + FAQ + Sheets) |
| `google-apps-script.gs` | `v1` formasi uchun backend (Sheets → Telegram) |

## Ishga tushirish

```bash
cd site && python3 -m http.server 8777
# http://localhost:8777
```

## Sozlash

`config.js` da `TELEGRAM_URL` ni to'ldiring — sahifadagi barcha CTA tugmalari (`data-tg`) shu havolaga ketadi.

## Ekspert fotosi

`assets/` ga rasm qo'ying va `index.html` dagi `.expert__ph` ichini almashtiring:

```html
<img src="assets/dostonjon.jpg" alt="Dostonjon Soyibov">
```

## Aniqlik

Sayt Figma REST API orqali olingan JSON (`Adras Reference Library`, node `20:3`) bilan
element-ma-element solishtirilgan: har bir blokning Y koordinatasi va balandligi
Figma qiymatidan **8px dan kam** farq qiladi, umumiy balandlik 7079px (Figma 7087px).

## Figma'dan olingan qiymatlar

- Fon `#080808`, karta `#18181B`, chegara `#27272A`
- Oltin tugma: gradient `#FED48C → #FFDB9E`, radius 12, soya `0 4px #D88800`, matn `#733A00`
- Body: Inter 14/22; sarlavhalar 20/28 uppercase bold
- Freym 406px, yon padding 20px (kontent 366px)
- `01` / `02` raqamlari: 64px, `#22C55E` / ko'k, 10% shaffoflik

Dizayn mobil (406px) uchun chizilgan — sayt shu kolonkani markazda saqlaydi va ≥720px ekranlarda 520px gacha kengayadi.
