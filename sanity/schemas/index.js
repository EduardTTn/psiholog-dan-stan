import ctaBand from "./ctaBand.js";
import feature from "./feature.js";
import location from "./location.js";
import navLink from "./navLink.js";
import navigation from "./navigation.js";
import pageAbout from "./pageAbout.js";
import pageBlog from "./pageBlog.js";
import pageBooking from "./pageBooking.js";
import pageHome from "./pageHome.js";
import pagePricing from "./pagePricing.js";
import pageServices from "./pageServices.js";
import post from "./post.js";
import seo from "./seo.js";
import service from "./service.js";
import serviceCategory from "./serviceCategory.js";
import siteSettings from "./siteSettings.js";
import socialLink from "./socialLink.js";
import step from "./step.js";
import storyBlock from "./storyBlock.js";
import timelineEntry from "./timelineEntry.js";
import whatsappMessage from "./whatsappMessage.js";

/**
 * Documents the editor opens directly — one of each, never a list.
 * `group: "page"` puts it in the „Textul paginilor” folder; the rest sit at
 * the top level of the menu.
 */
export const SINGLETONS = [
  { id: "siteSettings", type: "siteSettings", title: "Date cabinet" },
  { id: "navigation", type: "navigation", title: "Meniu" },
  { id: "pageHome", type: "pageHome", title: "Acasă", group: "page" },
  { id: "pageAbout", type: "pageAbout", title: "Despre mine", group: "page" },
  { id: "pageServices", type: "pageServices", title: "Servicii", group: "page" },
  { id: "pagePricing", type: "pagePricing", title: "Tarife", group: "page" },
  { id: "pageBooking", type: "pageBooking", title: "Programări", group: "page" },
  { id: "pageBlog", type: "pageBlog", title: "Blog", group: "page" },
];

export const schemaTypes = [
  siteSettings,
  navigation,
  pageHome,
  pageAbout,
  pageServices,
  pagePricing,
  pageBooking,
  pageBlog,
  serviceCategory,
  service,
  post,
  timelineEntry,
  socialLink,
  location,
  // Reusable field groups, used inside the documents above.
  ctaBand,
  feature,
  storyBlock,
  step,
  navLink,
  seo,
  whatsappMessage,
];
