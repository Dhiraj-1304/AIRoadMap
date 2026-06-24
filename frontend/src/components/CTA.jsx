import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto relative rounded-3xl overflow-hidden glass-card p-12 text-center border-t border-b-0 border-x-0 md:border md:border-white/10 border-blue-500/30">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Start Building Your <br />
            <span className="text-gradient">Future With AI</span>
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
            Join thousands of learners who are accelerating their careers with AI-powered roadmaps. No credit card required to start.
          </p>
          
          <button className="bg-white text-black hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 mx-auto transition-transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            <Sparkles className="w-5 h-5" /> Generate My Roadmap
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
