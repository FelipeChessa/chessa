import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const root = resolve('dist');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.jpeg':'image/jpeg','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8'};
const startPort = Number(process.env.PORT || 4173);
const server = createServer(async (req,res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    let target = resolve(root,`.${pathname}`);
    if (target !== root && !target.startsWith(root+sep)) { res.writeHead(403).end(); return; }
    if ((await stat(target)).isDirectory()) target = resolve(target,'index.html');
    const body = await readFile(target);
    res.writeHead(200,{'Content-Type':types[extname(target)]||'application/octet-stream','Cache-Control':'no-store'});
    res.end(body);
  } catch { res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'}).end('404 — Page not found'); }
});
let port = startPort;
server.on('error',error => { if(error.code==='EADDRINUSE' && port<startPort+10) server.listen(++port,'127.0.0.1'); else throw error; });
server.listen(port,'127.0.0.1',()=>console.log(`Chessa preview: http://127.0.0.1:${server.address().port}`));
