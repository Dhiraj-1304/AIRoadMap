
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Video, Code2, PlayCircle, ChevronDown, ChevronUp, CheckCircle, Circle, Clock, Star } from 'lucide-react';    

const PhaseCard = ({ phase, index }) => {
  const [isOpen, setIsOpen] = useState(index === 0); // Open the first phase by default
  const [completed, setCompleted] = useState(false);

  // Derive difficulty tag based on phase index
  const getDifficulty = (idx) => {
    if (idx === 0) return { label: 'Beginner', style: 'text-green-400 bg-green-500/10 border-green-500/20' };
    if (idx === 1) return { label: 'Intermediate', style: 'text-amber-400 bg-amber-500/10 border-amber-500/20' };
    return { label: 'Advanced', style: 'text-red-400 bg-red-500/10 border-red-500/20' };
  };

  const difficulty = getDifficulty(index);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex gap-5 pb-10 group"
    >
      {/* Vertical Timeline Connection Line */}
      <div className="absolute left-[19px] top-10 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/30 to-purple-500/5 group-last:hidden" />

      {/* Interactive Node Icon */}
      <div className="relative z-10 flex-shrink-0 pt-1">
        <button 
          type="button"
          onClick={() => setCompleted(!completed)}
          className="w-10 h-10 rounded-full bg-[#020617] border border-white/10 flex items-center justify-center group-hover:border-purple-500/50 hover:scale-105 active:scale-95 transition-all shadow-md focus:outline-none cursor-pointer"
        >
          {completed ? (
            <CheckCircle className="w-5 h-5 text-green-400 fill-green-400/10 shadow-[0_0_10px_rgba(34,197,94,0.3)]" />
          ) : (
            <Circle className="w-4 h-4 text-slate-500 group-hover:text-purple-400" />
          )}
        </button>
      </div>

      {/* Main Glass Card container */}
      <div className="flex-1">
        <div className="glass-card bg-white/[0.02] border border-white/[0.06] hover:border-white/10 rounded-[20px] overflow-hidden transition-all duration-300 shadow-md">
          
          {/* Header Action Row */}
          <div 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between p-5 md:p-6 cursor-pointer select-none bg-white/[0.01] hover:bg-white/[0.03] transition-colors"
          >
            <div className="flex-1 pr-4">
              <div className="flex items-center flex-wrap gap-2.5 mb-1.5">
                <span className="text-[10px] font-bold tracking-widest text-purple-400 uppercase">
                  Phase {index + 1}
                </span>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${difficulty.style}`}>
                  {difficulty.label}
                </span>
                {phase.duration && (
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" /> {phase.duration}
                  </span>
                )}
              </div>
              <h3 className="text-base md:text-lg font-bold text-white leading-tight">
                {phase.title || phase.phase}
              </h3>
            </div>
            
            <div className="flex items-center gap-3">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${completed ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-white/5 text-slate-400 border border-white/5'} border`}>
                {completed ? '100% Completed' : 'Pending'}
              </span>
              <div className="text-slate-400">
                {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>
          </div>

          {/* Expandable Phase Contents */}
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 md:p-8 border-t border-white/[0.06] bg-white/[0.005] grid md:grid-cols-2 gap-8 text-sm leading-relaxed">
                  {/* Left Column: Learning Topics */}
                  <div>
                    <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-4 flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-purple-400" /> Core Concepts
                    </h4>
                    <ul className="space-y-3">
                      {phase.topics && phase.topics.map((topic, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-300">
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                          <span className="text-xs md:text-sm leading-relaxed">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column: Project & Resources */}
                  <div className="space-y-6">
                    {/* Suggested Project Card */}
                    <div>
                      <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-3 flex items-center gap-1.5">
                        <Code2 className="w-3.5 h-3.5 text-blue-400" /> Milestone Project
                      </h4>
                      <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-start gap-3 hover:bg-white/[0.08] transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                          <Code2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-xs text-white">Suggested Build:</div>
                          <div className="text-slate-300 text-xs mt-0.5 leading-snug">
                            {phase.project || (phase.projects && phase.projects.length > 0 ? phase.projects[0] : 'No projects suggested')}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Top Resources Links */}
                    <div>
                      <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-3 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-cyan-400" /> Reference Resources
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {phase.resources && phase.resources.length > 0 ? (
                          phase.resources.map((resource, resIdx) => {
                            const lowerRes = resource.toLowerCase();
                            let Icon = BookOpen;
                            let btnClass = "bg-white/5 text-slate-300 border-white/5 hover:bg-white/10";
                            
                            if (lowerRes.includes('youtube') || lowerRes.includes('video') || lowerRes.includes('playlist')) {
                              Icon = PlayCircle;
                              btnClass = "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/15";
                            } else if (lowerRes.includes('course') || lowerRes.includes('udemy') || lowerRes.includes('coursera') || lowerRes.includes('tutorial')) {
                              Icon = Video;
                              btnClass = "bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/15";
                            }

                            return (
                              <div
                                key={resIdx}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${btnClass} transition-colors`}
                              >
                                <Icon className="w-3.5 h-3.5 shrink-0" />
                                <span>{resource}</span>
                              </div>
                            );
                          })
                        ) : (
                          <span className="text-xs text-slate-500">No resources provided for this segment</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </motion.div>
  );
};

export default PhaseCard;
