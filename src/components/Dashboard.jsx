import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getJWTToken, graphApi } from "../api/graphApi";
import Disclaimer from "./Disclaimer";
import AdsenseAd from "./AdsenseAd";

const Dashboard = () => {
  const [currency, setCurrency] = useState("");
  const [interval, setInterval] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    if (!currency || !interval) {
      toast.error("Please select both currency and interval");
      return;
    }

    setLoading(true);
    try {
      const token = await getJWTToken();
      const url = await graphApi(currency, interval, token);

      if (!url) {
        setImageUrl(null);
        toast.info("Graph not available yet.");
      } else {
        setImageUrl(url);
      }
    } catch (error) {
      setImageUrl(null);
      toast.error(
        "Graph is not available at the moment. Please try again later."
      );
    }
    setLoading(false);
  };


  const test = async()=>{
    setLoading(true);
    const token = await getJWTToken();
  }

  useEffect(() => {
    try {
      if (window.adsbygoogle && process.env.NODE_ENV === "production") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, []);

  return (
    <div className="px-4 sm:px-8 py-10 overflow-hidden text-white">
      {/* Heading Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-7xl mx-auto mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">
          Revolutionize Your Trading with{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
            Cutting-Edge AI Technology
          </span>
        </h1>
        <p className="text-slate-400 text-base md:text-lg font-medium">
          Welcome to{" "}
          <span className="text-white font-semibold">Forex Edge</span>, the
          premier platform for AI-driven Forex prediction. Our technology
          harnesses a{" "}
          <span className="text-white font-semibold">
            time series forecasting model
          </span>{" "}
          to deliver accurate, real-time insights into the Forex market. Whether
          you're a seasoned trader or a beginner, Forex Edge equips you with the
          tools to make smarter decisions and enhance your trading performance.
        </p>
      </motion.div>

      {/* Select Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
        <div>
          <label className="block text-slate-300 text-sm font-medium mb-1">
            Currency
          </label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full bg-slate-800 text-white p-3 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Currency</option>
            <option value="GBPUSD">GBP/USD</option>
            {/* <option value="EURUSD">EUR/USD</option> */}
          </select>
        </div>

        <div>
          <label className="block text-slate-300 text-sm font-medium mb-1">
            Interval
          </label>
          <select
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
            className="w-full bg-slate-800 text-white p-3 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Interval</option>
            <option value="1day">1 Day</option>
            <option value="4hour">4 Hour</option>
            <option value="1hour">1 Hour</option>
            <option value="15min">15 Min</option>
          </select>
        </div>

        <div className="flex flex-col justify-end pt-5 md:pt-0">
          <button
            onClick={handleFetch}
            disabled={loading}
            className={`w-full bg-gradient-to-r from-blue-700 to-purple-700 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300 cursor-pointer
              ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            View Forecast
          </button>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white/5 p-4 rounded-xl shadow-md max-w-4xl mx-auto mb-10 min-h-[350px] flex items-center justify-center overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : imageUrl ? (
          <div className="overflow-hidden rounded-lg w-full">
            <img
              src={imageUrl}
              alt="Prediction Graph"
              className="w-full rounded-lg shadow-lg transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>
        ) : !currency || !interval ? (
          <p className="text-slate-400 text-center">
            No forecast generated. Please select options above and click "View
            Forecast".
          </p>
        ) : (
          <p className="text-center text-lg text-slate-400 animate-fadeIn duration-1000">
            <span className="inline-flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-purple-400 animate-bounce"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223a9 9 0 0116.04 0M12 3v1m6.364 1.636l-.707.707M21 12h-1m-1.636 6.364l-.707-.707M12 21v-1m-6.364-1.636l.707-.707M3 12h1m1.636-6.364l.707.707"
                />
              </svg>
              <span>
                <span className="text-white font-bold tracking-wide">
                  Exciting Updates!
                </span>{" "}
                Our AI-powered forecast is
                <span className="text-purple-400 font-semibold ml-1">
                  loading in the pipeline
                </span>
                .
                <br />
                <span className="text-blue-300">
                  Get ready to unlock precision trading soon 🚀
                </span>
              </span>
            </span>
          </p>
        )}
      </div>

      {/* Model Explanation Section */}
      <div className="max-w-4xl mx-auto space-y-8 text-slate-300">
        <div>
          <h2 className="text-2xl font-semibold text-white mb-2">
            What Powers Our Forecasts?
          </h2>
          <p className="leading-relaxed">
            Our forecasts stem from a sophisticated deep learning model, trained
            on vast historical data including price trends, economic indicators,
            and market sentiment. By weaving in proven technical indicators such
            as{" "}
            <span className="text-white font-medium">
              Exponential Moving Average (10-period), MACD (Moving Average
              Convergence Divergence Line), MACD_Signal (MACD Signal Line),
              BB_upper (Bollinger Bands Upper Band), RSI (Relative Strength
              Index - 14-period), ATR (Average True Range - 14-period), OBV
              (On-Balance Volume), VIX (CBOE Volatility Index), Interest_rate,
              and regime_change
            </span>
            , we ensure razor-sharp accuracy for Forex trading. These tools,
            paired with cutting-edge recurrent neural networks (RNNs) and
            attention mechanisms, dissect time series data to reveal intricate
            market patterns, forming a solid foundation for reliable
            predictions.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-2">
            How It Works
          </h2>
          <p className="leading-relaxed">
            The model excels by processing these indicators to generate
            real-time forecasts tailored to market conditions. For example,{" "}
            <span className="text-white font-medium">
              EMA_10 and MACD_Line highlight emerging trends, RSI_14 flags
              overbought or oversold states, and VIX measures volatility shifts
            </span>
            . Meanwhile, interest_rate and event_flag inputs enable it to adjust
            to economic events and policy changes. Fine-tuned for the{" "}
            <span className="text-white font-medium">GBPUSD</span> pair, it
            captures this currency’s unique behavior, delivering timely and
            actionable insights for traders.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-2">
            Why It Stands Out
          </h2>
          <p className="leading-relaxed">
            Our forecasts shine with indicator-powered precision, driven by a
            targeted suite of metrics and deep learning prowess. The{" "}
            <span className="text-white font-medium">GBPUSD</span> focus ensures
            specialized clarity, while advanced algorithms anticipate market
            movements effortlessly. Whether you’re a seasoned GBPUSD trader or
            an institutional player, this model offers a trusted edge. It’s the
            ultimate tool for navigating the Forex market with confidence and
            success.
          </p>
        </div>

        <AdsenseAd />
      </div>
    </div>
  );
};

export default Dashboard;
