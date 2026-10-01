# Site cabinet psihologie — Stan Dan

Un site static (React + Vite) plus un studio de conținut (Sanity). Nu există
server de aplicație și nici bază de date de întreținut: site-ul se publică ca
fișiere statice, iar tot ce se editează se editează din Sanity Studio.

```
frontend/   site-ul public (React + Vite)
sanity/     studioul de conținut (Sanity) — panoul de administrare
```

## Dezvoltare

```bash
cd frontend && npm install && npm run dev      # http://localhost:5173
cd sanity   && npm install && npm run dev      # http://localhost:3333
```

Site-ul citește din Sanity doar dacă `VITE_SANITY_PROJECT_ID` este setat în
`frontend/.env`. Fără el, rulează pe conținutul din `frontend/src/data/` — util
în dezvoltare și ca plasă de siguranță dacă Sanity e indisponibil.

## Unde stă conținutul

| Ce | Unde se editează | Fallback în cod |
|---|---|---|
| Nume, contact, program, mențiunea de urgență, textul butonului de programare, descrierea implicită pentru Google | Sanity → *Date cabinet* | `frontend/src/data/site.js` |
| Meniul de sus și cel din subsol (etichete și ordine) | Sanity → *Meniu* | `frontend/src/data/navigation.js` |
| Textul fiecărei pagini: titluri, paragrafe, butoane, etichetele formularului, mesajul de WhatsApp, titlul din tab și descrierea pentru Google | Sanity → *Textul paginilor* | `frontend/src/data/pages.js` |
| Servicii, tarife, categorii | Sanity → *Servicii și tarife*, *Categorii* | `frontend/src/data/services.js` |
| Adresele cabinetelor și hărțile | Sanity → *Cabinete* | `frontend/src/data/site.js` |
| Articole de blog | Sanity → *Articole de blog* | — |
| Parcurs profesional | Sanity → *Parcurs profesional* | `frontend/src/data/about.js` |
| Rețele sociale | Sanity → *Rețele sociale* | `frontend/src/data/site.js` |

Regula de merge: **un câmp gol în Sanity păstrează valoarea din cod**, la orice
nivel de adâncime ([ContentProvider.jsx](frontend/src/content/ContentProvider.jsx)).
Un studio pe jumătate completat nu poate lăsa pagini goale.

În textele editabile se pot folosi substituenții `{nume}`, `{titlu}` și
`{titluMic}`, completați din *Date cabinet*; în mesajul de WhatsApp există în
plus `{client}` — numele scris de vizitator.

Rămân în cod, intenționat: rutele (`/despre`, `/tarife`…), iconițele SVG,
fotografiile, culorile și textele pentru cititoarele de ecran (`aria-label`).
Rutele sunt totuși selectabile per link de meniu, dintr-o listă fixă.

## Publicare

```bash
cd frontend && npm run build     # dist/ — se urcă pe orice hosting static
cd sanity   && npm run deploy    # studioul, la https://<studioHost>.sanity.studio
cd sanity   && npm run import    # completează în studio câmpurile noi din cod
```

Modificările de conținut apar pe site în aproximativ un minut, fără redeploy al
site-ului (răspunsurile Sanity vin din CDN).

Vezi [sanity/README.md](sanity/README.md) pentru configurarea proiectului Sanity
și [sanity/GHID-ADMIN.md](sanity/GHID-ADMIN.md) pentru ghidul de utilizare zilnică.

## Pagini

`/` (Acasă), `/despre`, `/servicii`, `/tarife`, `/programari`, `/blog`,
`/blog/:slug`. Programările se fac prin WhatsApp — mesajul se compune din
formularul de pe `/programari`.
