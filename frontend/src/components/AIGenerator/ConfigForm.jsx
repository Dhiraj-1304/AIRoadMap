import  { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronDown } from 'lucide-react';

const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
const INTERESTS = ['Web Development', 'AI', 'DSA', 'Cloud', 'DevOps', 'Design'];
const LEARNING_STYLES = [
  { id: 'video', label: 'Video Based', desc: 'Watch tutorials and lectures' },
  { id: 'project', label: 'Project Based', desc: 'Learn by building real apps' },
  { id: 'reading', label: 'Reading Based', desc: 'Read docs and articles' },
  { id: 'mixed', label: 'Mixed Approach', desc: 'A balance of everything' },
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
    // if(formData.interests.length === 0) {
    //   alert("Please select at least one interest.");
    //   return;
    // }
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
    console.log(formData)
    onGenerate(formData);
    
  };

  return (
    <div className="p-6 md:p-10 w-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Generate Your AI Learning Roadmap</h1>
        <p className="text-gray-400">Personalized learning paths powered by AI.</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-10">
        
        {/* Career Goal */}
        <div className="space-y-4">
          <label className="text-sm font-semibold text-gray-300">1. Career Goal</label>
          <div className="relative">
            <select 
              value={formData.careerGoal}
              onChange={(e) => setFormData({...formData, careerGoal: e.target.value})}
              className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-colors cursor-pointer"
            >
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="AI Engineer">AI Engineer</option>
              <option value="Data Scientist">Data Scientist</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
              <option value="Cybersecurity Engineer">Cybersecurity Engineer</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Skill Level */}
        <div className="space-y-4">
          <label className="text-sm font-semibold text-gray-300">2. Current Skill Level</label>
          <div className="grid grid-cols-3 gap-3">
            {SKILL_LEVELS.map(level => (
              <button
                key={level}
                type="button"
                onClick={() => setFormData({...formData, skillLevel: level})}
                className={`py-3 rounded-xl border transition-all text-sm font-medium ${
                  formData.skillLevel === level 
                    ? 'bg-blue-500/20 border-blue-500/50 text-blue-300' 
                    : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:border-white/10'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Sliders Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Duration */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-gray-300">3. Learning Duration</label>
              <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2 py-1 rounded">{formData.duration} Months</span>
            </div>
            <input 
              type="range" min="1" max="12" step="1"
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
              className="w-full accent-purple-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Hours/Week */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-gray-300">4. Weekly Study Hours</label>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">{formData.weeklyHours} hrs/wk</span>
            </div>
            <input 
              type="range" min="2" max="40" step="2"
              value={formData.weeklyHours
                
              }
              onChange={(e) => setFormData({...formData, weeklyHours: parseInt(e.target.value)})}
              className="w-full accent-cyan-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Interests */}
        <div className="space-y-4">
          <label className="text-sm font-semibold text-gray-300">5. Interests</label>
          <div className="flex flex-wrap gap-2">
            {INTERESTS.map(interest => {
              const isSelected = formData.interests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`px-4 py-2 rounded-full border transition-all text-sm ${
                    isSelected 
                      ? 'bg-purple-500/20 border-purple-500/50 text-purple-300' 
                      : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:border-white/10'
                  }`}
                >
                  {interest}
                </button>
              );
            })}
          </div>
        </div>

        {/* Learning Style */}
        <div className="space-y-4">
          <label className="text-sm font-semibold text-gray-300">6. Preferred Learning Style</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {LEARNING_STYLES.map(style => (
              <button
                key={style.id}
                type="button"
                onClick={() => setFormData({...formData, learningStyle: style.id})}
                className={`p-4 text-left rounded-xl border transition-all ${
                  formData.learningStyle === style.id 
                    ? 'bg-blue-500/10 border-blue-500/40' 
                    : 'bg-white/5 border-white/5 hover:bg-white/10'
                }`}
              >
                <div className={`font-medium mb-1 ${formData.learningStyle === style.id ? 'text-blue-300' : 'text-gray-300'}`}>
                  {style.label}
                </div>
                <div className="text-xs text-gray-500">{style.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Submit CTA */}
        <div className="pt-6 border-t border-white/10">
          <button 
            type="submit"
            disabled={isGenerating || isGenerated}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all relative overflow-hidden group
              ${isGenerating || isGenerated ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-white text-black hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]'}`}
          >
            {isGenerating ? (
              <>
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                  <Sparkles className="w-5 h-5 text-purple-400" />
                </motion.div>
                Generating Roadmap...
              </>
            ) : isGenerated ? (
              'Roadmap Generated'
            ) : (
              <>
                <Sparkles className="w-5 h-5" /> ✨ Generate AI Roadmap
              </>
            )}
            {/* Gradient Overlay for extra premium feel */}
            {!isGenerating && !isGenerated && (
               <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

export default ConfigForm;
