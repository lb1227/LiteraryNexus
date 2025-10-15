import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserWorkById } from "../lib/userWorks";
import { getProgress, setProgress } from "../lib/progress";

export default function WorkPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [work, setWork] = useState(null);
  const [chIndex, setChIndex] = useState(0);

  useEffect(() => {
    setLoading(true);
    const w = getUserWorkById(id);
    setWork(w || null);
    if (w) {
      const p = getProgress(w.id);
      setChIndex(p?.chIndex ?? 0);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    if (work) setProgress(work.id, chIndex);
  }, [work, chIndex]);

  if (loading) {
    return <div className="min-h-screen bg-[#0f1115] text-[#e7ecf7] grid place-items-center"><div className="opacity-80">Loading…</div></div>;
  }
  if (!work) {
    return (
      <div className="min-h-screen bg-[#0f1115] text-[#e7ecf7] p-6">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="text-sm opacity-80 hover:opacity-100">← Back</Link>
          <h1 className="text-2xl font-semibold mt-4">Work not found</h1>
          <p className="opacity-80 mt-2">Create it on the publish page.</p>
          <Link to="/publish" className="inline-block mt-3 px-3 py-2 rounded-lg bg-blue-500/90 hover:bg-blue-500 text-sm font-medium shadow">Go to Publish</Link>
        </div>
      </div>
    );
  }

  const chapters = work.chapters || [];
  const chapter = chapters[chIndex];

  const prev = () => setChIndex(i => Math.max(0, i - 1));
  const next = () => setChIndex(i => Math.min(chapters.length - 1, i + 1));

  return (
    <div className="min-h-screen bg-[#0f1115] text-[#e7ecf7]">
      {/* Top bar */}
      <header className="border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/" className="text-sm opacity-80 hover:opacity-100">← Home</Link>
          <div className="ml-auto text-sm opacity-80">
            <Link to={`/author/${work.author.id}`} className="hover:underline">
              {work.author.name}
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-4 py-6 grid lg:grid-cols-[260px_1fr] gap-6">
        {/* Sidebar: chapter list */}
        <aside className="rounded-xl border border-white/10 bg-white/5 p-3 h-fit sticky top-4">
          <h2 className="font-semibold">{work.title}</h2>
          <p className="text-xs opacity-80 mb-3">{work.genre}</p>
          <ul className="space-y-1 text-sm">
            {chapters.map((c, i) => (
              <li key={c.id}>
                <button
                  onClick={() => setChIndex(i)}
                  className={`w-full text-left px-2 py-1 rounded-md transition ${i===chIndex ? "bg-white/10" : "hover:bg-white/5"}`}
                >
                  {c.index}. {c.title}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Reader panel */}
        <section className="rounded-xl border border-white/10 bg-white/5 p-5">
          <h1 className="text-xl font-semibold mb-2">{chapter.title}</h1>
          <article className="prose prose-invert max-w-none">
            {chapter.content_md.split("\n").map((line, idx) => {
              if (line.startsWith("## ")) return <h2 key={idx}>{line.slice(3)}</h2>;
              if (line.trim() === "") return <br key={idx} />;
              return <p key={idx}>{line}</p>;
            })}
          </article>

          <div className="mt-6 flex items-center justify-between">
            <button onClick={prev} disabled={chIndex === 0}
              className="px-3 py-2 rounded-lg border border-white/15 disabled:opacity-40">
              ← Previous
            </button>
            <span className="text-sm opacity-80">
              {chIndex + 1} / {chapters.length}
            </span>
            <button onClick={next} disabled={chIndex === chapters.length - 1}
              className="px-3 py-2 rounded-lg bg-blue-500/90 hover:bg-blue-500 disabled:opacity-40">
              Next →
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
