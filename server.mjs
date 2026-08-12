import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const config = JSON.parse(await readFile(new URL("./demo.config.json", import.meta.url), "utf8"));
const port = Number(process.env.PORT || config.port || 3100);
const root = new URL(".", import.meta.url).pathname.replace(/^\/(.:)/, "$1");
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
};

createServer(async (request, response) => {
  try {
    const requestPath = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
    const relative = requestPath === "/" ? "index.html" : requestPath.replace(/^\/+/, "");
    const filePath = normalize(join(root, relative));
    if (!filePath.startsWith(normalize(root))) throw new Error("Invalid path");
    const info = await stat(filePath);
    const resolved = info.isDirectory() ? join(filePath, "index.html") : filePath;
    const body = await readFile(resolved);
    response.writeHead(200, {
      "Content-Type": mime[extname(resolved).toLowerCase()] || "application/octet-stream",
      "Cache-Control": extname(resolved) === ".html" ? "no-store" : "public, max-age=300",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "SAMEORIGIN",
    });
    response.end(body);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Halaman tidak ditemukan");
  }
}).listen(port, "0.0.0.0", () => {
  console.log(`${config.name} aktif di http://0.0.0.0:${port}`);
});
