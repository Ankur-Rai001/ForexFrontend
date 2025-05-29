import { motion } from "framer-motion";
import "./App.css";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Header />
          <Dashboard />
        </div>
      </motion.div>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;
