import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Bot, Sparkles, Network, Calendar, Clock, ArrowRight, Download, CheckCircle } from 'lucide-react';
import PhaseCard from './PhaseCard';

const TYPING_MESSAGES = [
  "Analyzing learning goals...",
  "Evaluating prerequisite milestones...",
  "Formulating curriculum phases...",
  "Gathering resource lists...",
  "Structuring suggested project modules..."
];

const RoadmapPreview = ({ isGenerating, isGenerated, roadmapData }) => {
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setLoadingMsgIdx((prev) => (prev + 1) % TYPING_MESSAGES.length);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  // Clean simulated download
  const triggerDownloadPDF = () => {
    alert("Structuring roadmap PDF document. Download starting shortly...");
  };

  return (
    <div className="w-full h-full flex flex-col min-h-[500px]">
      <AnimatePresence mode="wait">
        
        {/* State 1: Empty State */}
        {!isGenerating && !isGenerated && (
          <motion.div 
            key="empty"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="flex-1 flex flex-col items-center justify-center text-center p-8 border border-dashed border-white/10 rounded-[24px] bg-white/[0.01]"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <Map className="w-7 h-7 text-slate-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">No Roadmap Selected</h2>
            <p className="text-slate-400 text-xs max-w-xs leading-relaxed">
              Define your criteria on the left configuration panel and click generate to launch your path.
            </p>
          </motion.div>
        )}

        {/* State 2: Generating State */}
        {isGenerating && (
          <motion.div 
            key="generating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center text-center p-8"
          >
            {/* Shimmer/Pulse Robot */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full animate-pulse" />
              <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center relative z-10">
                <Bot className="w-8 h-8 text-purple-400" />
              </div>
            </div>
            
            {/* Message Fader */}
            <div className="h-6 overflow-hidden relative w-full flex justify-center">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={loadingMsgIdx}
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -15, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 absolute"
                >
                  {TYPING_MESSAGES[loadingMsgIdx]}
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Shimmer skeletons mimicking timeline card blocks */}
            <div className="w-full max-w-xl mt-12 space-y-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="p-5 rounded-[24px] border border-white/[0.04] bg-white/[0.01] flex items-center gap-4 shimmer">
                  <div className="w-10 h-10 rounded-full bg-white/5 shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="h-3 w-1/3 bg-white/5 rounded-md" />
                    <div className="h-2 w-2/3 bg-white/5 rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* State 3: Generated Roadmap */}
        {isGenerated && (
          <motion.div 
            key="generated"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 w-full max-w-4xl mx-auto"
          >
            {/* Header info bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/[0.08]">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <Network className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {roadmapData?.title || `${roadmapData?.careerGoal || ''} Learning Path`}
                  </h2>
                  <div className="flex items-center gap-3 text-slate-400 text-xs mt-1">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {roadmapData?.duration ? `${roadmapData.duration} Months` : 'N/A'}</span>
                    <span className="w-1 h-1 bg-slate-600 rounded-full" />
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {roadmapData?.weeklyHours || 'N/A'} hrs/week</span>
                  </div>
                </div>
              </div>

              {/* Actions drawer */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={triggerDownloadPDF}
                  className="px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-slate-200 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> PDF
                </button>
              </div>
            </div>

            {/* Timelines path rendering */}
            <div className="relative pl-1 mt-6">
              {(roadmapData?.phases || []).map((phase, idx) => (
                <PhaseCard key={idx} phase={phase} index={idx} />
              ))}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RoadmapPreview;
