// Usage: node tools/merge.js new-entries.json [YYYY-MM-DD]
// Validates new entries, skips duplicates, stamps the "added" date, appends to art.json.
const fs = require('fs');
const KINDS = ['fiber','painting','technique','artist','history','dye','tool'];
const REQ = ['id','kind','title','artist','date','place','medium','about','artistBio'];
const art = JSON.parse(fs.readFileSync('art.json','utf8'));
const incoming = JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const day = process.argv[3] || new Date().toISOString().slice(0,10);
const norm = s => (s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
const ids = new Set(art.map(a=>a.id));
const keys = new Set(art.map(a=>norm(a.title)+'|'+norm(a.artist)));
const titles = new Set(art.map(a=>norm(a.title)));
let added = 0; const skipped = [];
for (const e of incoming) {
  const missing = REQ.filter(k => !e[k] || typeof e[k] !== 'string');
  if (missing.length) { skipped.push(`${e.id||'?'}: missing ${missing.join(',')}`); continue; }
  if (!KINDS.includes(e.kind)) { skipped.push(`${e.id}: bad kind ${e.kind}`); continue; }
  if (!/^[a-z0-9-]+$/.test(e.id)) { skipped.push(`${e.id}: id must be lowercase letters, digits, hyphens`); continue; }
  if (ids.has(e.id) || keys.has(norm(e.title)+'|'+norm(e.artist)) || titles.has(norm(e.title))) { skipped.push(`${e.id}: duplicate`); continue; }
  if (!e.f && !e.w && !e.c) { skipped.push(`${e.id}: needs at least one of f, w, c for the image`); continue; }
  const clean = {}; for (const k of [...REQ,'f','w','c']) if (e[k]) clean[k] = e[k];
  clean.added = day;
  art.push(clean); ids.add(e.id); keys.add(norm(e.title)+'|'+norm(e.artist)); titles.add(norm(e.title)); added++;
}
fs.writeFileSync('art.json', JSON.stringify(art, null, 1) + '\n');
const c = {}; art.forEach(a => c[a.kind] = (c[a.kind]||0) + 1);
console.log(JSON.stringify({added, skipped, total: art.length, byKind: c}, null, 1));
