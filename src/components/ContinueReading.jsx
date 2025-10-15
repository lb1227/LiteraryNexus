// src/components/ContinueReading.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLatest } from "../lib/progress";
import works from "../data/works.json"; // <-- use JSON directly

export default function ContinueReading() {
  const [item, setItem] = useState(null);

  useEffect(() => {
    const latest = getLatest();
    if (!latest) return;
    const w = works.find(x => x.id === latest.workId);
    if (!w) return;
    const ch = w.chapters[latest.chIndex] || w.chapters[0];
    setItem({ id: w.id, title: w.title, chapter: ch?.title });
  }, []);

  if (!item) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
      <Link to={`/work/${item.id}`} className="block rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/7 transition">
        <div className="text-sm opacity-80">Continue reading</div>
        <div className="font-semibold">{item.title}</div>
        <div className="text-xs opacity-80">{item.chapter}</div>
      </Link>
    </div>
  );
}
