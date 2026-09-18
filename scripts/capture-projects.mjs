import { chromium } from '@playwright/test';
import { readFile, mkdir, access } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { load } from 'cheerio';
import sharp from 'sharp';

const candidates = [process.env.BROWSER_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].filter(Boolean);
let executablePath;
for (const candidate of candidates) { try { await access(candidate); executablePath=candidate; break; } catch {} }
const browser = await chromium.launch({executablePath,headless:true});
const page = await browser.newPage({viewport:{width:1440,height:960},deviceScaleFactor:1,reducedMotion:'reduce'});
await mkdir('assets/projects',{recursive:true});
await mkdir('artifacts',{recursive:true});
async function capture(name, target=page) {
  const png = await target.screenshot({animations:'disabled'});
  await sharp(png).resize({width:1440,withoutEnlargement:true}).webp({quality:86}).toFile(`assets/projects/${name}.webp`);
  console.log(`Saved ${name}`);
}
try {
  for (const [name,url] of (process.argv.includes('--lumina-only') ? [] : [['elbarbero','https://elbarbero-two.vercel.app/'],['imobly','https://imobly-sistema.lovable.app/']])) {
    await page.goto(url,{waitUntil:'networkidle',timeout:45000});
    await page.evaluate(()=>document.fonts.ready);
    await capture(name);
  }
  if (!process.argv.includes('--lumina-only')) {
  await page.goto('https://multienvio.vercel.app/',{waitUntil:'networkidle',timeout:45000});
  const section = page.locator('section').filter({has:page.getByRole('heading',{name:'Veja como funciona',exact:true})});
  if (await section.count() === 1) await capture('multienvio',section);
  else {
    console.log('MultiEnvio sections:', await page.locator('body').innerText());
    throw new Error('Locate the product demonstration before capturing MultiEnvio.');
  }
  }
  const original = await readFile('Lumina - Sistema de Gestão Médica Premium.html','utf8');
  const $ = load(original);
  $('script, link[rel="preconnect"], meta[property], meta[name="twitter:site"]').remove();
  for (const element of $('link[rel="stylesheet"]').toArray()) {
    const href = $(element).attr('href');
    if (href?.startsWith('./')) $(element).replaceWith(`<style>${await readFile(resolve(href),'utf8')}</style>`);
    else $(element).remove();
  }
  for (const element of $('img').toArray()) {
    const src=$(element).attr('src');
    if(src?.startsWith('./')) {
      try { const data=await readFile(resolve(src)); $(element).attr('src',`data:image/${extname(src).slice(1)};base64,${data.toString('base64')}`); } catch { $(element).remove(); }
    }
  }
  $('*').each((_,element)=>{ for(const attr of Object.keys(element.attribs||{})) if(attr.startsWith('on')) $(element).removeAttr(attr); });
  $('*').contents().filter((_,element)=>element.type==='text').each((_,element)=>{ element.data=element.data.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi,'Conta de demonstração'); });
  $('head').append('<style>*{animation:none!important;transition:none!important}body{overflow:hidden!important}</style>');
  await page.route('**/*',route=>route.abort());
  await page.setContent($.html(),{waitUntil:'load'});
  await page.evaluate(()=>{ document.querySelectorAll('*').forEach(element=>{element.scrollTop=0;element.scrollLeft=0;}); window.scrollTo(0,0); });
  await capture('lumina');
} finally { await browser.close(); }
