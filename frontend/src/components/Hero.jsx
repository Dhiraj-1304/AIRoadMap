// import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Route, BookOpen, Code2 } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="pt-32 pb-20 px-6 relative overflow-hidden min-h-screen flex items-center">
      <div className="bg-gradient-glow" />
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border-purple-500/30 w-max text-sm text-purple-300">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Learning Paths</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
            Generate Your <br />
            <span className="text-gradient">Personalized AI</span> <br />
            Learning Roadmap
          </h1>
          
          <p className="text-lg text-gray-400 max-w-xl">
            AI-powered career roadmaps tailored to your goals, skills, and learning style. Stop guessing what to learn next and start building your future.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <button className="bg-white text-black hover:bg-gray-100 px-6 py-3 rounded-full font-medium flex items-center gap-2 transition-transform hover:scale-105 active:scale-95">
              Generate Roadmap <ArrowRight className="w-4 h-4" />
            </button>
            <button className="glass-card hover:bg-white/10 text-white px-6 py-3 rounded-full font-medium transition-all">
              Explore Demo
            </button>
          </div>
        </motion.div>

        {/* Right Content - Abstract Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[500px] w-full hidden lg:block"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-full blur-3xl" />
          
          {/* Animated Nodes */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 right-20 glass-card p-6 rounded-2xl border-blue-500/30"
          >
            <Route className="w-8 h-8 text-blue-400 mb-3" />
            <div className="h-2 w-20 bg-blue-500/50 rounded-full mb-2" />
            <div className="h-2 w-12 bg-blue-500/30 rounded-full" />
          </motion.div>

          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/2 left-10 glass-card p-6 rounded-2xl border-purple-500/30"
          >
            <Code2 className="w-8 h-8 text-purple-400 mb-3" />
            <div className="h-2 w-24 bg-purple-500/50 rounded-full mb-2" />
            <div className="h-2 w-16 bg-purple-500/30 rounded-full" />
          </motion.div>

          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-20 right-10 glass-card p-6 rounded-2xl border-cyan-500/30"
          >
            <BookOpen className="w-8 h-8 text-cyan-400 mb-3" />
            <div className="h-2 w-16 bg-cyan-500/50 rounded-full mb-2" />
            <div className="h-2 w-20 bg-cyan-500/30 rounded-full" />
          </motion.div>

          {/* Connecting Lines (Decorative) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'blur(1px)' }}>
            <path d="M 150 250 Q 250 150 350 100" fill="none" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M 150 250 Q 250 350 350 400" fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="2" strokeDasharray="4 4" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
