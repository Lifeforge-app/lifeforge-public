import { BrowserRouter, Routes, Route } from "react-router-dom";
import Album from "./pages/Album";
import NotFound from "./components/NotFound";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/photos/album/:id" element={<Album />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
