import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";
import sharp from "sharp";

const dir = new URL("../docs/design/cinematic/directions/", import.meta.url);
await mkdir(dir, { recursive: true });
const media = "../../../../public/";
const portrait = `${media}portrait/self-portrait.webp`;
const loop = `${media}graphics/ascii-context-loop.svg`;
const film = `${media}films/qingming-comparison.webp`;
const common = `<meta charset="utf-8"><style>*{box-sizing:border-box}body{margin:0}a{color:inherit;text-decoration:none}header,footer{display:flex;justify-content:space-between}small,nav,footer{font:12px/1.5 'Courier New',monospace}img{object-fit:cover}p{max-width:420px;line-height:1.5}button{font:inherit}h1,h2,p{margin:0}body{width:1440px;height:1000px;overflow:hidden}header{padding:28px 60px;border-bottom:1px solid}nav{display:flex;gap:32px}.actions{display:flex;gap:30px;margin-top:30px}.actions a{border-bottom:1px solid;padding:12px 0}</style>`;
const nav = `<header><b>kallist / selected work</b><nav>WORK &nbsp; FILMS &nbsp; RESUME ↗ &nbsp; 中文</nav></header>`;
const copy = `<p>AI application & Agent engineering.<br>South China Agricultural University · Class of 2027</p><div class="actions"><a>Explore work ↗</a><a>Resume ↗</a><a>Contact ↗</a></div>`;
const pages = [
  { id: "a-living-index", label: "A — Living index / selected", html: `${common}<title>Living index</title><style>body{background:#f0eee7;color:#191b18;font-family:Arial}main{margin:0 65px;position:relative;height:830px}h1{font:900 285px/.9 Arial;letter-spacing:-.085em;padding-top:20px}h1 span{color:#a05439}.claim{position:absolute;top:360px;left:0}h2{font:500 76px/.98 Arial;letter-spacing:-.065em}h2 em{font-family:Georgia;font-weight:400}.portrait{position:absolute;width:500px;height:390px;right:0;top:370px;filter:grayscale(1);border:1px solid #aaa}.loop{position:absolute;right:190px;top:180px;width:800px;opacity:.1;z-index:-1}main p{margin-top:26px;font-size:16px}footer{margin:0 65px;border-top:1px solid;padding-top:20px}</style>${nav}<main><img class="loop" src="${loop}"><h1>kallist<span>.</span></h1><div class="claim"><h2>AI systems.<br><em>Human control.</em></h2>${copy}</div><img class="portrait" src="${portrait}"></main><footer><span>01 VowEdit / 02 RepoBound / 03 CueParcel</span><span>ENGINEERING × VISUAL PRACTICE / 2026</span></footer>` },
  { id: "b-film-edit", label: "B — Film edit", html: `${common}<title>Film edit</title><style>body{background:#191b18;color:#efeee6;font-family:Arial}header{border-color:#666}main{position:relative;margin:40px 60px;height:680px;background:#e9e7dc;color:#191b18}main img{width:100%;height:100%;object-fit:contain}h1{position:absolute;bottom:-110px;left:20px;font:900 240px/1 Arial;letter-spacing:-.08em;color:#a95d42}.note{position:absolute;left:40px;top:32px;font:22px Georgia}footer{margin:130px 60px 0}.role{font:16px Georgia}</style>${nav}<main><img src="${film}"><span class="note">Systems & stories, in motion.</span><h1>kallist.</h1></main><footer><span class="role">AI application & Agent engineering · Class of 2027</span><span>EXPLORE WORK ↗ / RESUME ↗ / CONTACT ↗</span></footer>` },
  { id: "c-field-notes", label: "C — Field notes", html: `${common}<title>Field notes</title><style>body{background:#e4dfd2;color:#292924;font-family:Georgia}header{padding-inline:45px}main{display:grid;grid-template-columns:.7fr 1.2fr 1fr;margin:60px 45px;gap:40px}h1{font:italic 210px/.9 Georgia;letter-spacing:-.09em;writing-mode:vertical-rl;height:650px}main img{width:100%;height:650px;object-position:50%}article{border-top:4px solid;padding-top:25px}h2{font:52px/1 Georgia;margin-bottom:55px}p{font:18px/1.6 Georgia}.actions{flex-direction:column;gap:6px}footer{border-top:1px solid;margin:0 45px;padding-top:20px}</style>${nav}<main><h1>kallist.</h1><img src="${portrait}"><article><small>ENGINEERING / VISUAL PRACTICE</small><h2>Make the<br>system<br>visible.</h2>${copy}</article></main><footer><span>VowEdit · RepoBound · CueParcel · Agent Studio · Skin Lesion AI</span><span>FIELD NOTES / 2026</span></footer>` },
];
const browser = await chromium.launch();
try {
  for (const page of pages) {
    await writeFile(new URL(`${page.id}.html`, dir), page.html);
    const tab = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await tab.goto(new URL(`${page.id}.html`, dir).href);
    await tab.locator("img").first().waitFor({ state: "visible" });
    await sharp(await tab.screenshot()).webp({ quality: 88 }).toFile(fileURLToPath(new URL(`${page.id}.webp`, dir)));
    await tab.close();
  }
  const tiles = await Promise.all(pages.map(async (page, index) => ({ input: await sharp(fileURLToPath(new URL(`${page.id}.webp`, dir))).resize(480).toBuffer(), top: 0, left: index * 480 })));
  await sharp({ create: { width: 1440, height: 333, channels: 3, background: "#fff" } }).composite(tiles).webp({ quality: 90 }).toFile(fileURLToPath(new URL("comparison.webp", dir)));
  await writeFile(new URL("index.html", dir), `<meta charset="utf-8"><title>Kallist direction studies</title><body style="font-family:Arial;background:#eeeae2;margin:32px"><h1>Kallist / direction studies</h1><p>A selected: immediate identity and recruitment path. B: film first. C: editorial notes. Actual source assets, no placeholder projects.</p>${pages.map(p => `<section style="margin:30px 0"><h2>${p.label}</h2><a href="${p.id}.html"><img width="720" src="${p.id}.webp"></a></section>`).join("")}</body>`);
} finally { await browser.close(); }
