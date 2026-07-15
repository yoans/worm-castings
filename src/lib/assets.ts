/** Prefix public assets for GitHub Pages (`/worm-castings/`) and local (`/`). */
export function asset(path: string) {
  const cleaned = path.replace(/^\//, '')
  return `${import.meta.env.BASE_URL}${cleaned}`
}
