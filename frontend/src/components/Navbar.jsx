// import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass-nav"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-8 h-8 text-blue-500" />
          <span className="text-xl font-bold tracking-tight text-white">AI Roadmap</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link to="#home" className="hover:text-white transition-colors">Home</Link>
          <Link  to
          ="#features" className="hover:text-white transition-colors">Features</Link>
          <a href="#about" className="hover:text-white transition-colors">About</a>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={()=>navigate("/login")} className="text-sm font-medium text-gray-300 hover:text-white transition-colors hidden sm:block">
            Login
          </button>
          <button onClick={()=>navigate("/register")} className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-full text-sm font-medium transition-all border border-white/10 hover:border-white/20">
            Get Started
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
