
import { motion } from 'framer-motion';
import { BookOpen, Video, Code2, PlayCircle, Circle } from 'lucide-react';    

const PhaseCard = ({ phase, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative flex gap-6 pb-12 group"
    >
      {/* Vertical Line */}
      <div className="absolute left-[19px] top-10 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 to-purple-500/10 group-last:hidden" />

      {/* Node Icon */}
      <div className="relative z-10 flex-shrink-0 pt-1">
        <div className="w-10 h-10 rounded-full bg-[#030014] border border-blue-500/30 flex items-center justify-center group-hover:border-blue-400 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all">
          <div className="w-4 h-4 rounded-full bg-blue-500/50" />
        </div>
      </div>

      {/* Card Content */}
      <div className="flex-1">
        <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/5 group-hover:border-white/10 transition-colors">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
            <h3 className="text-xl font-bold text-white">
              Phase {index + 1} — {phase.title || phase.phase}
              {phase.duration && <span className="text-sm font-normal text-gray-400 ml-2">({phase.duration})</span>}
            </h3>
            <div className="flex items-center gap-2 text-xs font-medium px-3 py-1 bg-white/5 rounded-full w-max text-gray-400">
              <Circle className="w-3 h-3" /> 0% Completed
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Topics */}
            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Topics to Learn</h4>
              <ul className="space-y-2">
                {phase.topics && phase.topics.map((topic, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500/50 flex-shrink-0" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              {/* Project */}
              <div>
                <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Suggested Project</h4>
                <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex items-start gap-3">
                  <Code2 className="w-5 h-5 text-cyan-400 mt-0.5" />
                  <span className="text-gray-200 text-sm">
                    {phase.project || (phase.projects && phase.projects.length > 0 ? phase.projects[0] : 'No projects suggested')}
                  </span>
                </div>
              </div>

              {/* Resources */}
              <div>
                <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Top Resources</h4>
                <div className="flex flex-wrap gap-2">
                  {phase.resources && phase.resources.length > 0 ? (
                    phase.resources.map((resource, resIdx) => {
                      const lowerRes = resource.toLowerCase();
                      let Icon = BookOpen;
                      let btnClass = "bg-white/5 text-gray-300 border-white/5";
                      if (lowerRes.includes('youtube') || lowerRes.includes('video') || lowerRes.includes('playlist')) {
                        Icon = PlayCircle;
                        btnClass = "bg-red-500/10 text-red-300 border-red-500/20";
                      } else if (lowerRes.includes('course') || lowerRes.includes('udemy') || lowerRes.includes('coursera') || lowerRes.includes('tutorial')) {
                        Icon = Video;
                        btnClass = "bg-blue-500/10 text-blue-300 border-blue-500/20";
                      }

                      return (
                        <div
                          key={resIdx}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${btnClass}`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{resource}</span>
                        </div>
                      );
                    })
                  ) : (
                    <span className="text-xs text-gray-500">No resources provided</span>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default PhaseCard;
