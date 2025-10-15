import { Link } from "react-router-dom";
import data from "../data/topSeed.json";
import { scoreItems } from "../lib/score";

export default function TopPage() {
  const ranked = scoreItems(data);

  return (
    <div className="min-h-screen bg-[#0f1115] text-[#e7ecf7]">
      <header className="border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/" className="text-sm opacity-80 hover:opacity-100">← Home</Link>
          <h1 className="ml-2 text-lg font-semibold">Top 10</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        <ol className="space-y-3">
          {ranked.map((w, i) => (
            <li key={w.id} className="rounded-xl border border-white/10 bg-white/5 p-4 flex items-start gap-4">
              <span className={`h-8 w-8 flex items-center justify-center rounded-lg text-sm font-bold border ${rankBadge(i+1)}`}>
                {i+1}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Link to={`/work/${w.id}`} className="font-semibold hover:underline truncate">{w.title}</Link>
                  <span className="text-[11px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10">★ {w.rating.toFixed(1)}</span>
                  <span className="text-[11px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10">{w.genre}</span>
                </div>
                <p className="text-sm opacity-80 truncate">by <Link to={`/author/${slug(w.author)}`} className="hover:underline">{w.author}</Link></p>
                <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs opacity-90">
                  <Metric label="7-day reads" value={formatNum(w.reads_7d)} />
                  <Metric label="30-day reads" value={formatNum(w.reads_30d)} />
                  <Metric label="Completion" value={(w.completion*100).toFixed(0) + '%'} />
                  <Metric label="Score" value={w.score.toFixed(3)} />
                </div>
              </div>
              <Link to={`/work/${w.id}`} className="px-3 py-2 rounded-lg bg-blue-500/90 hover:bg-blue-500 text-sm font-medium shadow">Read</Link>
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/5 px-2 py-1 flex items-center justify-between gap-3">
      <span className="opacity-70">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function rankBadge(n){
  if (n===1) return "bg-yellow-400/20 border-yellow-300/40 text-yellow-200";
  if (n===2) return "bg-gray-300/20 border-gray-200/40 text-gray-100";
  if (n===3) return "bg-amber-500/20 border-amber-400/40 text-amber-200";
  return "bg-white/5 border-white/10 text-white/80";
}

function slug(s){ return String(s).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }
function formatNum(n){ return n >= 1e6 ? (n/1e6).toFixed(1)+'M' : n >= 1e3 ? (n/1e3).toFixed(1)+'K' : String(n); }
