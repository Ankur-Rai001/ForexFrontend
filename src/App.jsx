import { motion } from "framer-motion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import TermsAndPolicy from "./components/TermsAndPolicy";
import Disclaimer from "./components/Disclaimer";
import InsertArticle from "./components/InsertArticle";
import ArticleList from "./components/ArticleList";
import ArticleDetail from "./components/ArticleDetail";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden flex flex-col"
      >
        {/* HEADER should be full-width */}
        <div className="px-4 sm:px-6 lg:px-8">
          <Header />
        </div>

        {/* Restrict width only for page content */}
        <div className="w-full flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/articles" element={<ArticleList />} />
              <Route path="/articles/:id" element={<ArticleDetail />} />
              <Route path="/insert-articles" element={<InsertArticle />} />
              <Route path="/terms-and-policy" element={<TermsAndPolicy />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>

        <Footer />
      </motion.div>

      <ToastContainer position="top-center" autoClose={3000} />
    </Router>
  );
}

export default App;
