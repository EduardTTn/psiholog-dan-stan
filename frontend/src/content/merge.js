function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

/**
 * Drop null/empty values so a half-filled dataset can't blank out the site:
 * a field left empty in Sanity keeps the local fallback, at any depth. That
 * matters most for the page copy — the editor fills it in gradually, and the
 * site has to read correctly the whole time.
 *
 * Lives in its own module (no JSX) so `npm run check` in sanity/ can test it.
 */
export function merge(local, remote) {
  if (remote === null || remote === undefined || remote === "") return local;
  if (Array.isArray(remote)) return remote.length ? remote : local;
  if (isPlainObject(remote) && isPlainObject(local)) {
    const out = { ...local };
    for (const [key, value] of Object.entries(remote)) {
      out[key] = merge(local[key], value);
    }
    return out;
  }
  return remote;
}
