import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronDown, Monitor, Cpu, FileText, Compass, Award } from 'lucide-react';

const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
const INTERESTS = ['Web Development', 'AI', 'DSA', 'Cloud', 'DevOps', 'Design'];
const LEARNING_STYLES = [
  { id: 'video', label: 'Video Based', desc: 'Watch tutorials and lectures', icon: Monitor },
  { id: 'project', label: 'Project Based', desc: 'Learn by building real apps', icon: Cpu },
  { id: 'reading', label: 'Reading Based', desc: 'Read docs and articles', icon: FileText },
  { id: 'mixed', label: 'Mixed Approach', desc: 'A balance of everything', icon: Compass },
];

const ConfigForm = ({ onGenerate, isGenerating, isGenerated }) => {
  const [formData, setFormData] = useState({
    careerGoal: 'Frontend Developer',
    skillLevel: 'Beginner',
    duration: 6,
    weeklyHours: 10,
    interests: [],
    learningStyle: 'project'
  });

  const toggleInterest = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest) 
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isGenerating) return;
    onGenerate(formData);
  };

  return (
    <div className="p-6 md:p-8 lg:p-10 w-full relative z-10">
      {/* Title */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          AI Configurator <Sparkles className="w-5 h-5 text-purple-400" />
        </h1>
        <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
          Configure your preferences to construct a tailored roadmap.
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Career Goal */}
        <div className="space-y-3">
          <label className="text-xs font-bold tracking-wider text-slate-400 uppercase">1. Target Career Goal</label>
          <div className="relative">
            <select 
              value={formData.careerGoal}
              onChange={(e) => setFormData({...formData, careerGoal: e.target.value})}
              className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/80 transition-all cursor-pointer"
            >
              <option value="Frontend Developer" className="bg-[#020617] text-white">Frontend Developer</option>
              <option value="Full Stack Developer" className="bg-[#020617] text-white">Full Stack Developer</option>
              <option value="AI Engineer" className="bg-[#020617] text-white">AI Engineer</option>
              <option value="Data Scientist" className="bg-[#020617] text-white">Data Scientist</option>
              <option value="UI/UX Designer" className="bg-[#020617] text-white">UI/UX Designer</option>
              <option value="Cybersecurity Engineer" className="bg-[#020617] text-white">Cybersecurity Engineer</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Skill Level */}
        <div className="space-y-3">
          <label className="text-xs font-bold tracking-wider text-slate-400 uppercase">2. Current Skill Level</label>
          <div className="grid grid-cols-3 gap-2">
            {SKILL_LEVELS.map(level => (
              <button
                key={level}
                type="button"
                onClick={() => setFormData({...formData, skillLevel: level})}
                className={`py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                  formData.skillLevel === level 
                    ? 'bg-blue-500/10 border-blue-500/50 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]' 
                    : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:border-white/10 hover:text-white'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-6">
          {/* Duration */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold tracking-wider text-slate-400 uppercase">3. Duration Target</label>
              <span className="font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-md font-semibold">{formData.duration} Months</span>
            </div>
            <input 
              type="range" min="1" max="12" step="1"
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
              className="w-full accent-purple-500 h-1.5 bg-white/5 border border-white/10 rounded-lg appearance-none cursor-pointer focus:outline-none"
            />
          </div>

          {/* Hours/Week */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold tracking-wider text-slate-400 uppercase">4. Weekly Study Hours</label>
              <span className="font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-md font-semibold">{formData.weeklyHours} hrs/wk</span>
            </div>
            <input 
              type="range" min="2" max="40" step="2"
              value={formData.weeklyHours}
              onChange={(e) => setFormData({...formData, weeklyHours: parseInt(e.target.value)})}
              className="w-full accent-cyan-500 h-1.5 bg-white/5 border border-white/10 rounded-lg appearance-none cursor-pointer focus:outline-none"
            />
          </div>
        </div>

        {/* Interests */}
        <div className="space-y-3">
          <label className="text-xs font-bold tracking-wider text-slate-400 uppercase">5. Focal Interests</label>
          <div className="flex flex-wrap gap-2">
            {INTERESTS.map(interest => {
              const isSelected = formData.interests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${
                    isSelected 
                      ? 'bg-purple-500/10 border-purple-500/40 text-purple-400 shadow-[0_0_15px_rgba(139,92,246,0.15)]' 
                      : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:border-white/10 hover:text-white'
                  }`}
                >
                  {interest}
                </button>
              );
            })}
          </div>
        </div>

        {/* Learning Style */}
        <div className="space-y-3">
          <label className="text-xs font-bold tracking-wider text-slate-400 uppercase">6. Preferred Learning Style</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {LEARNING_STYLES.map(style => {
              const StyleIcon = style.icon;
              const isSelected = formData.learningStyle === style.id;
              return (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => setFormData({...formData, learningStyle: style.id})}
                  className={`p-3 text-left rounded-xl border transition-all flex items-start gap-3 hover:bg-white/[0.08] ${
                    isSelected 
                      ? 'bg-blue-500/[0.04] border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
                      : 'bg-white/5 border-white/5'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-white/5 text-slate-400'
                  }`}>
                    <StyleIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={`font-semibold text-xs ${isSelected ? 'text-blue-400' : 'text-slate-200'}`}>
                      {style.label}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5 leading-snug">{style.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit CTA */}
        <div className="pt-6 border-t border-white/10">
          <motion.button 
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            type="submit"
            disabled={isGenerating || isGenerated}
            className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all relative overflow-hidden group
              ${isGenerating || isGenerated ? 'bg-white/5 border border-white/10 text-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white hover:shadow-lg hover:shadow-purple-500/20'}`}
          >
            {isGenerating ? (
              <>
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </motion.div>
                Generating Roadmap...
              </>
            ) : isGenerated ? (
              'Roadmap Generated'
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Generate AI Roadmap
              </>
            )}
          </motion.button>
        </div>

      </form>
    </div>
  );
};

export default ConfigForm;
