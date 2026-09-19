import http from 'node:http';
import { stat, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('./dist/', import.meta.url));
const host = process.env.HOST || '0.0.0.0';
const port = Number(process.env.PORT || 3000);
if (!Number.isInteger(port) || port < 0 || port > 65535) throw new Error('PORT inválida.');
try { await stat(path.join(root, 'index.html')); }
catch { throw new Error('Build não encontrado. Execute npm run build antes de npm start.'); }
const mime = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.ico':'image/x-icon','.woff2':'font/woff2'};
export const server = http.createServer(async (req, res) => {
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405, {Allow:'GET, HEAD'}).end(); return; }
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400).end('Bad request'); return; }
  const resolvedRoot = path.resolve(root);
  let file = path.resolve(root, '.' + pathname);
  if (file !== resolvedRoot && !file.startsWith(resolvedRoot + path.sep)) { res.writeHead(403).end(); return; }
  try {
    const info = await stat(file);
    if (info.isDirectory()) {
      if (!pathname.endsWith('/')) { res.writeHead(308, {Location:pathname + '/' + new URL(req.url, 'http://localhost').search}).end(); return; }
      file = path.join(file, 'index.html');
    }
    const data = await readFile(file);
    const ext = path.extname(file).toLowerCase();
    res.writeHead(200, {'Content-Type':mime[ext] || 'application/octet-stream','Content-Length':data.length,'X-Content-Type-Options':'nosniff','Cache-Control':['.html','.css','.js'].includes(ext)?'no-cache':'public, max-age=86400'});
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch {
    res.writeHead(404, {'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-cache'});
    res.end(req.method === 'HEAD' ? undefined : '<!doctype html><html lang="pt-BR"><meta charset="UTF-8"><title>Página não encontrada</title><h1>Página não encontrada</h1><p><a href="/">Voltar para a Advance</a></p></html>');
  }
});
server.listen(port, host, () => { console.log(`Advance disponível em http://${host}:${server.address().port}`); });
for (const signal of ['SIGINT','SIGTERM']) process.on(signal, () => server.close(() => process.exit(0)));
