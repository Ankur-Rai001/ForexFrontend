import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="mt-20 border-t border-slate-800 py-6 text-center text-sm text-slate-500 bg-slate-900">
    <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
      <p>&copy; {new Date().getFullYear()} ForexEdge.in. All rights reserved.</p>
      <Link to="/terms-and-policy" className="text-blue-400 hover:underline">
        Terms & Privacy Policy
      </Link>
    </div>
  </footer>
);

export default Footer;
