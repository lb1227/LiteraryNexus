const KEY = "reading-progress:v1";
const load = () => JSON.parse(localStorage.getItem(KEY) || "{}");
const save = (obj) => localStorage.setItem(KEY, JSON.stringify(obj));
export const getProgress = (workId) => load()[workId] || null;
export const setProgress = (workId, chIndex) => { const all = load(); all[workId] = { chIndex, at: Date.now() }; save(all); };
export const getLatest = () => {
  const entries = Object.entries(load());
  if (!entries.length) return null;
  entries.sort((a,b)=>b[1].at - a[1].at);
  const [workId, { chIndex }] = entries[0];
  return { workId, chIndex };
};
