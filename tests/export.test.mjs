import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../out/", import.meta.url));
const routes = [
  "index.html",
  "resume/index.html",
  "work/repobound/index.html",
  "work/cueparcel/index.html",
  "work/agent-studio/index.html",
  "work/skin-lesion-ai/index.html",
];

test("all public routes are exported as directly loadable HTML", () => {
  for (const route of routes) {
    const file = join(root, route);
    assert.ok(existsSync(file), `missing ${route}`);
    assert.match(readFileSync(file, "utf8"), /<main\b/);
  }
});

test("export contains the real portrait, pinned project images and SEO files", () => {
  for (const path of [
    "portrait/self-portrait.webp",
    "graphics/scau-gate.svg",
    "projects/repobound-hero.png",
    "projects/cueparcel-lens.png",
    "projects/agent-studio-trace.png",
    "projects/skin-lesion-result.png",
    "resume/wei-zhuojie-resume-public.pdf",
    "icon.svg",
    "robots.txt",
    "sitemap.xml",
  ]) {
    assert.ok(existsSync(join(root, path)), `missing ${path}`);
  }
});

function publicFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? publicFiles(path) : [path];
  });
}

test("exported text is free of phone numbers, private paths and token-looking values", () => {
  const files = publicFiles(root).filter((file) =>
    /\.(?:html|js|json|xml|txt|css)$/.test(file),
  );
  const text = files.map((file) => readFileSync(file, "utf8")).join("\n");
  for (const file of files.filter((path) => path.endsWith(".html"))) {
    const html = readFileSync(file, "utf8")
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<[^>]+>/g, " ");
    assert.ok(
      !/(?:\+?86[- ]?)?1[3-9]\d{9}/.test(html),
      `Chinese mobile number in visible HTML: ${file}`,
    );
  }
  assert.ok(
    !/(?:C:\\Users\\|E:\\Acodex work\\)/i.test(text),
    "private local path found",
  );
  assert.ok(
    !/(?:gho_|sk-proj-|AIza)[A-Za-z0-9_-]{12,}/.test(text),
    "credential-shaped value found",
  );
  assert.match(text, /78\.54%/);
  assert.match(text, /65\.49%/);
});

test("public homepage metadata and visible identity use kallist while resume keeps the real name", () => {
  const home = readFileSync(join(root, "index.html"), "utf8");
  const resume = readFileSync(join(root, "resume/index.html"), "utf8");
  assert.match(home, /<title>kallist — AI systems, made inspectable<\/title>/);
  const heading = home.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1].replace(/<[^>]+>/g, "").trim();
  assert.equal(heading, "kallist.");
  assert.doesNotMatch(home, /<h1[^>]*>Wei Zhuojie|<h1[^>]*>韦焯杰|>WZ</);
  assert.match(resume, /Wei Zhuojie/);
  assert.match(resume, /韦焯杰/);
});

test("exported homepage includes factual Chinese education and the character gate", () => {
  const home = readFileSync(join(root, "index.html"), "utf8");
  assert.match(home, /华南农业大学/);
  assert.match(home, /信息管理与信息系统/);
  assert.match(home, /本科/);
  assert.match(home, /2023\.09/);
  assert.match(home, /2027\.06/);
  assert.match(home, /graphics\/scau-gate\.svg/);
  assert.doesNotMatch(home, /Detail 01|Detail 02/);
});
