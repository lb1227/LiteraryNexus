import { useParams, Link, useNavigate } from "react-router-dom";
import data from "../data/works.json";
import { useMemo, useState, useEffect } from "react";

export default function WorkPage() {
  const { id } = useParams();                 // e.g. "dungeon-ceo"
  const work = useMemo(() => data.find(w => w.id === id), [id]);
  const [chIndex, setChIndex] = useState(0);  // which chapter is open

  useEffect(() => { setChIndex(0); }, [id]);  // reset when switching works
  if (!work) return <div className="p-6">Not found.</div>;

  const chapters = work.chapters || [];
  const chapter = chapters[chIndex];

  const prev = () => setChIndex(i => Math.max(0, i - 1));
  const next = () => setChIndex(i => Math.min(chapters.length - 1, i + 1));

  return (
    <div className="min-h-screen text-[#e7ecf7] bg-[#0f1115]">
      <header className="border-b border-white/10 px-4 py-3 max-w-5xl mx-auto flex items-center gap-3">
        <Link to="/" className="text-sm opacity-80 hover:opacity-100">← Home</Link>
        <div className="ml-auto text-sm opacity-80">
          <Link to={`/author/${work.author.id}`} className="hover:underline">{work.author.name}</Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 grid lg:grid-cols-[260px_1fr] gap-6">
        {/* Sidebar: chapter list */}
        <aside className="rounded-xl border border-white/10 bg-white/5 p-3 h-fit sticky top-4">
          <h2 className="font-semibold mb-2">{work.title}</h2>
          <p className="text-xs opacity-80 mb-3">{work.genre}</p>
          <ul className="space-y-1 text-sm">
            {chapters.map((c, i) => (
              <li key={c.id}>
                <button
                  onClick={() => setChIndex(i)}
                  className={`w-full text-left px-2 py-1 rounded-md transition
                    ${i===chIndex ? "bg-white/10" : "hover:bg-white/5"}`}
                >
                  {c.index}. {c.title}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Reader */}
        <section className="rounded-xl border border-white/10 bg-white/5 p-5">
          <h1 className="text-xl font-semibold mb-2">{chapter.title}</h1>
          <article className="prose prose-invert max-w-none">
            {/* super-light markdown: headings + paragraphs */}
            {chapter.content_md.split("\n").map((line, idx) => {
              if (line.startsWith("## ")) return <h2 key={idx}>{line.slice(3)}</h2>;
              if (line.trim() === "") return <br key={idx} />;
              return <p key={idx}>{line}</p>;
            })}
          </article>

          <div className="mt-6 flex items-center justify-between">
            <button onClick={prev} disabled={chIndex===0}
              className="px-3 py-2 rounded-lg border border-white/15 disabled:opacity-40">
              ← Previous
            </button>
            <span className="text-sm opacity-80">
              {chIndex+1} / {chapters.length}
            </span>
            <button onClick={next} disabled={chIndex===chapters.length-1}
              className="px-3 py-2 rounded-lg bg-blue-500/90 hover:bg-blue-500 disabled:opacity-40">
              Next →
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
