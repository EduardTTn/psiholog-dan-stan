/**
 * Meniul principal și cel din subsol. Rutele sunt fixe — ele există în cod
 * ([App.jsx](../App.jsx)) — editabile sunt eticheta și ordinea.
 */
export const navigation = {
  primary: [
    { path: "/", label: "Acasă" },
    { path: "/despre", label: "Despre mine" },
    { path: "/blog", label: "Blog" },
    { path: "/servicii", label: "Servicii" },
    { path: "/tarife", label: "Tarife" },
  ],
  footer: [
    { path: "/despre", label: "Despre mine" },
    { path: "/servicii", label: "Servicii" },
    { path: "/tarife", label: "Tarife" },
    { path: "/blog", label: "Blog" },
  ],
};

/** Rutele pe care le poate alege editorul în Sanity. */
export const ROUTES = [
  "/",
  "/despre",
  "/servicii",
  "/tarife",
  "/programari",
  "/blog",
];
