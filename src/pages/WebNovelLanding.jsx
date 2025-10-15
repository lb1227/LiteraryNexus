import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ContinueReading from "../components/ContinueReading.jsx";


// Webnovel-style Landing Page (single-file React component)
// - TailwindCSS classes assumed available in your app
// - No external UI libs; pure React + Tailwind
// - Replace mock data with your API later

export default function WebNovelLanding() {
  const [activeGenre, setActiveGenre] = useState("All");
  const [query, setQuery] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);
  const [tab, setTab] = useState("Trending");
  const autoSlideRef = useRef(null);

  const genres = [
    "All","Fantasy","Romance","Sci‑Fi","Action","Mystery","Slice of Life","Horror","Comedy","Fanfic"
  ];

  const heroSlides = [
    {
      id: 1,
      title: "The Arcane Ledger",
      subtitle: "A scholar accountant wakes in a world where mana is taxed.",
      tag: "Fantasy • System • Adventure",
      cta: "Read Chapter 1"
    },
    {
      id: 2,
      title: "Neon Orchids",
      subtitle: "A courier uncovers a biotech conspiracy in a vertical megacity.",
      tag: "Sci‑Fi • Thriller • Cyberpunk",
      cta: "Start Reading"
    },
    {
      id: 3,
      title: "Paper Moons",
      subtitle: "Two artists trade letters across parallel worlds.",
      tag: "Romance • Literary • Multiverse",
      cta: "Begin the Journey"
    }
  ];

  const items = useMemo(() => (
    [
      { id: "a1", title: "Dungeon CEO", author: "K. Lumen", genre: "Fantasy", rating: 4.9, reads: "2.3M", cover: gradient(0) },
      { id: "a2", title: "Ghosts of Ganymede", author: "R. Sol", genre: "Sci‑Fi", rating: 4.7, reads: "980K", cover: gradient(1) },
      { id: "a3", title: "Petals & Penumbra", author: "Aya K.", genre: "Romance", rating: 4.8, reads: "1.1M", cover: gradient(2) },
      { id: "a4", title: "The Clockwork Pact", author: "E. Bramble", genre: "Fantasy", rating: 4.6, reads: "720K", cover: gradient(3) },
      { id: "a5", title: "Quiet Cataclysm", author: "Noah L.", genre: "Horror", rating: 4.5, reads: "410K", cover: gradient(4) },
      { id: "a6", title: "Starboard", author: "I. Kepler", genre: "Sci‑Fi", rating: 4.9, reads: "1.9M", cover: gradient(5) },
      { id: "a7", title: "Ink & Iron", author: "M. Vale", genre: "Action", rating: 4.4, reads: "300K", cover: gradient(6) },
      { id: "a8", title: "Sunlit Maze", author: "T. Remy", genre: "Slice of Life", rating: 4.3, reads: "150K", cover: gradient(7) },
      { id: "a9", title: "Equation of Hearts", author: "J. Nadir", genre: "Romance", rating: 4.7, reads: "830K", cover: gradient(8) },
      { id: "a10", title: "Cinder Crown", author: "A. Rowan", genre: "Fantasy", rating: 4.8, reads: "1.4M", cover: gradient(9) },
    ]
  ), []);

  const top10 = useMemo(() => (
    [
      { id:"r1", title:"Dungeon CEO", author:"K. Lumen", genre:"Fantasy", rating:4.9 },
      { id:"r2", title:"Neon Orchids", author:"V. Hale", genre:"Sci‑Fi", rating:4.9 },
      { id:"r3", title:"Paper Moons", author:"E. Lark", genre:"Romance", rating:4.8 },
      { id:"r4", title:"Starboard", author:"I. Kepler", genre:"Sci‑Fi", rating:4.8 },
      { id:"r5", title:"The Arcane Ledger", author:"S. Marin", genre:"Fantasy", rating:4.7 },
      { id:"r6", title:"Quiet Cataclysm", author:"Noah L.", genre:"Horror", rating:4.7 },
      { id:"r7", title:"Ink & Iron", author:"M. Vale", genre:"Action", rating:4.6 },
      { id:"r8", title:"Cinder Crown", author:"A. Rowan", genre:"Fantasy", rating:4.6 },
      { id:"r9", title:"Equation of Hearts", author:"J. Nadir", genre:"Romance", rating:4.6 },
      { id:"r10", title:"The Clockwork Pact", author:"E. Bramble", genre:"Fantasy", rating:4.5 },
    ]
  ), []);

  const filtered = useMemo(() => {
    let list = items;
    if (activeGenre !== "All") list = list.filter(i => i.genre === activeGenre);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(i => i.title.toLowerCase().includes(q) || i.author.toLowerCase().includes(q));
    }
    return list;
  }, [items, activeGenre, query]);

  useEffect(() => {
    if (autoSlideRef.current) window.clearInterval(autoSlideRef.current);
    autoSlideRef.current = window.setInterval(() => {
      setActiveSlide(s => (s + 1) % heroSlides.length);
    }, 5000);
    return () => { if (autoSlideRef.current) window.clearInterval(autoSlideRef.current); };
  }, []);

  return (
    <div className="min-h-screen bg-[#0f1115] text-[#e7ecf7]">
      <Header query={query} setQuery={setQuery} />
      <Subnav tab={tab} setTab={setTab} genres={genres} activeGenre={activeGenre} setActiveGenre={setActiveGenre} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        <section className="lg:col-span-8 space-y-6">
          <Hero slides={heroSlides} active={activeSlide} setActive={setActiveSlide} />
          <Section title={tab === "Trending" ? "Trending Now" : "New & Noteworthy"}>
            <HorizontalScroller>
              {filtered.slice(0, 12).map(item => (
                <BookCard key={item.id} item={item} compact />
              ))}
            </HorizontalScroller>
          </Section>
          <Section title="Explore by Genre">
            <div className="flex flex-wrap gap-2">
              {genres.map(g => (
                <button
                  key={g}
                  onClick={() => setActiveGenre(g)}
                  className={`px-3 py-1 rounded-full border transition ${activeGenre === g ? 'bg-white/10 border-white/20' : 'border-white/10 hover:bg-white/5'}`}
                >{g}</button>
              ))}
            </div>
          </Section>
          <Section title="Featured Collections">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.slice(0, 9).map(item => (
                <BookCard key={item.id} item={item} />
              ))}
            </div>
          </Section>
        </section>

        <aside className="lg:col-span-4 space-y-6">
          <TopTen list={top10} />
          <UpdatesPanel />
          <CTABox />
        </aside>
      </main>

      <Footer />
    </div>
  );
}

