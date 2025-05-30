import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Settings, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate('/');
  };

  return (
    <header className="py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleTitleClick}
          className="cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <LineChart className="h-8 w-8 text-blue-400" />
            <p className="text-2xl md:text-3xl font-bold">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                Forex Edge
              </span>
            </p>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            AI-Powered Time Series Forecasting for Forex Trading
          </p>
        </motion.div>

        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center space-x-2"
        >
          <button className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <Bell className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <Settings className="h-5 w-5" />
          </button>
        </motion.nav>
      </div>
    </header>
  );
};

export default Header;
