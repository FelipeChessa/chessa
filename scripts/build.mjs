import { mkdir, writeFile, cp } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderPage } from '../src/templates.mjs';
import { locales, pageFiles } from '../src/content.mjs';
import sharp from 'sharp';

const project = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(project, 'dist');
await mkdir(join(out, 'assets', 'fonts'), { recursive: true });
await mkdir(join(out, 'assets', 'licenses'), { recursive: true });
for (const file of ['styles.css','app.js','favicon.svg']) {
  await cp(join(project, 'assets', file), join(out, 'assets', file));
}
for (const font of ['manrope','dm-sans']) {
  await cp(join(project, 'node_modules', '@fontsource-variable', font, 'files', `${font}-latin-wght-normal.woff2`), join(out,'assets','fonts',`${font}-latin-wght-normal.woff2`));
  await cp(join(project, 'node_modules', '@fontsource-variable', font, 'LICENSE'), join(out,'assets','licenses',`${font}.txt`));
}
await cp(join(project,'node_modules','lucide-static','LICENSE'),join(out,'assets','licenses','lucide.txt'));
await sharp(join(project,'assets','hero-tech.png')).resize({width:1672,withoutEnlargement:true}).webp({quality:85}).toFile(join(out,'assets','hero-tech.webp'));
await sharp(join(project,'assets','felipe-chessa.jpeg')).webp({quality:86}).toFile(join(out,'assets','felipe-chessa.webp'));
await cp(join(project,'assets','projects'),join(out,'assets','projects'),{recursive:true});
let count = 0;
for (const lang of locales) {
  const dir = join(out,lang === 'pt' ? '' : lang);
  await mkdir(dir,{recursive:true});
  for (const page of Object.keys(pageFiles)) {
    await writeFile(join(dir,pageFiles[page]),renderPage(lang,page),'utf8');
    count++;
  }
}
await writeFile(join(out,'robots.txt'),'User-agent: *\nAllow: /\n','utf8');
console.log(`Built ${count} static pages in dist/.`);
