const KEY = "user-works:v1";

function loadAll() {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
  catch { return []; }
}
function saveAll(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function slugify(s) {
  return String(s).toLowerCase().trim()
    .replace(/[^a-z0-9]+/g,"-")
    .replace(/(^-|-$)/g,"");
}

export function getUserWorks() {
  return loadAll();
}
export function saveUserWork(work) {
  const list = loadAll();
  const i = list.findIndex(w => w.id === work.id);
  if (i >= 0) list[i] = work; else list.push(work);
  saveAll(list);
  return work;
}
export function getUserWorkById(id) {
  return loadAll().find(w => w.id === id) || null;
}
