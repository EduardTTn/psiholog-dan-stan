/**
 * Textul paginilor. Fiecare câmp de aici se poate edita din Sanity Studio
 * („Pagini”); ce lipsește în Sanity rămâne pe valoarea din acest fișier, deci
 * site-ul arată la fel și fără studio.
 *
 * În textele marcate mai jos se pot folosi substituenții {nume}, {titlu} și
 * {titluMic} — se completează din „Date cabinet”.
 */
export const pages = {
  home: {
    heroTitle:
      "Evaluare psihologică și consiliere, cu grijă pentru fiecare poveste",
    heroLead:
      "Ședințe structurate și calde, în care înțelegem împreună ce te blochează și construim resurse care se văd în viața de zi cu zi.",
    aboutTitle: "Despre mine",
    aboutSubtitle:
      "Terapie care se simte sigură, colaborativă și practică — ca să treci de la înțelegere la schimbare reală.",
    aboutParagraphs: [
      "Sunt {nume}, {titluMic}. Ofer servicii de evaluare psihologică și consiliere psihologică, în conformitate cu competențele profesionale și reglementările aplicabile.",
      "Lucrez cu adulți care traversează perioade de stres, anxietate sau schimbare, dar și cu persoane care au nevoie de o evaluare psihologică pentru diverse proceduri instituționale sau profesionale.",
    ],
    features: [
      {
        icon: "person",
        title: "Abordare individualizată",
        body: "Ședințe 1:1, adaptate ritmului și nevoilor fiecărei persoane.",
      },
      {
        icon: "screen",
        title: "Online sau la cabinet",
        body: "Alegi modalitatea care ți se potrivește, fără diferență de tarif.",
      },
    ],
    aboutLinkLabel: "Mai multe despre mine →",
    heroSecondaryLabel: "Vezi serviciile",
    servicesAllLabel: "Toate serviciile",
    servicesPricesLabel: "Lista de tarife",
    servicesTitle: "Servicii",
    servicesSubtitle:
      "Cinci direcții de lucru, de la consiliere psihologică la evaluări solicitate de instituții și angajatori.",
    cta: {
      title: "Facem primul pas împreună?",
      body: "Scrie-mi pe WhatsApp și stabilim ziua și ora potrivite pentru tine, la cabinet sau online.",
    },
    seo: {
      metaTitle: "{nume} — {titlu}",
      metaDescription:
        "Cabinet de psihologie în Constanța și Mangalia: evaluare psihologică clinică, consiliere psihologică și evaluări pentru instituții. Ședințe la cabinet sau online.",
    },
  },

  about: {
    heroTitle: "Drumul meu în lumea vastă a psihologiei",
    heroLead: "",
    story: [
      {
        label: "Cum a început",
        paragraphs: [
          "Curiozitatea de a înțelege de ce uneori ne simțim triști, de ce anumite experiențe ne aduc bucurie, de ce plângem sau de ce, în anumite momente, simțim că nu mai putem face față situațiilor prin care trecem, m-a determinat să caut răspunsuri.",
          "Cu cât descopeream mai multe informații și găseam răspunsuri la întrebările pe care mi le puneam, cu atât apăreau altele noi. Treptat, această curiozitate s-a transformat într-o adevărată pasiune pentru psihologie.",
        ],
      },
      {
        label: "Ce mă motivează",
        paragraphs: [
          "Îmi doresc să pot face o diferență în viața oamenilor, fie ea și una mică. Atâta timp cât pot contribui la binele cuiva, voi încerca să o fac.",
        ],
      },
      {
        label: "Cum lucrez",
        paragraphs: [
          "Sunt o persoană empatică, deschisă și atentă la detalii. Nu cred în etichete și pun mare preț pe relația profesională bazată pe respect, încredere și confidențialitate.",
          "Le sunt recunoscător clienților mei, deoarece, prin experiențele și parcursul fiecăruia, mă ajută să devin nu doar un psiholog mai bun, ci și un om mai bun.",
        ],
      },
    ],
    closing:
      "Cred că fiecare dintre noi are resurse interioare care ne pot ajuta să depășim momentele dificile. Rolul meu este să îți ofer sprijin și să te însoțesc, pas cu pas, în procesul de înțelegere și depășire a provocărilor cu care te confrunți.",
    timelineTitle: "Parcursul profesional",
    timelineSubtitle: "Formarea pe care se sprijină serviciile oferite în cabinet.",
    cta: {
      title: "Ai o întrebare înainte de a începe?",
      body: "Scrie-mi și clarificăm împreună dacă serviciile mele se potrivesc cu ceea ce cauți.",
    },
    seo: {
      metaTitle: "Despre mine — {nume}",
      metaDescription:
        "Parcursul profesional și modul de lucru al psihologului {nume}: formare, abordare și valorile pe care se sprijină ședințele din cabinet.",
    },
  },

  services: {
    heroTitle: "Cum te pot ajuta",
    heroLead:
      "Ofer servicii de evaluare psihologică și consiliere psihologică, în conformitate cu competențele profesionale și reglementările aplicabile.",
    heroSecondaryLabel: "Vezi tarifele",
    categoryLinkLabel: "Vezi tarifele pentru aceste servicii →",
    cta: {
      title: "Nu ești sigur ce ți se potrivește?",
      body: "Scrie-mi pe scurt situația ta și îți spun ce tip de evaluare sau consiliere este potrivită.",
    },
    seo: {
      metaTitle: "Servicii — {nume}",
      metaDescription:
        "Evaluare psihologică clinică, consiliere psihologică, psihologia muncii și evaluări pentru domeniul securității naționale.",
    },
  },

  pricing: {
    heroTitle: "Servicii și tarife",
    heroLead:
      "Ofer servicii de evaluare psihologică și consiliere psihologică, în conformitate cu competențele profesionale și reglementările aplicabile.",
    companyTitle: "Servicii pentru companii și organizații",
    companyQuote: "Ofertă personalizată",
    companyIntro: "Serviciile pot include:",
    infoTitle: "Informații privind tarifele",
    infoParagraphs: [
      "Tarifele pot varia în funcție de complexitatea evaluării, durata acesteia, numărul instrumentelor psihologice utilizate și documentația solicitată.",
      "Pentru serviciile solicitate de instituții, angajatori sau alte organizații, tariful poate fi stabilit în funcție de specificul solicitării.",
    ],
    infoContact:
      "Pentru programări și informații suplimentare, vă rog să mă contactați.",
    allTabLabel: "Toate",
    bookLabel: "Programează →",
    companyCtaLabel: "Solicită o ofertă",
    companyQuoteService: "ofertă personalizată pentru companii și organizații",
    seo: {
      metaTitle: "Tarife — {nume}",
      metaDescription:
        "Tarifele pentru evaluare psihologică și consiliere psihologică, pe categorii de servicii. Ofertă personalizată pentru companii și organizații.",
    },
  },

  booking: {
    heroTitle: "Hai să stabilim o întâlnire",
    heroLead:
      "Completează câteva detalii și îți pregătesc mesajul de programare. Îți răspund cu disponibilitatea și pașii următori.",
    stepsTitle: "Cum funcționează",
    stepsSubtitle: "Trei pași simpli, fără formulare lungi.",
    steps: [
      {
        number: "01",
        title: "Alegi serviciul",
        body: "Selectezi tipul de evaluare sau de consiliere de care ai nevoie. Dacă nu ești sigur, alege „nu sunt sigur(ă)” și găsim împreună varianta potrivită.",
      },
      {
        number: "02",
        title: "Trimiți mesajul",
        body: "Completezi câteva detalii, iar mesajul se compune automat. Îl trimiți pe WhatsApp cu un singur clic — nu trebuie să scrii nimic de la zero.",
      },
      {
        number: "03",
        title: "Confirmăm programarea",
        body: "Îți răspund cu intervalele disponibile și stabilim ziua și ora. Primești apoi toate detaliile necesare înainte de ședință.",
      },
    ],
    locationsTitle: "Unde ne vedem",
    locationsSubtitle:
      "Două cabinete pe litoral — alege-l pe cel mai aproape de tine sau rămânem online.",
    whatsappNote:
      "Se deschide WhatsApp cu mesajul deja scris. Îl poți modifica înainte de a-l trimite.",
    contactTitle: "Date de contact",
    contactPhoneLabel: "Telefon",
    contactEmailLabel: "E-mail",
    contactHoursLabel: "Program",
    cabinetLabel: "Cabinet",
    mapLinkLabel: "Vezi pe Google Maps",
    directionsLinkLabel: "Deschide traseul",

    // Formularul
    optionalNote: "(opțional)",
    serviceLabel: "Ce serviciu te interesează?",
    serviceUnknownOption: "Nu sunt sigur(ă) — aș dori o recomandare",
    nameLabel: "Numele tău",
    namePlaceholder: "Cum să mă adresez?",
    modalityLabel: "Modalitate",
    modalities: ["La cabinet", "Online"],
    intervalLabel: "Interval preferat",
    intervals: ["Dimineața", "După-amiaza", "Seara", "Flexibil"],
    detailsLabel: "Vrei să adaugi ceva?",
    detailsPlaceholder: "Orice detaliu care te-ar ajuta să fii înțeles mai bine.",
    previewTitle: "Mesajul tău",
    sendLabel: "Trimite pe WhatsApp",

    // Mesajul trimis pe WhatsApp. {client} = numele scris de vizitator.
    message: {
      greeting: "Bună ziua!",
      nameLine: "Mă numesc {client}.",
      intro: "Aș dori o programare.",
      serviceLabel: "Serviciu",
      serviceUnknown: "nu sunt sigur(ă), aș dori o recomandare",
      modalityLabel: "Modalitate",
      intervalLabel: "Interval preferat",
      detailsLabel: "Detalii",
      closing: "Mulțumesc!",
    },

    seo: {
      metaTitle: "Programări — {nume}",
      metaDescription:
        "Programează o ședință de consiliere sau o evaluare psihologică: alegi serviciul, iar mesajul de programare se trimite pe WhatsApp.",
    },
  },

  blog: {
    heroTitle: "Articole și resurse",
    heroLead:
      "Scriu despre evaluare psihologică, stres, echilibru emoțional și despre ce se întâmplă, concret, într-un cabinet de psihologie.",
    emptyTitle: "În curând",
    emptyBody:
      "Până la publicarea primelor articole, îmi poți scrie direct dacă ai o întrebare despre serviciile oferite.",
    readMoreLabel: "Citește articolul →",

    // Pagina unui articol
    postBackLabel: "← Toate articolele",
    postLoadingLabel: "Se încarcă articolul…",
    postErrorLabel: "Articolul nu a putut fi încărcat. Încearcă din nou mai târziu.",
    postNotFoundTitle: "Articolul nu a fost găsit",
    postNotFoundBody:
      "Este posibil să fi fost mutat sau să nu fie încă publicat.",
    postCta: {
      title: "Ai o întrebare despre acest subiect?",
      body: "Putem vorbi despre situația ta concretă, într-o ședință la cabinet sau online.",
    },

    seo: {
      metaTitle: "Blog — {nume}",
      metaDescription:
        "Articole despre evaluare psihologică, stres, echilibru emoțional și despre ce se întâmplă, concret, într-un cabinet de psihologie.",
    },
  },
};
