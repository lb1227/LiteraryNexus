import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import works from "../data/works.json";

export default function BrowsePage() {
  const [q, setQ] = useState("");
  const [genre, setGenre] = useState("All");
  const [sort, setSort] = useState("title-asc");

  const genres = useMemo(() => {
    const set = new Set(["All"]);
    works.forEach(w => w.genre && set.add(w.genre));
    return [...set];
  }, []);

  const filtered = useMemo(() => {
    let list = [...works];

    // filter by genre
    if (genre !== "All") list = list.filter(w => w.genre === genre);

    // search title/author
    const k = q.trim().toLowerCase();
    if (k) {
      list = list.filter(w =>
        w.title.toLowerCase().includes(k) ||
        (w.author?.name || "").toLowerCase().includes(k)
      );
    }

    // sort
    if (sort === "title-asc") list.sort((a,b)=>a.title.localeCompare(b.title));
    if (sort === "title-desc") list.sort((a,b)=>b.title.localeCompare(a.title));
    if (sort === "genre") list.sort((a,b)=>a.genre.localeCompare(b.genre));

    return list;
  }, [q, genre, sort]);

  return (
    <div className="min-h-screen bg-[#0f1115] text-[#e7ecf7]">
      <header className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/" className="text-sm opacity-80 hover:opacity-100">← Home</Link>
          <h1 className="ml-2 text-lg font-semibold">Browse</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-4">
        {/* Controls */}
        <div className="grid gap-3 sm:grid-cols-3">
          <input
            value={q}
            onChange={e=>setQ(e.target.value)}
            placeholder="Search titles or authors…"
            className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-blue-400/60"
          />
          <select
            value={genre}
            onChange={e=>setGenre(e.target.value)}
            className="rounded-lg bg-white/5 border border-white/10 px-3 py-2"
          >
            {genres.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
          <select
            value={sort}
            onChange={e=>setSort(e.target.value)}
            className="rounded-lg bg-white/5 border border-white/10 px-3 py-2"
          >
            <option value="title-asc">Title A→Z</option>
            <option value="title-desc">Title Z→A</option>
            <option value="genre">Genre</option>
          </select>
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(w => (
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
          {filtered.length === 0 && (
            <div className="opacity-80">No results.</div>
          )}
        </div>
      </main>
    </div>
  );
}
