import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserWorks } from "../lib/userWorks";

export default function BrowsePage() {
  const [q, setQ] = useState("");
  const [genre, setGenre] = useState("All");
  const [sort, setSort] = useState("title-asc");
  const [loading, setLoading] = useState(false);

  const base = useMemo(() => getUserWorks(), []); // read from localStorage
  const genres = useMemo(() => {
    const set = new Set(["All"]);
    base.forEach(w => w.genre && set.add(w.genre));
    return [...set];
  }, [base]);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 120);
    return () => clearTimeout(t);
  }, [q, genre, sort]);

  const list = useMemo(() => {
    let l = [...base];
    if (genre !== "All") l = l.filter(w => w.genre === genre);
    const k = q.trim().toLowerCase();
    if (k) l = l.filter(w =>
      w.title.toLowerCase().includes(k) ||
      (w.author?.name || "").toLowerCase().includes(k)
    );
    if (sort === "title-asc") l.sort((a,b)=>a.title.localeCompare(b.title));
    if (sort === "title-desc") l.sort((a,b)=>b.title.localeCompare(a.title));
    if (sort === "genre") l.sort((a,b)=>a.genre.localeCompare(b.genre));
    return l;
  }, [base, q, genre, sort]);

  return (
    <div className="min-h-screen bg-[#0f1115] text-[#e7ecf7]">
      {/* header omitted for brevity */}

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-4">
        {/* controls omitted for brevity */}

        {loading ? (
          <div className="opacity-80">Loading…</div>
        ) : list.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <div className="font-semibold mb-1">No works yet</div>
            <p className="opacity-80 text-sm">Be the first to publish.</p>
            <Link to="/publish" className="inline-block mt-3 px-3 py-2 rounded-lg bg-blue-500/90 hover:bg-blue-500 text-sm font-medium shadow">
              Publish your first work
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map(w => (
              <article key={w.id} className="rounded-xl border border-white/10 bg-white/5 p-4 flex flex-col">
                <div className="text-xs opacity-80 mb-1">{w.genre}</div>
                <Link to={`/work/${w.id}`} className="font-semibold hover:underline line-clamp-2">{w.title}</Link>
                <div className="text-sm opacity-80 mb-2">
                  by <Link to={`/author/${w.author.id}`} className="hover:underline">{w.author.name}</Link>
                </div>
                <p className="text-sm opacity-80 line-clamp-3 flex-1">{w.synopsis}</p>
                <div className="mt-3">
                  <Link to={`/work/${w.id}`} className="px-3 py-2 rounded-lg bg-blue-500/90 hover:bg-blue-500 text-sm font-medium shadow">
                    Read
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
