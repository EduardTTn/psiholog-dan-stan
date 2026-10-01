/** Everything the site chrome and pages need, in one round trip. */
export const CONTENT_QUERY = /* groq */ `{
  "site": *[_type == "siteSettings"][0]{
    name, title, cabinet, email, phone, whatsapp, address, hours, emergencyNote,
    whatsappLinkLabel, whatsappGreeting, metaDescription
  },
  "navigation": *[_type == "navigation"][0]{
    primary[]{ label, path }
  },
  "pages": {
    "home": *[_type == "pageHome"][0]{
      heroTitle, heroLead, heroSecondaryLabel,
      aboutTitle, aboutSubtitle, aboutParagraphs,
      features[]{ icon, title, body }, aboutLinkLabel,
      servicesTitle, servicesSubtitle, servicesAllLabel, servicesPricesLabel,
      cta{ title, body }, seo{ metaTitle, metaDescription }
    },
    "about": *[_type == "pageAbout"][0]{
      heroTitle, heroLead, story[]{ label, paragraphs }, closing,
      timelineTitle, timelineSubtitle, cta{ title, body },
      seo{ metaTitle, metaDescription }
    },
    "services": *[_type == "pageServices"][0]{
      heroTitle, heroLead, heroSecondaryLabel, categoryLinkLabel,
      cta{ title, body }, seo{ metaTitle, metaDescription }
    },
    "pricing": *[_type == "pagePricing"][0]{
      heroTitle, heroLead, companyTitle, companyQuote, companyIntro,
      infoTitle, infoParagraphs, infoContact,
      allTabLabel, bookLabel, companyCtaLabel, companyQuoteService,
      seo{ metaTitle, metaDescription }
    },
    "booking": *[_type == "pageBooking"][0]{
      heroTitle, heroLead, stepsTitle, stepsSubtitle,
      steps[]{ number, title, body },
      locationsTitle, locationsSubtitle, whatsappNote,
      contactTitle, contactPhoneLabel, contactEmailLabel, contactHoursLabel,
      cabinetLabel, mapLinkLabel, directionsLinkLabel,
      optionalNote, serviceLabel, serviceUnknownOption,
      nameLabel, namePlaceholder,
      modalityLabel, modalities, intervalLabel, intervals,
      detailsLabel, detailsPlaceholder, previewTitle, sendLabel,
      message{
        greeting, nameLine, intro, serviceLabel, serviceUnknown,
        modalityLabel, intervalLabel, detailsLabel, closing
      },
      seo{ metaTitle, metaDescription }
    },
    "blog": *[_type == "pageBlog"][0]{
      heroTitle, heroLead, emptyTitle, emptyBody, readMoreLabel,
      postBackLabel, postLoadingLabel, postErrorLabel,
      postNotFoundTitle, postNotFoundBody, postCta{ title, body },
      seo{ metaTitle, metaDescription }
    }
  },
  "locations": *[_type == "location"] | order(order asc){
    "id": _id, city, street, mapQuery, note
  },
  "socials": *[_type == "socialLink"] | order(order asc){
    "id": platform, "label": platform, handle, url
  },
  "categories": *[_type == "serviceCategory"] | order(order asc){
    "id": slug.current, label, title, number, body, highlights
  },
  "companyServices": *[_type == "serviceCategory" && slug.current == "companii"][0].highlights,
  "services": *[_type == "service"]{
    title, body, price, duration, footnote,
    "group": category->slug.current
  },
  "timeline": *[_type == "timelineEntry"] | order(order asc){
    period, title, meta
  },
  "posts": *[_type == "post" && defined(slug.current) && publishedAt <= now()]
    | order(publishedAt desc){
      title, "slug": slug.current, excerpt, publishedAt, coverImage
    }
}`;

/** A single article, fetched when its page opens. */
export const POST_QUERY = /* groq */ `*[_type == "post" && slug.current == $slug][0]{
  title, "slug": slug.current, excerpt, publishedAt, coverImage, body
}`;
