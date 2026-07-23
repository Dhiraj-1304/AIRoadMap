import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-6 bg-[#020617]">
      <div className="max-w-4xl mx-auto relative rounded-[24px] overflow-hidden bg-white/[0.02] border border-white/[0.06] p-12 text-center shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-500/10 rounded-full blur-[80px]" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Start Building Your <br />
            <span className="text-gradient font-extrabold">Future With AI</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base mb-10 max-w-xl mx-auto leading-relaxed">
            Join elite learners who are accelerated by AI-powered paths. Start creating your roadmap immediately.
          </p>
          
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/register")}
            className="bg-white text-black hover:bg-slate-100 px-8 py-4 rounded-xl font-bold text-sm flex items-center gap-2 mx-auto transition-transform hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-purple-600" /> Generate My Roadmap
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
