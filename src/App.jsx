import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebNovelLanding from "./pages/WebNovelLanding.jsx";

function WorkPage() { return <div className="p-6">Work page placeholder</div>; }
function AuthorPage() { return <div className="p-6">Author page placeholder</div>; }
function TopPage() { return <div className="p-6">Top 10 placeholder</div>; }

export default function App() {
  return (
    <BrowserRouter basename="/LiteraryNexus">
      <Routes>
        <Route path="/" element={<WebNovelLanding />} />
        <Route path="/work/:id" element={<WorkPage />} />
        <Route path="/author/:id" element={<AuthorPage />} />
        <Route path="/top" element={<TopPage />} />
      </Routes>
    </BrowserRouter>
  );
}
