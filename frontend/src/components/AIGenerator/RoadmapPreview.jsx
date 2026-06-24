import  { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Bot, Sparkles, Network } from 'lucide-react';
import PhaseCard from './PhaseCard';



const TYPING_MESSAGES = [
  "Analyzing your career goals...",
  "Evaluating skill level requirements...",
  "Structuring curriculum phases...",
  "Finding the best resources...",
  "Finalizing your personalized roadmap..."
];

const RoadmapPreview = ({ isGenerating, isGenerated, roadmapData }) => {
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);

  useEffect(() => {
    if (isGenerating) {
      // setLoadingMsgIdx(0);
      const interval = setInterval(() => {
        setLoadingMsgIdx((prev) => (prev + 1) % TYPING_MESSAGES.length);
      }, 900);
      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  return (
    <div className="w-full h-full flex flex-col min-h-[600px]">
      <AnimatePresence mode="wait">
        
        {/* State 1: Empty State */}
        {!isGenerating && !isGenerated && (
          <motion.div 
            key="empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            transition={{ duration: 0.4 }}
            className="flex-1 flex flex-col items-center justify-center text-center p-8"
          >
            <div className="w-24 h-24 rounded-3xl glass-card flex items-center justify-center mb-6 bg-gradient-to-b from-blue-500/10 to-transparent border border-white/5">
              <Map className="w-10 h-10 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">No Roadmap Generated Yet</h2>
            <p className="text-gray-400 max-w-sm">
              Configure your preferences on the left and click generate to create your personalized learning path.
            </p>
          </motion.div>
        )}

        {/* State 2: Generating State */}
        {isGenerating && (
          <motion.div 
            key="generating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="flex-1 flex flex-col items-center justify-center text-center p-8"
          >
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-purple-500/30 blur-2xl rounded-full animate-pulse" />
              <div className="w-20 h-20 rounded-2xl glass-card flex items-center justify-center relative z-10 border border-purple-500/30">
                <Bot className="w-10 h-10 text-purple-400 animate-bounce" />
              </div>
            </div>
            
            <div className="h-8 overflow-hidden relative w-full flex justify-center">
              <AnimatePresence mode="popLayout">
                <motion.div
                   key={loadingMsgIdx}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 absolute"
                >
                  {TYPING_MESSAGES[loadingMsgIdx]}
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Abstract animated lines */}
            <div className="mt-12 flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div 
                  key={i}
                  animate={{ height: [10, 40, 10] }}
                  transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                  className="w-1.5 rounded-full bg-cyan-500/50"
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* State 3: Generated Roadmap */}
        {isGenerated && (
          <motion.div 
            key="generated"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 w-full max-w-3xl mx-auto py-8"
          >
            <div className="flex items-center gap-3 mb-10 pb-6 border-b border-white/10">
              <div className="p-2.5 bg-blue-500/20 rounded-xl">
                <Network className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {roadmapData?.roadmap?.title || `${roadmapData?.careerGoal || ''} Roadmap`}
                </h2>
                <p className="text-sm text-gray-400">
                  Estimated duration: {roadmapData?.duration ? `${roadmapData.duration} Months` : 'N/A'} • {roadmapData?.weeklyHours || 'N/A'} hrs/week
                </p>
              </div>
            </div>

            <div className="relative pl-2">
              {(roadmapData?.phases || []).map((phase, idx) => (  //roadmapData?.roadmap?.phases
                <PhaseCard key={idx} phase={phase} index={idx} />
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
              className="mt-8 text-center"
            >
              <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium text-white transition-all flex items-center gap-2 mx-auto">
                <Sparkles className="w-4 h-4" /> Start Learning Now
              </button>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default RoadmapPreview;
