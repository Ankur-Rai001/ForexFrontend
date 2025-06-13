import React from "react";
import { motion } from "framer-motion";
import { LineChart, Bell, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Blogs", path: "/articles" },
    { name: "About", path: "/terms-and-policy" },
    { name: "Insert", path: "/insert-articles" },
  ];

  const handleNavClick = (path) => navigate(path);

  return (
    <header className="bg-gray-950 text-white shadow-md py-6 px-4 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Logo & Tagline */}
        <motion.div
          onClick={() => handleNavClick("/")}
          className="flex items-center gap-2 cursor-pointer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <LineChart className="h-8 w-8 text-indigo-400" />
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Forex Edge
            </h1>
            <p className="text-xs text-slate-400">
              AI-Powered Forecasting for Forex
            </p>
          </div>
        </motion.div>

        {/* Creative Menu Items */}
        <motion.nav
          className="flex flex-wrap gap-3 md:gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {navItems.map((item, idx) => (
            <motion.button
              key={item.name}
              onClick={() => handleNavClick(item.path)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 cursor-pointer rounded-lg font-medium transition duration-300
                  text-gray-300 hover:text-white bg-gray-800"
            >
              {item.name}
            </motion.button>
          ))}
        </motion.nav>

        {/* Notification & Settings */}
        <motion.div
          className="flex items-center space-x-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <button className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <Bell className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <Settings className="h-5 w-5" />
          </button>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
