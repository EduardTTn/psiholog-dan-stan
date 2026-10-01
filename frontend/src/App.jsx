import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import NavBar from "./components/NavBar.jsx";
import WhatsAppWidget from "./components/WhatsAppWidget.jsx";
import Blog from "./pages/Blog.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import Despre from "./pages/Despre.jsx";
import Home from "./pages/Home.jsx";
import Programari from "./pages/Programari.jsx";
import Servicii from "./pages/Servicii.jsx";
import Tarife from "./pages/Tarife.jsx";
import "./App.css";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // A hash means the target page scrolls to its own anchor — don't fight it.
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/despre" element={<Despre />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/servicii" element={<Servicii />} />
        <Route path="/tarife" element={<Tarife />} />
        <Route path="/programari" element={<Programari />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
      <WhatsAppWidget />
    </>
  );
}
