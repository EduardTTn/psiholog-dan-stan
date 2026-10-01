# Studio de conținut — Cabinet Stan Dan

Aici se editează **tot** conținutul site-ului: datele cabinetului, textul
fiecărei pagini, serviciile și tarifele, adresele cabinetelor, articolele de
blog, parcursul profesional și rețelele sociale. Nu există alt panou de
administrare și nici un server de întreținut.

Pentru utilizare zilnică, vezi [GHID-ADMIN.md](GHID-ADMIN.md) — scris pentru
administratorul site-ului, nu pentru dezvoltator.

## Prima configurare (o singură dată)

1. Creează un proiect pe [sanity.io/manage](https://www.sanity.io/manage) și
   copiază **Project ID**.
2. `cp .env.example .env` și completează `SANITY_STUDIO_PROJECT_ID`.
3. `npm install`
4. `npx sanity login`
5. Pentru import, creează un token cu rol **Editor** la
   *Manage > API > Tokens* și pune-l în `.env` ca `SANITY_WRITE_TOKEN`.
6. `npm run import` — urcă în Sanity conținutul existent din `frontend/src/data/`:
   datele cabinetului, textul celor 6 pagini, 21 de servicii, 5 categorii,
   cele 2 cabinete, parcursul profesional și rețelele sociale.
   Scriptul e aditiv și se poate rula oricând: completează doar câmpurile care
   lipsesc, deci nu pierzi ce a fost editat în studio. Îl re-rulezi după ce
   adaugi câmpuri noi în `frontend/src/data/`.
   Cu `npm run import -- --force` rescrie tot din cod — **pierde editările**.
7. `npm run deploy` — publică studioul la `https://<studioHost>.sanity.studio`
   (`studioHost` se setează în `sanity.cli.js`).

## Conectarea site-ului

În `frontend/.env` (sau în variabilele de mediu ale hostingului):

```
VITE_SANITY_PROJECT_ID=<project id>
VITE_SANITY_DATASET=production
```

Fără aceste variabile, site-ul folosește conținutul din `frontend/src/data/`
și nu apelează deloc Sanity. Nimic nu se strică dacă lipsesc.

Același principiu se aplică la nivel de câmp: orice câmp gol sau lipsă în
Sanity păstrează valoarea din `frontend/src/data/`, la orice adâncime. Un
dataset pe jumătate completat nu poate lăsa pagini goale.

**Important:** în *Manage > API > CORS origins* adaugă adresa site-ului
publicat și `http://localhost:5173`. Fără asta, cererile din browser sunt
blocate și site-ul rămâne pe conținutul local.

## Utilizare zilnică

| Comandă | Ce face |
|---|---|
| `npm run dev` | Studio local, pe http://localhost:3333 |
| `npm run deploy` | Publică studioul online |
| `npm run import` | Completează câmpurile lipsă din `frontend/src/data/` (nu suprascrie) |
| `npm run import -- --force` | Rescrie tot conținutul din cod — pierde editările |

Modificările publicate apar pe site în aproximativ un minut (răspunsurile
sunt servite din CDN). Nu e nevoie de redeploy al site-ului.

## Structura conținutului

| Tip | Titlu în studio | Note |
|---|---|---|
| `siteSettings` | Date cabinet | Singleton. Nume, contact, program, textul butonului de programare, mesajul implicit de WhatsApp, descrierea implicită pentru Google, mențiunea de urgență. |
| `navigation` | Meniu | Singleton. Etichetele și ordinea linkurilor; ruta se alege din lista fixă din `schemas/navLink.js`. |
| `pageHome` … `pageBlog` | Textul paginilor | Câte un singleton pe pagină — tot textul vizibil, inclusiv butoane, etichetele formularului de programare, mesajul de WhatsApp (`whatsappMessage`) și câmpurile SEO (`seo`). Textele acceptă `{nume}`, `{titlu}`, `{titluMic}`. |
| `service` / `serviceCategory` | Servicii și tarife / Categorii | Serviciul trimite la categorie prin referință. |
| `location` | Cabinete | Orașul și strada; harta se construiește din ele. |
| `post` | Articole de blog | Publicat doar cu `slug` și `publishedAt` în trecut. |
| `timelineEntry` | Parcurs profesional | |
| `socialLink` | Rețele sociale | Iconița vine din câmpul `platform`; una nouă se adaugă în cod. |

Singletonurile sunt declarate într-un singur loc — `SINGLETONS` din
`schemas/index.js` — de unde `sanity.config.js` construiește meniul, ascunde
tipul din „create new” și scoate acțiunile de ștergere/duplicare. `group: "page"`
le pune în folderul „Textul paginilor”. Un tip nou de pagină se adaugă acolo,
plus în `CONTENT_QUERY` și în `data/pages.js`.

Un câmp nou trebuie să existe în trei locuri: schema Sanity, `CONTENT_QUERY` și
valoarea implicită din `frontend/src/data/`. Dacă lipsește din query, editorul
îl completează degeaba — site-ul nu îl citește.

Rămân în cod: rutele, iconițele SVG, fotografiile, culorile și textele pentru
cititoarele de ecran.