function Header({ query, setQuery }){
  return (
    <header className="border-b border-white/10 bg-[#141823]/80 backdrop-blur supports-[backdrop-filter]:bg-[#141823]/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center gap-4 py-3">
        <div className="flex items-center gap-3 mr-auto">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 shadow"></div>
          <span className="font-semibold tracking-wide">Novelry</span>
        </div>
        <div className="hidden md:flex items-center flex-1 max-w-xl">
          <div className="relative w-full">
            <input
              value={query}
              onChange={e=>setQuery(e.target.value)}
              placeholder="Search titles, authors, tags…"
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2 outline-none focus:border-blue-400/60"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/60">⌘K</span>
          </div>
        </div>
        <nav className="hidden sm:flex items-center gap-4 text-sm">
          <Link className="opacity-80 hover:opacity-100" to="/browse">Browse</Link>
          <a className="opacity-80 hover:opacity-100" href="#">Library</a>
          <Link to="/top" className="opacity-80 hover:opacity-100">Top 10</Link>
        </nav>
        <div className="flex items-center gap-2">
          <button className="hidden sm:inline-flex px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-sm">Sign In</button>
          <button className="inline-flex px-3 py-2 rounded-lg bg-blue-500/90 hover:bg-blue-500 text-sm font-medium shadow">Publish</button>
        </div>
      </div>
    </header>
  );
}

