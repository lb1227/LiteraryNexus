import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { slugify, saveUserWork } from "../lib/userWorks";

const GENRES = ["Fantasy","Sci-Fi","Romance","Horror","Action","Slice of Life","Mystery","Comedy","Fanfic"];

export default function PublishPage(){
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState(GENRES[0]);
  const [synopsis, setSynopsis] = useState("");
  const [content, setContent] = useState("## Chapter 1\n\nStart writing here…");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const canSave = title.trim().length >= 3 && content.trim().length > 0;

  const onPublish = () => {
    setError("");
    if(!canSave){ setError("Add a title and some content."); return; }
    setSaving(true);
    const id = slugify(title);
    const work = {
      id,
      title: title.trim(),
      genre,
      synopsis: synopsis.trim(),
      author: { id: "you", name: "You" }, // placeholder
      cover_url: "",
      chapters: [
        { id: crypto.randomUUID(), index: 1, title: "Chapter 1", content_md: content }
      ]
    };
    saveUserWork(work);
    setSaving(false);
    nav(`/work/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#0f1115] text-[#e7ecf7]">
      <header className="border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/" className="text-sm opacity-80 hover:opacity-100">← Home</Link>
          <h1 className="ml-2 text-lg font-semibold">Publish</h1>
          <span className="ml-auto text-sm opacity-80">Saves locally</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-5">
        {error && <div className="rounded-lg border border-red-400/30 bg-red-500/10 text-red-200 px-3 py-2">{error}</div>}

        {/* Meta */}
        <section className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-sm opacity-80">Title</label>
              <input
                value={title}
                onChange={e=>setTitle(e.target.value)}
                placeholder="My Great Novel"
                className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-blue-400/60"
              />
            </div>
            <div>
              <label className="text-sm opacity-80">Genre</label>
              <select
                value={genre}
                onChange={e=>setGenre(e.target.value)}
                className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2"
              >
                {GENRES.map(g => <option key={g}>{g}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-sm opacity-80">Synopsis</label>
            <textarea
              value={synopsis}
              onChange={e=>setSynopsis(e.target.value)}
              rows={3}
              placeholder="One-paragraph teaser…"
              className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-blue-400/60"
            />
          </div>
        </section>

        {/* Editor */}
        <section className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">Chapter 1</h2>
            <span className="text-xs opacity-80">Markdown supported (## headings, **bold**)</span>
          </div>
          <textarea
            value={content}
            onChange={e=>setContent(e.target.value)}
            rows={16}
            className="w-full rounded-lg bg-[#0f1115] border border-white/10 px-3 py-2 font-mono text-sm outline-none focus:border-blue-400/60"
          />
        </section>

        <div className="flex items-center gap-2">
          <button
            onClick={onPublish}
            disabled={!canSave || saving}
            className="px-4 py-2 rounded-lg bg-blue-500/90 hover:bg-blue-500 disabled:opacity-40 text-sm font-medium shadow"
          >
            {saving ? "Publishing…" : "Publish"}
          </button>
          <span className="text-xs opacity-80">You can add more chapters later.</span>
        </div>
      </main>
    </div>
  );
}
