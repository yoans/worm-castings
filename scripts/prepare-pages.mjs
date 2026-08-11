import { copyFile, mkdir } from 'node:fs/promises'

const dist = new URL('../dist/', import.meta.url)
const routes = ['lawn', 'learn', 'play']

await copyFile(new URL('index.html', dist), new URL('404.html', dist))

for (const route of routes) {
  const directory = new URL(`${route}/`, dist)
  await mkdir(directory, { recursive: true })
  await copyFile(new URL('index.html', dist), new URL(`${route}/index.html`, dist))
}

console.log(`Prepared GitHub Pages routes: ${routes.join(', ')}`)
