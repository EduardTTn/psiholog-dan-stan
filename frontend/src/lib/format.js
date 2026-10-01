/** Romanian long date, e.g. "22 septembrie 2026". */
export function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
