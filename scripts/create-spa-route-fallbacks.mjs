import { access, copyFile, mkdir } from "node:fs/promises";

const routes = ["about", "services", "faq", "contact"];
const distUrl = new URL("../dist/", import.meta.url);
const indexUrl = new URL("index.html", distUrl);

await access(indexUrl);

await Promise.all(
  routes.map(async (route) => {
    const routeUrl = new URL(`${route}/`, distUrl);
    await mkdir(routeUrl, { recursive: true });
    await copyFile(indexUrl, new URL("index.html", routeUrl));
  }),
);

await copyFile(indexUrl, new URL("404.html", distUrl));

console.log(`Created SPA fallbacks for ${routes.length} routes.`);