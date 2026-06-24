
import { motion } from 'framer-motion';
import { BrainCircuit,LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  navigate("/login");
};
  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 glass-nav backdrop-blur-xl border-b border-white/5"
    >
      <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <BrainCircuit className="w-6 h-6 text-blue-500 group-hover:text-purple-400 transition-colors" />
          <span className="text-lg font-bold tracking-tight text-white hidden sm:block">AI Roadmap</span>
        </Link>
        
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/" className='text-gray-400 hover:text-white transition-colors'>Home</Link>
          <Link to="/generate" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link>
          <button 
            onClick={()=>navigate('/myroadmap')}
            className="text-gray-400 hover:text-white transition-colors"
          >
            My Roadmaps
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={handleLogout}
            className="w-22 h-8  bg-white/5 hover:bg-white/10 border px-1.5 border-white/10 flex items-center justify-center transition-all"
          >
            {/* <User className="w-4 h-4 text-gray-300" /> */}
            logout <LogOut className='h-4'/>
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default DashboardNavbar;
