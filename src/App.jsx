import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import WebNovelLanding from "./pages/WebNovelLanding.jsx";
import WorkPage from "./pages/WorkPage.jsx";
import TopPage from "./pages/TopPage.jsx";
import AuthorPage from "./pages/AuthorPage.jsx";
import BrowsePage from "./pages/BrowsePage.jsx";
import PublishPage from "./pages/PublishPage.jsx";

export default function App() {
  return (
    <BrowserRouter basename="/LiteraryNexus">
      <Routes>
        <Route path="/" element={<WebNovelLanding />} />
        <Route path="/work/:id" element={<WorkPage />} />
        <Route path="/author/:id" element={<AuthorPage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/top" element={<TopPage />} />
        <Route path="/publish" element={<PublishPage />} />
        <Route path="*" element={
          <div className="min-h-screen bg-[#0f1115] text-[#e7ecf7] p-6">
            <div className="max-w-3xl mx-auto">
              <Link to="/" className="text-sm opacity-80 hover:opacity-100">← Home</Link>
              <h1 className="text-2xl font-semibold mt-4">Page not found</h1>
            </div>
          </div>
        }/>
      </Routes>
    </BrowserRouter>
  );
}
