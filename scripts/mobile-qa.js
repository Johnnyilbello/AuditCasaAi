const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const exts = new Set([".tsx", ".ts", ".css"]);
const riskyPatterns = [
  { pattern: /100vw/g, message: "Avoid 100vw because it can create lateral scroll on mobile." },
  { pattern: /w-screen/g, message: "Avoid Tailwind w-screen because it can create lateral scroll." },
  { pattern: /min-w-\[/g, message: "Avoid fixed min-width values on mobile." },
  { pattern: /overflow-x-scroll/g, message: "Use contained overflow-x-auto only when needed." }
];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (["node_modules", ".next"].includes(entry.name)) return [];
      return walk(full);
    }
    return exts.has(path.extname(entry.name)) ? [full] : [];
  });
}

let failed = false;
for (const file of walk(root)) {
  if (path.relative(root, file) === "scripts/mobile-qa.js") continue;
  const content = fs.readFileSync(file, "utf8");
  for (const rule of riskyPatterns) {
    if (rule.pattern.test(content)) {
      failed = true;
      console.error(`[mobile-qa] ${path.relative(root, file)}: ${rule.message}`);
    }
  }
}

if (failed) process.exit(1);
console.log("[mobile-qa] OK: no risky 100vw / w-screen / fixed min-width patterns found.");
console.log("[mobile-qa] Manual checkpoints: 320, 360, 375, 390, 414, 430 px.");