function Subnav({ tab, setTab, genres, activeGenre, setActiveGenre }){
  return (
    <div className="border-b border-white/10 bg-[#0f1115] sticky top-0 z-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 h-12">
        <div className="flex items-center gap-3 text-sm">
          { ["Trending","New"].map(t => (
            <button key={t}
              onClick={()=>setTab(t)}
              className={`px-3 py-1.5 rounded-lg transition border ${tab===t? 'bg-white/10 border-white/20' : 'border-white/10 hover:bg-white/5'}`}>{t}
            </button>
          )) }
        </div>
        <div className="hidden md:flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          {genres.map(g => (
            <button key={g}
              onClick={()=>setActiveGenre(g)}
              className={`px-3 py-1 rounded-full transition border whitespace-nowrap ${activeGenre === g ? 'bg-white/10 border-white/20' : 'border-white/10 hover:bg-white/5'}`}>{g}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Hero({ slides, active, setActive }){
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-xl">
      <div className="relative h-64 sm:h-80 md:h-96">
        {slides.map((s, i) => (
          <div key={s.id}
            className={`absolute inset-0 transition-opacity duration-700 ${i===active? 'opacity-100' : 'opacity-0'}`}
            aria-hidden={i!==active}
          >
            <div className={`absolute inset-0 ${heroBg(i)}`}></div>
            <div className="relative h-full w-full p-6 sm:p-10 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent">
              <div className="max-w-xl">
                <div className="text-xs uppercase tracking-widest opacity-80">{s.tag}</div>
                <h2 className="text-2xl sm:text-4xl font-semibold mt-1">{s.title}</h2>
                <p className="text-white/80 mt-2 text-sm sm:text-base">{s.subtitle}</p>
                <Link to="/work/dungeon-ceo" className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/90 hover:bg-blue-500 text-sm font-medium shadow">
                  Read Chapter 1
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={()=>setActive(i)} aria-label={`Go to slide ${i+1}`}
            className={`h-2.5 w-2.5 rounded-full border border-white/40 ${i===active? 'bg-white/90' : 'bg-white/10 hover:bg-white/30'}`}></button>
        ))}
      </div>
    </div>
  );
}

function Section({ title, children }){
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        <a className="text-sm opacity-80 hover:opacity-100" href="#">See all →</a>
      </div>
      {children}
    </section>
  );
}

function HorizontalScroller({ children }){
  return (
    <div className="relative">
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 no-scrollbar">
        {children}
      </div>
    </div>
  );
}

function BookCard({ item, compact=false }){
  return (
    <article className={`group rounded-xl border border-white/10 bg-white/5 hover:bg-white/7 transition shadow ${compact? 'min-w-[200px] max-w-[220px] snap-start' : ''}`}>
      <div className="p-3">
        <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden">
          <div className={`absolute inset-0 ${item.cover}`}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-2 left-2 right-2 text-xs flex items-center gap-2 opacity-90">
            <span className="px-1.5 py-0.5 rounded bg-black/50 border border-white/10">{item.genre}</span>
            <span className="px-1.5 py-0.5 rounded bg-black/50 border border-white/10">★ {item.rating}</span>
            <span className="ml-auto bg-black/40 px-1.5 py-0.5 rounded border border-white/10">{item.reads} reads</span>
          </div>
        </div>
        <div className="mt-2">
          <h4 className="font-medium leading-tight line-clamp-2 group-hover:underline">{item.title}</h4>
          <p className="text-xs opacity-80 mt-0.5">by {item.author}</p>
        </div>
      </div>
    </article>
  );
}

