import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Route, BookOpen, Code2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section id="home" className="pt-32 pb-20 px-6 relative overflow-hidden min-h-screen flex items-center bg-[#020617]">
      {/* Background glowing effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-glow pointer-events-none opacity-40" />
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 w-max text-xs text-purple-300 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span className="font-medium tracking-wide">Next-Gen AI Learning Paths</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Your Personalized <br />
            <span className="text-gradient font-black">AI Learning Journey</span> <br />
            Starts Here
          </h1>
          
          <p className="text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed">
            Generate custom-tailored career roadmaps matching your distinct goals, style, and timeline. Stop wasting hours searching what to learn next.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/register")}
              className="bg-white text-black hover:bg-slate-100 px-8 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] cursor-pointer"
            >
              Generate Roadmap <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                const el = document.getElementById('about');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all cursor-pointer"
            >
              Explore Demo
            </motion.button>
          </div>
        </motion.div>

        {/* Right Content - Futuristic Interactive Timeline Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[480px] w-full hidden lg:flex items-center justify-center"
        >
          {/* Main animated glowing center circle */}
          <div className="absolute w-64 h-64 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-2xl animate-pulse" />

          {/* Interactive Node Path Container */}
          <div className="relative w-full h-full border border-white/[0.06] bg-white/[0.01] rounded-[32px] overflow-hidden backdrop-blur-sm">
            {/* Subtle grid pattern overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            
            {/* Dynamic floating path items */}
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-16 left-12 p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-3 backdrop-blur-md"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Route className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-semibold text-white">Phase 1: Foundations</div>
                <div className="text-[10px] text-slate-400 mt-0.5">2 Weeks • Completed</div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-1/2 right-12 p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-3 backdrop-blur-md"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Code2 className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-semibold text-white">Phase 2: React Engine</div>
                <div className="text-[10px] text-slate-400 mt-0.5">4 Weeks • Active</div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-16 left-16 p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-3 backdrop-blur-md"
            >
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-semibold text-white">Phase 3: Database Integration</div>
                <div className="text-[10px] text-slate-400 mt-0.5">3 Weeks • Upcoming</div>
              </div>
            </motion.div>

            {/* Glowing connecting line SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 450 480">
              <path 
                d="M 120 140 Q 250 200 320 240 T 180 380" 
                fill="none" 
                stroke="rgba(139, 92, 246, 0.15)" 
                strokeWidth="2" 
                strokeDasharray="6 6" 
              />
              <motion.path 
                d="M 120 140 Q 250 200 320 240 T 180 380" 
                fill="none" 
                stroke="url(#grad)" 
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#22D3EE" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
