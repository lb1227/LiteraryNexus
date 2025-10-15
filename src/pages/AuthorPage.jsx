import { useParams, Link } from "react-router-dom";
import works from "../data/works.json";

export default function AuthorPage() {
  const { id } = useParams(); // e.g. "k-lumen"
  const authored = works.filter(w => w.author.id === id);
  const author = authored[0]?.author;

  if (!author) {
    return (
      <div className="min-h-screen bg-[#0f1115] text-[#e7ecf7] p-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="text-sm opacity-80 hover:opacity-100">← Home</Link>
          <h1 className="text-2xl font-semibold mt-4">Author not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1115] text-[#e7ecf7]">
      <header className="border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/" className="text-sm opacity-80 hover:opacity-100">← Home</Link>
          <h1 className="ml-2 text-lg font-semibold">{author.name}</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {authored.map(w => (
          <div key={w.id} className="rounded-xl border border-white/10 bg-white/5 p-4 flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-sm opacity-80">{w.genre}</p>
              <Link to={`/work/${w.id}`} className="font-semibold hover:underline truncate block">
                {w.title}
              </Link>
              <p className="text-sm opacity-80 line-clamp-2 mt-1">{w.synopsis}</p>
            </div>
            <Link to={`/work/${w.id}`} className="px-3 py-2 rounded-lg bg-blue-500/90 hover:bg-blue-500 text-sm font-medium shadow">
              Read
            </Link>
          </div>
        ))}
      </main>
    </div>
  );
}