function TopTen({ list }){
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">Top 10</h3>
        <Link to="/top" className="opacity-80 hover:opacity-100">Top 10</Link>
      </div>
      <ol className="space-y-2">
        {list.map((r, idx) => (
          <li key={r.id} className="flex items-start gap-3">
            <span className={`h-6 w-6 flex items-center justify-center rounded-md text-xs font-semibold border ${rankBg(idx+1)}`}>{idx+1}</span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="truncate font-medium leading-tight">{r.title}</p>
                <span className="text-[11px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10">★ {r.rating}</span>
              </div>
              <p className="text-xs opacity-80 truncate">{r.author} • {r.genre}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function UpdatesPanel() {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow">
      <h3 className="text-lg font-semibold mb-2">Latest Updates</h3>
      <ul className="space-y-2 text-sm">
        {[
          { t:"Dungeon CEO", c:"Ch. 412", time:"2h ago" },
          { t:"Paper Moons", c:"Ch. 38", time:"5h ago" },
          { t:"Neon Orchids", c:"Ch. 77", time:"Yesterday" },
        ].map((u, i) => (
          <li key={i} className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
            <div className="flex-1 min-w-0">
              <p className="truncate"><span className="font-medium">{u.t}</span> <span className="opacity-80">— {u.c}</span></p>
            </div>
            <span className="opacity-70 text-xs">{u.time}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CTABox() {
  return (
    <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/20 to-violet-500/20 p-5 shadow">
      <h3 className="text-lg font-semibold">Become a Creator</h3>
      <p className="text-sm opacity-90 mt-1">Publish your first 3 chapters for free. Unlock monetization when you hit milestones.</p>
      <div className="flex gap-2 mt-3">
        <button className="px-3 py-2 rounded-lg bg-blue-500/90 hover:bg-blue-500 text-sm font-medium shadow">Start Publishing</button>
        <button className="px-3 py-2 rounded-lg border border-white/15 hover:bg-white/5 text-sm">Learn More</button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-10 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center gap-4 sm:justify-between text-sm opacity-80">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500" />
          <span>Novelry © {new Date().getFullYear()}</span>
        </div>
        <nav className="flex items-center gap-4">
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Support</a>
        </nav>
      </div>
    </footer>
  );
}

// --- helpers
function gradient(i){
  const palettes = [
    "bg-[radial-gradient(100%_100%_at_0%_0%,#3b82f6_0%,#111827_60%)]",
    "bg-[radial-gradient(100%_100%_at_100%_0%,#10b981_0%,#111827_60%)]",
    "bg-[radial-gradient(100%_100%_at_0%_100%,#ec4899_0%,#111827_60%)]",
    "bg-[radial-gradient(100%_100%_at_100%_100%,#f59e0b_0%,#111827_60%)]",
    "bg-[radial-gradient(100%_100%_at_50%_0%,#6366f1_0%,#111827_60%)]",
    "bg-[radial-gradient(100%_100%_at_0%_50%,#22d3ee_0%,#111827_60%)]",
    "bg-[radial-gradient(100%_100%_at_100%_50%,#ef4444_0%,#111827_60%)]",
    "bg-[radial-gradient(100%_100%_at_50%_100%,#14b8a6_0%,#111827_60%)]",
    "bg-[radial-gradient(100%_100%_at_25%_25%,#a855f7_0%,#111827_60%)]",
    "bg-[radial-gradient(100%_100%_at_75%_25%,#84cc16_0%,#111827_60%)]",
  ];
  return palettes[i % palettes.length];
}

function heroBg(i){
  const bgs = [
    "bg-[linear-gradient(135deg,#0ea5e9_0%,#1e3a8a_100%)]",
    "bg-[linear-gradient(135deg,#22c55e_0%,#14532d_100%)]",
    "bg-[linear-gradient(135deg,#a855f7_0%,#3b0764_100%)]",
  ];
  return bgs[i % bgs.length];
}

function rankBg(n){
  if (n === 1) return "bg-yellow-400/20 border-yellow-300/40 text-yellow-200";
  if (n === 2) return "bg-gray-300/20 border-gray-200/40 text-gray-100";
  if (n === 3) return "bg-amber-500/20 border-amber-400/40 text-amber-200";
  return "bg-white/5 border-white/10 text-white/80";
}
