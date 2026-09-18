import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { load } from 'cheerio';
import { chromium } from '@playwright/test';
import { locales, pageFiles, copy } from '../src/content.mjs';

const paths = locales.flatMap(lang=>Object.entries(pageFiles).map(([page,file])=>({lang,page,file:resolve('dist',lang==='pt'?'':lang,file)})));
let browser;
before(async()=>{
  let executablePath;
  for(const path of [process.env.BROWSER_PATH,'C:/Program Files/Google/Chrome/Application/chrome.exe','C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].filter(Boolean)) {
    try { await access(path); executablePath=path; break; } catch {}
  }
  browser=await chromium.launch({executablePath,headless:true});
  await mkdir('artifacts',{recursive:true});
});
after(async()=>{ await browser?.close(); });

test('All 15 pages contain localized content and valid local links and assets',async()=>{
  for(const {lang,page,file} of paths) {
    const $=load(await readFile(file,'utf8'));
    assert.equal($('html').attr('lang'),copy[lang].locale);
    assert.equal($('h1').length,1,file);
    assert.ok($('main').text().length>200,file);
    assert.equal($('meta[name="description"]').length,1);
    assert.equal($('link[rel="alternate"]').length,3);
    for(const element of $('a[href],img[src],script[src],link[href]').toArray()) {
      const href=$(element).attr('href')||$(element).attr('src');
      if(!href||/^(https?:|tel:|mailto:|data:)/.test(href)) continue;
      const [pathname,hash]=href.split('#');
      const target=pathname?resolve(dirname(file),pathname):file;
      await access(target);
      if(hash) { const other=load(await readFile(target,'utf8')); assert.ok(other(`[id="${hash}"]`).length,`${file}: ${href}`); }
    }
    assert.equal($('img:not([alt])').length,0,file);
  }
});

test('Every page renders without overflow or broken images on desktop and mobile',async()=>{
  const context=await browser.newContext({reducedMotion:'reduce'});
  const page=await context.newPage();
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  for(const width of [1440,390,320]) {
    await page.setViewportSize({width,height:width===1440?900:844});
    for(const entry of paths) {
      await page.goto(pathToFileURL(entry.file).href,{waitUntil:'load'});
      await page.evaluate(()=>document.fonts.ready);
      await page.locator('footer').scrollIntoViewIfNeeded();
      await page.evaluate(async()=>{ await Promise.all([...document.images].filter(i=>i.getAttribute('src')).map(i=>{ i.loading='eager'; return Promise.race([i.decode().catch(()=>{}),new Promise(resolve=>setTimeout(resolve,5000))]); })); });
      const result=await page.evaluate(()=>({
        overflow:document.documentElement.scrollWidth>innerWidth+1,
        images:[...document.images].filter(i=>i.getAttribute('src')&&(!i.complete||i.naturalWidth===0)).map(i=>i.src),
        clipped:[...document.querySelectorAll('button,.button,h1,h2,h3')].filter(e=>e.clientWidth && e.scrollWidth>e.clientWidth+2).map(e=>e.textContent.trim())
      }));
      assert.equal(result.overflow,false,`${entry.lang}/${entry.page} at ${width}px: horizontal overflow`);
      assert.deepEqual(result.images,[],`${entry.lang}/${entry.page}: broken images`);
      assert.deepEqual(result.clipped,[],`${entry.lang}/${entry.page} at ${width}px: clipped text`);
      if(entry.lang==='pt'&&width!==320) {
        await page.evaluate(()=>scrollTo(0,0));
        await page.screenshot({path:`artifacts/${entry.page}-${width}.png`,fullPage:true,animations:'disabled'});
      }
    }
  }
  assert.deepEqual(errors,[]);
  await context.close();
});

test('Project filters and image preview work with keyboard dismissal',async()=>{
  const page=await browser.newPage({viewport:{width:1440,height:900}});
  await page.goto(pathToFileURL(resolve('dist/projetos.html')).href);
  await page.locator('[data-filter="crm"]').click();
  assert.equal(await page.locator('.project-detail:visible').count(),2);
  assert.equal(await page.locator('[data-count]').textContent(),'2');
  await page.locator('[data-filter="websites"]').click();
  assert.equal(await page.locator('.project-detail:visible').count(),1);
  await page.locator('.project-detail:visible [data-lightbox]').click();
  assert.equal(await page.locator('#lightbox').isVisible(),true);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#lightbox').isVisible(),false);
  await page.locator('[data-filter="all"]').click();
  assert.equal(await page.locator('.project-detail:visible').count(),4);
  await page.close();
});

test('Home shows the next section on short mobile and desktop screens',async()=>{
  const page=await browser.newPage({reducedMotion:'reduce'});
  for(const viewport of [{width:390,height:667},{width:320,height:740},{width:1440,height:720}]) {
    await page.setViewportSize(viewport);
    await page.goto(pathToFileURL(resolve('dist/index.html')).href);
    await page.evaluate(()=>document.fonts.ready);
    const nextTop=await page.locator('.services-overview').evaluate(element=>element.getBoundingClientRect().top);
    assert.ok(nextTop<viewport.height-25,`Next section is not visible at ${viewport.width}x${viewport.height}: ${nextTop}`);
    await page.screenshot({path:`artifacts/home-viewport-${viewport.width}x${viewport.height}.png`});
  }
  await page.close();
});

test('Language navigation, mobile menu, privacy dialog and contact topic work',async()=>{
  const page=await browser.newPage({viewport:{width:390,height:844}});
  await page.goto(pathToFileURL(resolve('dist/index.html')).href);
  await page.locator('header [data-language="en"]').click();
  assert.match(page.url(),/\/en\/index.html$/);
  assert.equal(await page.locator('html').getAttribute('lang'),'en');
  await page.locator('.menu-toggle').click();
  assert.equal(await page.locator('#mobile-nav').isVisible(),true);
  await page.locator('#mobile-nav').getByText('Contact',{exact:true}).click();
  assert.match(page.url(),/\/en\/contato.html$/);
  await page.locator('#contact-topic').selectOption({index:3});
  const link=await page.locator('[data-contact-wa]').getAttribute('href');
  assert.equal(new URL(link).hostname,'wa.me');
  assert.equal(new URL(link).pathname,'/5511992876042');
  assert.match(new URL(link).searchParams.get('text'),/Implementing a CRM/);
  assert.equal(await page.locator('a[href="tel:+5511992876042"]').count(),2);
  await page.locator('[data-dialog="privacy"]').click();
  assert.equal(await page.locator('#privacy').isVisible(),true);
  await page.locator('#privacy [data-close]').click();
  assert.equal(await page.locator('#privacy').isVisible(),false);
  await page.locator('summary').first().click();
  assert.equal(await page.locator('details').first().getAttribute('open'),'');
  await page.close();
});
